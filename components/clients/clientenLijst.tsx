import { Client } from "@/types/client";

function ClientsList({ clients }: { clients: Client[] | undefined }) {
    return (
        <section>
            <div className="overflow-x-auto bg-white border border-slate-200 rounded-lg">
                <table className="w-full border-collapse min-w-[760px]">
                    <thead>
                        <tr className="bg-slate-50 text-left border-b border-slate-200">
                            <th className="p-4 text-xs text-slate-700 cursor-pointer select-none">
                                Naam
                            </th>
                            <th className="p-4 text-xs text-slate-700 cursor-pointer select-none">
                                Email
                            </th>
                            <th className="p-4 text-xs text-slate-700 cursor-pointer select-none">
                                Mobiel
                            </th>
                            <th className="p-4 text-xs text-slate-700 cursor-pointer select-none">
                                Adres
                            </th>
                            <th className="p-4 text-xs text-slate-700 cursor-pointer select-none">
                                Rol
                            </th>
                            <th className="p-4 text-xs text-slate-700 cursor-pointer select-none">
                                Aangemaakt
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {!clients || clients.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-6 text-center text-slate-500">
                                    Geen clienten gevonden.
                                </td>
                            </tr>
                        ) : (
                            clients.map((client) => (
                                <tr key={client.id} className="border-b border-slate-200">
                                    <td className="p-4 align-top text-left text-sm">{client.full_name}</td>
                                    <td className="p-4 align-top text-left text-slate-700 text-sm">{client.email}</td>
                                    <td className="p-4 align-top text-left text-slate-700 text-sm">{client.mobile}</td>
                                    <td className="p-4 align-top text-left text-slate-700 text-sm">{client.address}</td>
                                    <td className="p-4 align-top text-left text-slate-700 text-sm">{client.role}</td>
                                    <td className="p-4 align-top text-left text-slate-700 text-sm">
                                        {new Date(client.created_at).toLocaleDateString('nl-NL')}
                                    </td>
                                
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ClientsList;