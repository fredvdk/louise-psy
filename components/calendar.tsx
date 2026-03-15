"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { CalendarEvent } from "@/types/reservatie";

export default function CalendarComponent({events} : {events: CalendarEvent[]}) {
    return (
        <div className="p-4">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,listWeek",
                }}
                height="auto"
                events={events}
            />
        </div>
    );
}