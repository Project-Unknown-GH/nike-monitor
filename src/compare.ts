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

export const compareData = async (apiUrl: string, proxy: string) => {
    const siteData = await requestData(apiUrl, proxy);
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
