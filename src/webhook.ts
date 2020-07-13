import axios from "axios";
import { getWebsiteData } from "./cheerio";

const urlToEmbed = (prodUrl: string, cheerioData: Record<string, any>[]) => {
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
    }
}

export const sendEmbed = async (urls: string[], webhookUrl: string, proxy: string) => {
    const cheerioed = await Promise.all(urls.map(async l => await getWebsiteData(l, proxy)));
    console.log(cheerioed.map(l => l.map(j => j.data)));
    const embeds = urls.map((l, idx) => urlToEmbed(l, cheerioed[idx]));
    const trueEmbeds: Record<string, unknown>[][] = [[]];
    for (const embed of embeds) {
        if (trueEmbeds[trueEmbeds.length - 1].length < 10) {
            trueEmbeds[trueEmbeds.length - 1].push(embed);
        } else {
            trueEmbeds.push([embed]);
        }
    }
    for (const embed of trueEmbeds) {
        axios({
            method: "POST",
            url: webhookUrl,
            data: {
                embeds: embed
            }
        });
    }
};
