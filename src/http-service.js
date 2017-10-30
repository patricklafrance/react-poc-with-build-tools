import activities from "./activities.json";
import alerts from "./alerts.json";

export class HttpService {
    get(instructions) {
        if (instructions.url === "/activities") {
            return activities;
        }
        else if (instructions.url === "/alerts") {
            return alerts;
        }

        return [];
    }
};