import { compareData } from "./compare";
import { sendEmbed } from "./webhook";
import axios from "axios";

const getProxyUrls = async () => {
    const response = await axios({
        method: "GET",
        url: "https://api.projectunkn.com/api/proxies/"
    });
    return response.data.map((l: {proxy: string}) => l.proxy).map(proxyToUrl);
};

const proxyToUrl = (proxy: string) => {
    const splitProxy = proxy.split(":");
    const reorganizedProxy = [[splitProxy[2], splitProxy[3]], [splitProxy[0], splitProxy[1]]];
    const joinedProxy = reorganizedProxy.map(l => l.join(":")).join("@");
    return `http://${joinedProxy}`;
};

export const main = async (name: string, apiUrl: string, webhook: string) => {
    const proxies = await getProxyUrls();
    const proxy = proxies[Math.floor(Math.random() * proxies.length)];
    const data = await compareData(name, apiUrl, proxy);
    console.log("Diffs", data);
    if (data) {
        data.map((l: any) => sendEmbed(l, webhook));
    }
}

console.log("[STATUS] Starting...");
