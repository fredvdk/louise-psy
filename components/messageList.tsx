import { Message } from "./messageLine";
import { getAllMessagesForToday } from "@/lib/supabase/messagesQueries";

async function MessageList() {
    const response = await getAllMessagesForToday();

    return (
        response?.messages?.map(msg => <Message key={msg.id} date={msg.valid_from} text={msg.message} />
        )
    )
}

export default MessageList;
