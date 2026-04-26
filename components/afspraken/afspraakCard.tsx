import { Afspraak } from "@/types/reservatie"
import { ConfirmButton, DeleteButton } from "./afspraakButtons"
import { formatDate } from "@/lib/utils";

type AfspraakCardProps = {
    reservatie: Afspraak,
    purpose: 'delete' | 'confirm'
}

export default function AfspraakCard({ reservatie, purpose }: AfspraakCardProps) {
    return (
        <div className="border rounded-xl p-5 shadow-sm bg-background hover:shadow-md transition">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold">
                    {formatDate(new Date(reservatie.date))}
                </div>
                <div className="text-lg font-semibold mb-3">
                    ⏰ {reservatie.time.slice(0, -3)}
                </div>

                <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                    ${reservatie.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : reservatie.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {reservatie.status}
                </span>
            </div>

            {/* Actions */}
            <div className="text-sm flex justify-between items-center">
                <div>{reservatie.client_email?.email}</div>
                <div className="ml-auto">
                    {purpose == "delete" ? <DeleteButton reservatie={reservatie} /> : <ConfirmButton reservatie={reservatie} />}
                </div>
            </div>

            {/* Notes */}
            {reservatie.notes && (
                <div className="mt-4 p-3 bg-muted rounded-md text-sm">
                    {reservatie.notes}
                </div>
            )}

        </div>
    );
}