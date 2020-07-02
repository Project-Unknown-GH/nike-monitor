"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const apiUrl = "https://www.nike.com/sitemap-launch-en-us.xml";
const requestData = async (proxy) => {
    const response = await axios_1.default({
        method: "GET",
        url: apiUrl
    });
    console.log(Object.keys(response));
    console.log(response.data.match(/<url>[ \S]*<\/url>/g).flatMap((l) => l.match(/<loc>[ \S]*<\/loc>/g)).map((l) => l.slice(5).slice(0, -6)));
};
requestData("b");
