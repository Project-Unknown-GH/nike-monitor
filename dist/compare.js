"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareData = void 0;
const index_1 = require("./index");
const fs_1 = __importDefault(require("fs"));
const getFileData = (filename) => {
    return new Promise((res, rej) => {
        fs_1.default.readFile(filename, "utf-8", (err, data) => {
            if (err) {
                rej(err);
                throw err;
            }
            res(data);
        });
    });
};
exports.compareData = async (name, apiUrl, proxy) => {
    console.log("Api URL", apiUrl);
    const siteData = await index_1.requestData(apiUrl, proxy);
    const fileData = JSON.parse(await getFileData(`./items-${name}.json`));
    if (!fileData.pages) {
        fs_1.default.writeFile(`./items-${name}.json`, JSON.stringify(siteData, null, 4), (err) => {
            if (err)
                throw err;
            console.log("[INFO] File data has wrong schema, writing to file");
        });
        return null;
    }
    const allSame = siteData.pages.totalResources === fileData.pages.totalResources;
    console.log(`[INFO] All same: ${allSame}`);
    if (allSame)
        return null;
    const diffs = siteData.objects.filter((l) => {
        console.log((fileData.objects.map((j) => j.id).includes(l.id)));
        return !(fileData.objects.map((j) => j.id).includes(l.id));
    });
    if (diffs.length > 0) {
        fs_1.default.writeFile(`./items-${name}.json`, JSON.stringify(siteData, null, 4), (err) => {
            if (err)
                throw err;
            console.log("[INFO] Found diffs, writing to file");
        });
    }
    if (diffs.length < 5 && diffs.length > 0) {
        return diffs;
    }
    return null;
};
