import {getSession} from '@/lib/auth';import {redirect} from 'next/navigation';import NewPropertyForm from './NewPropertyForm';
export default async function NewProperty(){if(!(await getSession()))redirect('/admin/login');return <NewPropertyForm/>}
