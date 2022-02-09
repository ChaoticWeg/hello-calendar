import type { NextApiRequest, NextApiResponse } from "next";
import _ from "underscore";
import type { Event, EventResponse } from "./_data";
import { readEvents, writeEvents } from "./_data";

async function get(req: NextApiRequest, res: NextApiResponse<EventResponse>) {
    let {event_id: id} = req.query;
    if (!id) {
        return res.status(400).json({ message: "id is a required field" });
    }

    if (Array.isArray(id)) {
        id = id[0];
    }

    const events = await readEvents();
    const event = _.findWhere(events, {id});

    if (!event) {
        return res.status(404).json({ message: "no event with that id" });
    }

    res.status(200).json(event);
}

async function put(req: NextApiRequest, res: NextApiResponse<EventResponse>) {
    let {event_id: id} = req.query;
    if (!id) {
        return res.status(400).json({ message: "id is a required field" });
    }

    if (Array.isArray(id)) {
        id = id[0];
    }

    const events: Event[] = await readEvents();
    const eventIndex: number = _.findIndex(events, {id});
    const event: Event = events[eventIndex];

    const newEventData: Partial<Event> = req.body;
    const newEvent: Event = { ...event, ...newEventData, id };

    const newEvents: Event[] = [...events];
    newEvents[eventIndex] = newEvent;

    await writeEvents(newEvents);
    res.status(200).json(newEvent);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<EventResponse>) {
    try {
        if (req.method === "GET") {
            return await get(req, res);
        }

        if (req.method === "PUT") {
            return await put(req, res);
        }

        res.status(405).json({ message: "method not supported: " + req.method });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
