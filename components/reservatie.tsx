import { Reservation } from "@/types/reservatie"

export default function ReservationCard({ reservatie }: { reservatie: Reservation }) {
    return (
        <div className="border rounded-xl p-5 shadow-sm bg-background hover:shadow-md transition">

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold">
                    {new Date(reservatie.date).toLocaleDateString()}
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

            {/* Time */}
            <div className="text-sm text-muted-foreground mb-3">
                ⏰ {reservatie.time}
            </div>

            {/* Details */}
            <div className="space-y-1 text-sm">
                <div>
                    <span className="text-muted-foreground">Reserved for:</span>{" "}
                    {reservatie.reserved_for}
                </div>

                <div className="text-xs text-muted-foreground">
                    Updated {new Date(reservatie.updated_at).toLocaleString()}
                </div>
            </div>

            {/* Notes */}
            {reservatie.notes && (
                <div className="mt-4 p-3 bg-muted rounded-md text-sm">
                    {reservatie.notes}
                </div>
            )}

        </div>
    )
}