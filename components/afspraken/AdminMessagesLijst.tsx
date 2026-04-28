'use client'

import { formatDate } from "@/lib/utils";
import { Message } from "@/types/reservatie";
import { Button } from "../ui/button";

export default function AdminMessagesLijst({ messages }: { messages?: Message[] }) {
    return (
        <section>
            <Button className="m-2">
                Nieuwe message
            </Button>
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-lg">

                <div className="flex gap-2">
                </div>
                <table className="w-full border-collapse min-w-[760px]">
                    <thead>
                        <tr className="bg-slate-50 text-left border-b border-slate-200">
                            <th
                                className="p-4 text-xs text-slate-700 cursor-pointer select-none"
                            >
                                Valid from
                            </th>
                            <th
                                className="p-4 text-xs text-slate-700 cursor-pointer select-none"
                            >
                                Valid until
                            </th>
                            <th
                                className="p-4 text-xs text-slate-700 cursor-pointer select-none"
                            >
                                Text
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages?.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-slate-500">
                                    Geen afspraken gevonden.
                                </td>
                            </tr>
                        ) : (
                            messages?.map((msg) => (
                                <tr key={msg.id} className="border-b border-slate-200">
                                    <td className="p-4 align-top">
                                        {formatDate(new Date(msg.valid_from))}
                                    </td>
                                    <td className="p-4 align-top">
                                        {formatDate(new Date(msg.valid_till))}
                                    </td>
                                    <td className="p-4 align-top text-slate-700">{msg.message}</td>
                                    <td className="p-4 align-top">
                                        <Button variant="destructive">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}