"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compare_1 = require("./compare");
const webhook_1 = require("./webhook");
const axios_1 = __importDefault(require("axios"));
const getProxyUrls = async () => {
    const response = await axios_1.default({
        method: "GET",
        url: "https://api.projectunkn.com/api/proxies/"
    });
    return response.data.map((l) => l.proxy).map(proxyToUrl);
};
const proxyToUrl = (proxy) => {
    const splitProxy = proxy.split(":");
    const reorganizedProxy = [[splitProxy[2], splitProxy[3]], [splitProxy[0], splitProxy[1]]];
    const joinedProxy = reorganizedProxy.map(l => l.join(":")).join("@");
    return `http://${joinedProxy}`;
};
const main = async () => {
    const proxies = await getProxyUrls();
    const proxy = proxies[Math.floor(Math.random() * proxies.length)];
    const data = await compare_1.compareData(proxy);
    if (data) {
        webhook_1.sendEmbed(data, "https://discord.com/api/webhooks/726133952469008397/aENg94lwsRmsCTVuKkOqZmcagZdschiCKdzzzoeBSDUMbKYoPVCvFiaV62ik3ST6-iSc", proxy);
    }
};
console.log("[STATUS] Starting...");
setInterval(main, 10000);
