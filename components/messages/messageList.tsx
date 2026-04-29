import { Message } from "./messageLine";
import { getAllMessagesForToday } from "@/lib/supabase/messagesDb";

async function MessageList() {
    const response = await getAllMessagesForToday();

    return (
        response?.data?.map(msg => <Message key={msg.id} date={msg.valid_from} text={msg.message} />
        )
    )
}

export default MessageList;
