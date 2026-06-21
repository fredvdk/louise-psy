import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

async function AdminPageBtn() {
    const client = await createClient();
    const user = await client.auth.getUser();
    const role = await client.from("profiles").select("role").eq("id", user.data.user?.id).single();

    return (
        (role.data?.role === 'admin') &&
        <Link
            href="/protected/admin"
            className="block text-base w-full text-left px-4 py-2 hover:text-red-500"
        >
            Admin
        </Link>
    )
}

export default AdminPageBtn;