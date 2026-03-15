import { createClient } from "@/lib/supabase/server";
import { Navbar } from "./navbar";


async function UserData() {
    const client = await createClient();
    const user = await client.auth.getUser();
    const role = await client.from("Profiles").select("role").eq("id", user.data.user?.id).single();

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
    return (
        <>
            <Navbar />
            <div className="h-full flex items-center justify-center">
                <h1 className="text-2xl font-bold">Admin data - manage users and reservations.</h1>
            </div>
        </>
    );
}

export default UserData;