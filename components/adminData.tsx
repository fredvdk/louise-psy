import { createClient } from "@/lib/supabase/server";
import { Navbar } from "./navbar";
import ReservatieLijst from "./reservatielijst";


async function UserData() {
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
    return (
        <>
            <Navbar />
            <div className="h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold m-5">Admin data - Pending to be comfirmed</h1>
                <ReservatieLijst props={{ statusList: ['pending'], buttonText: "Confirm", isAdmin: true }} />
            </div>
        </>
    );
}

export default UserData;