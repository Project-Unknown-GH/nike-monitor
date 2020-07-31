import { main } from "./main";
import { Apis } from "./urls";
import * as fs from "fs";

const getWebhooks = (): Promise<string[]> => {
    return new Promise(res => {
        fs.readFile("webhooks_fr.txt", "utf8", (err, data) => {
            if (err) throw err;
            res(data.split("\n"));
        })
    })
}

const start = async () => {
    const webhooks = await getWebhooks();
    setInterval(main, 10000, "fr", Apis.FR, webhooks);
}

start();