import { requestData } from "./index";
import fs from "fs";

const getFileData = (filename: string): Promise<string> => {
    return new Promise((res, rej) => {
        fs.readFile(filename, "utf-8", (err, data) => {
	    if (err) {
		rej(err);
		throw err;
	    }
	    res(data);
	});
    });
}

export const compareData = async () => {
    const siteData = await requestData("b");
    const fileData = JSON.parse(await getFileData("./items.json")) as string[];
    const allSame = siteData.every(l => fileData.includes(l)) && fileData.every(l => siteData.includes(l));
    if (allSame) return null;
    const diffs = siteData.filter(l => !(fileData.includes(l)));
    if (diffs.length > 0) {
        fs.writeFile("./items.json", JSON.stringify(diffs, null, 4), (err: unknown) => {
	    if (err) throw err;
	});
    }
    if (diffs.length < 5 && diffs.length > 0) {
         return diffs;
    }
    return null;
}
