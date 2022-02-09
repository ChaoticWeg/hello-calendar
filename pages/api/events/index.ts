import type { NextApiRequest, NextApiResponse } from "next";
import { EventsResponse, readEvents } from "./_data";

async function get(req: NextApiRequest, res: NextApiResponse<EventsResponse>) {
    const events = await readEvents();
    return res.status(200).json(events);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<EventsResponse>) {
    try {
        if (req.method === "GET") {
            return await get(req, res);
        }

        res.status(405).json({ message: "Method not allowed: " + req.method });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export type { Event } from "./_data";
