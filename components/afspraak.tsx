import { deleteReservatie, confirmReservatie } from "@/actions/reservations"
import { Reservation } from "@/types/reservatie"
import { Button } from "./ui/button"
import { isWithin14Days } from "@/lib/utils"

type AfspraakCardProps = {
    reservatie: Reservation,
    buttonText: string
}

export default function AfspraakCard({ card }: { card: AfspraakCardProps }) {
    const isButtonDisabled = isWithin14Days(new Date(card.reservatie.date));

    const handleClick = (card.buttonText == "Annuleer") ? deleteReservatie : confirmReservatie;

    return (
        <div className="border rounded-xl p-5 shadow-sm bg-background hover:shadow-md transition">

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold">
                    {new Date(card.reservatie.date).toLocaleDateString("nl-NL", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </div>
                <div className="text-lg font-semibold mb-3">
                    ⏰ {card.reservatie.time.slice(0, 5)}
                </div>

                <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                    ${card.reservatie.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : card.reservatie.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {card.reservatie.status}
                </span>
            </div>

            {/* Actions */}
            <div className="text-sm flex justify-between items-center">
                <div>{card.reservatie.client_email?.email}</div>
                <div className="ml-auto">
                    <form action={handleClick}>
                        <input type='hidden' name='reservatieId' value={card.reservatie.id} />
                        <Button variant="destructive" type="submit" disabled={isButtonDisabled}>
                            {card.buttonText}
                        </Button>
                    </form>

                </div>
            </div>

            {/* Notes */}
            {card.reservatie.notes && (
                <div className="mt-4 p-3 bg-muted rounded-md text-sm">
                    {card.reservatie.notes}
                </div>
            )}

        </div>
    );
}