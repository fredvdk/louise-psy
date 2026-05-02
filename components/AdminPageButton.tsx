import { createClient } from "@/lib/supabase/server";
import { Button } from "./pageElements";

export async function AdminPageBtn() {
    const client = await createClient();
    const user = await client.auth.getUser();
    const role = await client.from("profiles").select("role").eq("id", user.data.user?.id).single();

    return (
        (role.data?.role === 'admin') &&
        <div className="flex justify-center py-4">
             <Button link='/protected/admin' text='Ga naar beheerpagina' level='secondary' />
        </div>

    )
}