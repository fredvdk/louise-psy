import { createClient } from "@/lib/supabase/server";
import { Message } from "./messageLine";

async function MessageList(){
    const client = await createClient();
    const today = new Date().toISOString().split('T')[0];
    const response = await client.from("messages").select("*")
        .lte("valid_from", today)
        .gte("valid_till", today);
    const messages = response.data;
    console.log(messages);

    return (
        messages?.map(msg => <Message key={msg.id} date={msg.valid_from} text={msg.message} />
    )
    )
}

export default MessageList;
