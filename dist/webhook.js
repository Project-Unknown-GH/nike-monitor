"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmbed = void 0;
const axios_1 = __importDefault(require("axios"));
const lang_1 = __importDefault(require("./lang"));
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
exports.sendEmbed = async (data, webhookUrls) => {
    const color = 0x008080;
    const title = "New product has been loaded!";
    const url = `https://nike.com/${data.publishedContent.marketplace}/launch/t/${data.productInfo[0].productContent.slug}`;
    const footer = {
        text: `Project Unknown | Powered by https://discord.gg/24TqAYj | ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`
    };
    const image = {
        url: data.productInfo[0].imageUrls.productImageUrl
    };
    const fields = [
        {
            name: "**Name**",
            value: `[${data.productInfo[0].merchProduct.labelName}](https://nike.com/${data.publishedContent.marketplace}/launch/t/${data.productInfo[0].productContent.slug})`,
            inline: true
        },
        {
            name: "**Launch type**",
            value: `${data.productInfo[0].launchView.method}`,
            inline: true
        },
        {
            name: "**PID**",
            value: `${data.productInfo[0].merchProduct.pid}`,
            inline: true
        },
        {
            name: "**Price**",
            value: `${lang_1.default[data.publishedContent.marketplace.toLowerCase()]}${data.productInfo[0].merchPrice.fullPrice}`,
            inline: true
        },
        {
            name: "**Release date**",
            value: `${new Date(data.productInfo[0].launchView.startEntryDate).toLocaleString("en-US", { timeZone: "America/New_York" })}`,
            inline: true
        },
        {
            name: "**Sizes**",
            value: `${data.productInfo[0].skus.reduce((acc, cur) => acc + cur.nikeSize + ", ", "")}`
        },
    ];
    const embed = { color, title, url, footer, image, fields };
    console.log(embed);
    webhookUrls.map(l => {
        try {
            axios_1.default({
                method: "POST",
                url: l,
                data: {
                    embeds: [embed]
                }
            });
        }
        catch (e) {
            console.error(e);
        }
    });
};
