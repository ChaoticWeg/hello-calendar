import type { EventInput } from "@fullcalendar/react";
import fs from "fs";
import path from "path";
import eventsJson from "./events.json";

export type Event = EventInput;

export type ApiError = {
    message: string;
};

export type EventResponse = Event | ApiError;
export type EventsResponse = Event[] | ApiError;

export const datafile = path.join(__dirname, "events.json");

export function readEvents(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(datafile, { encoding: "utf-8" }, (err, raw: string) => {
            if (err) {
                if (err.code === "ENOENT") {
                    return writeEvents(eventsJson.events).then(readEvents).then(resolve).catch(reject);
                } else {
                    return reject(err);
                }
            }

            try {
                const events: Event[] = JSON.parse(raw);
                return resolve(events);
            } catch (err) {
                reject(err);
            }
        });
    });
}

export function writeEvents(events: Event[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const raw = JSON.stringify(events, null, 4);
        fs.writeFile(datafile, raw, (err) => {
            return err ? reject(err) : resolve();
        });
    });
}
