"use client";
import {useEffect} from "react";

export default function Error({error,reset}:{error:Error&{digest?:string};reset:()=>void}){
  useEffect(()=>{console.error(error)},[error]);
  return <main className="section"><div className="container narrow"><div className="panel">
    <div className="eyebrow blue">Elderz Real Estate</div>
    <h1>Something went wrong.</h1>
    <p className="lead">We could not load this page right now. Please try again. If the problem continues, check the Vercel environment variables and database connection.</p>
    <button className="btn gold" onClick={()=>reset()}>Try again</button>
  </div></div></main>
}
