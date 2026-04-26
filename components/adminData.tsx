import { createClient } from "@/lib/supabase/server";
import { Navbar } from "./navbar";
import AdminAfsprakenLijst from "./afspraken/AdminAfsprakenLijst";
import { getAllAfsprakenVoorAdmin } from "@/lib/supabase/afsprakenQueries";


export async function AdminData() {
    const client = await createClient();
    const user = await client.auth.getUser();
    const role = await client.from("profiles").select("role").eq("id", user.data.user?.id).single();
    console.log("Role is " + role.data?.role);

    if (role.data?.role !== "admin") {
        return (
            <>
                <Navbar />
                <div className="h-full flex items-center justify-center">
                    <h1 className="text-2xl font-bold">You do not have access to this page.</h1>
                </div>
            </>
        )
    }

    const {data, error } = await getAllAfsprakenVoorAdmin();
    if (error) return (<div>error {error}</div>);

    return (
        <>
            <Navbar />
            <div className="h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold m-5">Admin data</h1>
                <AdminAfsprakenLijst afspraken={data ?? undefined} />
            </div>
        </>
    );
}
