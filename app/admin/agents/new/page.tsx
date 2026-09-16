import {getSession} from "@/lib/auth";import {redirect} from "next/navigation";import NewAgentForm from "./NewAgentForm";
export default async function NewAgent(){if(!(await getSession()))redirect("/admin/login");return <NewAgentForm/>}
