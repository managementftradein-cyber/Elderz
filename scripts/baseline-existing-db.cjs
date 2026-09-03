const { Client } = require('pg');
const { execFileSync } = require('child_process');

async function main() {
  const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!url) throw new Error('Missing DIRECT_URL or DATABASE_URL.');

  const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    const table = await client.query(`
      SELECT to_regclass('public._prisma_migrations') AS name
    `);

    if (!table.rows[0].name) {
      console.log('Prisma migration table does not exist; migrate deploy will initialize it.');
      return;
    }

    const existing = await client.query(`
      SELECT 1 FROM public._prisma_migrations
      WHERE migration_name = $1 LIMIT 1
    `, ['20260828000000_initial_schema']);

    if (existing.rowCount > 0) {
      console.log('Initial migration is already recorded as applied.');
      return;
    }

    console.log('Existing database detected without Prisma baseline. Marking initial schema migration as applied...');
  } finally {
    await client.end();
  }

  execFileSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', [
    'prisma', 'migrate', 'resolve', '--applied', '20260828000000_initial_schema'
  ], { stdio: 'inherit', env: process.env });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
