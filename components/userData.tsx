import { createClient } from "@/lib/supabase/server";


async function UserData() {
    const client = await createClient();
    const user = await client.auth.getUser();
    const role = await client.from("Profiles").select("role").eq("id", user.data.user?.id).single();

    if (!user.data.user) {
        return <div className="text-red-600 font-bold">No user logged in</div>;
    }
    else if (role.data?.role != "admin") {
        return <div className="text-red-600 font-bold">{user.data.user.email} has no access, need to be admin</div>;
    }
    return (
        <div className="text-red-600 font-bold">
            {user.data.user?.email} logged in as {role.data?.role}
        </div>
    );
}

export default UserData;