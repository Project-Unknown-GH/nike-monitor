"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestData = void 0;
const axios_1 = __importDefault(require("axios"));
const httpsProxyAgent = require("https-proxy-agent");
const apiUrl = "https://www.nike.com/sitemap-launch-en-us.xml";
exports.requestData = async (proxy) => {
    const response = await axios_1.default({
        method: "GET",
        url: apiUrl,
        httpsAgent: new httpsProxyAgent(proxy)
    });
    return response.data
        .match(/<url>[ \S]*<\/url>/g)
        .flatMap((l) => l.match(/<loc>[ \S]*<\/loc>/g))
        .map((l) => l
        .slice(5)
        .slice(0, -6));
};
