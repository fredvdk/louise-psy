"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { CalendarEvent } from "@/types/reservatie";

export default function CalendarComponent({ events }: { events: CalendarEvent[] }) {
    return (
        <div className="p-4">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="listWeek"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "listWeek,dayGridWeek",
                }}
                height="auto"
                buttonText={{
                    today: 'vandaag',
                    month: 'maand',
                    week: 'week',
                    day: 'dag',
                    list: 'lijst'
                }}
                eventClick={() => alert("clicked")}
                noEventsContent="Nothing available"
                dayHeaderContent={(args) => {
                    const date = args.date;

                    const weekday = date.toLocaleDateString("nl-NL", { weekday: "short" });
                    const day = date.getDate();
                    const month = date.toLocaleDateString("nl-NL", { month: "short" });

                    return `${weekday} ${day} ${month}`;
                }}
                eventTimeFormat = {{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false,
                    hour12: false
                }}
                events={events}
            />
        </div>
    );
}