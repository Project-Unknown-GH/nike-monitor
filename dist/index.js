"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestData = void 0;
const axios_1 = __importDefault(require("axios"));
const urls_1 = require("./urls");
const httpsProxyAgent = require("https-proxy-agent");
exports.requestData = async (apiUrl, proxy) => {
    console.log("Proxy", proxy, "Requesting to", apiUrl);
    const response = await axios_1.default({
        method: "GET",
        url: apiUrl,
    });
    return response.data;
};
exports.requestData(urls_1.Apis.US, "");
