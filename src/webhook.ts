import axios from "axios";
import lang from "./lang";

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

export const sendEmbed = async (data: Record<string, any>, webhookUrls: string[]) => {
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
            value: `${lang[data.publishedContent.marketplace.toLowerCase() as keyof typeof lang]}${data.productInfo[0].merchPrice.fullPrice}`,
            inline: true
        },
        {
            name: "**Release date**",
            value: `${new Date(data.productInfo[0].launchView.startEntryDate).toLocaleString("en-US", { timeZone: "America/New_York" })}`,
            inline: true
        },
        {
            name: "**Sizes**",
            value: `${data.productInfo[0].skus.reduce((acc: string, cur: { nikeSize: string }) => acc + cur.nikeSize + ", ", "")}`
        },
    ];
    const embed = { color, title, url, footer, image, fields };

    console.log(embed);
    webhookUrls.map(l => {
        try {
            axios({
                method: "POST",
                url: l,
                data: {
                    embeds: [embed]
                }
            });
        } catch (e) { console.error(e) }
    });
};
