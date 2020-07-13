import { requestData } from "./index";
import fs from "fs";
import axios from "axios";

const getFileData = (filename: string): Promise<string> => {
    return new Promise((res, rej) => {
        fs.readFile(filename, "utf-8", (err: unknown, data: string) => {
            if (err) {
                rej(err);
                throw err;
            }
            res(data);
        });
    });
};

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

export const compareData = async () => {
    const proxies = await getProxyUrls();
    const proxy = proxies[Math.floor(Math.random() * proxies.length)]
    const siteData = await requestData(proxy);
    const fileData = JSON.parse(await getFileData("./items.json")) as string[];
    const allSame = siteData.every(l => fileData.includes(l)) && fileData.every(l => siteData.includes(l));
    if (allSame) return null;
    const diffs = siteData.filter(l => !(fileData.includes(l)));
    if (diffs.length > 0) {
        fs.writeFile("./items.json", JSON.stringify(siteData, null, 4), (err: unknown) => {
            if (err) throw err;
            console.log("[INFO] Found diffs, writing to file");
        });
    }
    if (diffs.length < 5 && diffs.length > 0) {
        return diffs;
    }
    return null;
}
