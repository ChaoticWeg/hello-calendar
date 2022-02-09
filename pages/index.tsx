import DayGridPlugin from "@fullcalendar/daygrid";
import InteractionPlugin, { EventResizeDoneArg } from "@fullcalendar/interaction";
import FullCalendar, { EventDropArg } from "@fullcalendar/react";
import { Container } from "@mui/material";
import React from "react";
import type { Event } from "./api/events";

function Home() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [events, setEvents] = React.useState<Event[]>([]);

    const onEventEdit = React.useCallback((data: EventDropArg | EventResizeDoneArg) => {
        const {id, start, end} = data.event;
        fetch(`/api/events/${id}`, {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({start, end})
        })
        .catch((err) => {
            console.error(err);
            data.revert();
        });
    }, []);

    React.useEffect(() => {
        setLoading(true);
        fetch("/api/events")
            .then((res) => res.json())
            .then(setEvents)
            .catch((err) => {
                console.error(err);
                alert(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container maxWidth="lg" sx={{ padding: 2 }}>
            <FullCalendar
                editable
                initialView="dayGridMonth"
                plugins={[DayGridPlugin, InteractionPlugin]}
                events={events}
                eventDrop={onEventEdit}
                eventResize={onEventEdit}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth"
                }}
                buttonText={{
                    today: "Today",
                    month: "Month"
                }}
            />
        </Container>
    );
}

export default Home;
