import { requestData } from "./index";
import fs from "fs";

const getFileData = (filename: string): Promise<string> => {
    return new Promise((res, rej) => {
        const fileExists = fs.existsSync(filename);
        if (!fileExists) {
            fs.writeFile(filename, "utf-8", (err: unknown) => {
                if (err) throw err;
                res("{}");
            })
        } else {
            fs.readFile(filename, "utf-8", (err: unknown, data: string) => {
                if (err) {
                    rej(err);
                    throw err;
                }
                res(data);
            });
        }
    });
};

export const compareData = async (name: string, apiUrl: string, proxy: string) => {
    console.log("Api URL", apiUrl);
    const siteData = await requestData(apiUrl, proxy);
    const fileData = JSON.parse(await getFileData(`./items-${name}.json`));
    if (!fileData.pages) {
        fs.writeFile(`./items-${name}.json`, JSON.stringify(siteData, null, 4), (err: unknown) => {
            if (err) throw err;
            console.log("[INFO] File data has wrong schema, writing to file");
        });
        return null;
    }
    const allSame = siteData.pages.totalResources === fileData.pages.totalResources;
    console.log(`[INFO] All same: ${allSame}`)
    if (allSame) return null;
    const diffs = siteData.objects.filter((l: {id: string}) => {
        console.log((fileData.objects.map((j: {id: string}) => j.id).includes(l.id)));
        return !(fileData.objects.map((j: {id: string}) => j.id).includes(l.id))
    });
    if (diffs.length > 0) {
        fs.writeFile(`./items-${name}.json`, JSON.stringify(siteData, null, 4), (err: unknown) => {
            if (err) throw err;
            console.log("[INFO] Found diffs, writing to file");
        });
    }
    if (diffs.length < 5 && diffs.length > 0) {
        return diffs;
    }
    return null;
}
