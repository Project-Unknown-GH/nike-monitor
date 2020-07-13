"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmbed = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("./cheerio");
const urlToEmbed = (prodUrl, cheerioData) => {
    const color = 0x008080;
    const title = "New upcoming product!";
    const url = "https://www.nike.com/launch?s=upcoming";
    const footer = {
        text: `Project Unknown | Powered by https://discord.gg/24TqAYj | ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`
    };
    const fields = [
        {
            name: "**Title**",
            value: `[${cheerioData[0].data}](${prodUrl})`,
            inline: true
        },
        {
            name: "**Style**",
            value: `${cheerioData[1].data}`,
            inline: true
        },
        {
            name: "**Price**",
            value: `${cheerioData[2].data}`,
            inline: true
        },
        {
            name: "**Description**",
            value: `${cheerioData[3].data}`
        },
        {
            name: "**SKU**",
            value: `${cheerioData[4].data}`
        }
    ];
    return {
        color,
        title,
        url,
        fields,
        footer
    };
};
exports.sendEmbed = async (urls, webhookUrl, proxy) => {
    const cheerioed = await Promise.all(urls.map(async (l) => await cheerio_1.getWebsiteData(l, proxy)));
    console.log(cheerioed.map(l => l.map(j => j.data)));
    const embeds = urls.map((l, idx) => urlToEmbed(l, cheerioed[idx]));
    const trueEmbeds = [[]];
    for (const embed of embeds) {
        if (trueEmbeds[trueEmbeds.length - 1].length < 10) {
            trueEmbeds[trueEmbeds.length - 1].push(embed);
        }
        else {
            trueEmbeds.push([embed]);
        }
    }
    for (const embed of trueEmbeds) {
        axios_1.default({
            method: "POST",
            url: webhookUrl,
            data: {
                embeds: embed
            }
        });
    }
};
