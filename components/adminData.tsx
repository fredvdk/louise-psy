import { createClient } from "@/lib/supabase/server";
import { Navbar } from "./navbar";
import AdminAfsprakenLijst from "./afspraken/AdminAfsprakenLijst";
import { getAllAfsprakenVoorAdmin } from "@/lib/supabase/afsprakenDb";
import { getAllMessages } from "@/lib/supabase/messagesDb";
import AdminMessagesLijst from "./messages/AdminMessagesLijst";


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

    const { data, error: afsprakenError } = await getAllAfsprakenVoorAdmin();
    if (afsprakenError) return (<div>Error getting afspraken, {afsprakenError}</div>);
    const afspraken = data;

    const { data: messages, error: messagesError } = await getAllMessages();
    if (messagesError) return (<div>Error getting messages, {messagesError}</div>);

    return (
        <>
            <Navbar />
            <div className="h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold m-5">Afspraken</h1>
                <AdminAfsprakenLijst afspraken={afspraken ?? undefined} />
                <h1 className="text-2xl font-bold m-5">Messages</h1>
                <AdminMessagesLijst messages={messages ?? undefined} />
            </div>
        </>
    );
}
