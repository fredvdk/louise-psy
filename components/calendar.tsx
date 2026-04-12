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
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek",
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