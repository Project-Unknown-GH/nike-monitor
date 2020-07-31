import { compareData } from "./compare";
import { sendEmbed } from "./webhook";
import * as fs from "fs";

const getProxyUrls = (): Promise<string[]> => {
    return new Promise(res => {
        fs.readFile("proxies.txt", "utf-8", (err, data) => {
            if (err) throw err;
            const splitData = data.split("\n");
            res(splitData.map(proxyToUrl));
        })
    })    
};

const proxyToUrl = (proxy: string) => {
    const splitProxy = proxy.split(":");
    const reorganizedProxy = [[splitProxy[2], splitProxy[3]], [splitProxy[0], splitProxy[1]]];
    const joinedProxy = reorganizedProxy.map(l => l.join(":")).join("@");
    return `http://${joinedProxy}`;
};

export const main = async (name: string, apiUrl: string, webhooks: string[]) => {
    const proxies = await getProxyUrls();
    const proxy = proxies[Math.floor(Math.random() * proxies.length)];
    const data = await compareData(name, apiUrl, proxy);
    console.log("Diffs", data);
    if (data) {
        data.map((l: any) => sendEmbed(l, webhooks));
    }
}

console.log("[STATUS] Starting...");
