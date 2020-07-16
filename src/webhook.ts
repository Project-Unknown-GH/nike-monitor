import axios from "axios";

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

export const sendEmbed = async (data: Record<string, any>, webhookUrl: string) => {
    const color = 0x008080;
    const title = "New upcoming product!";
    const url = "https://www.nike.com/launch?s=upcoming";
    const footer = {
        text: `Project Unknown | Powered by https://discord.gg/24TqAYj | ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`
    };
    const thumbnail = {
        url: data.productInfo[0].imageUrls.productImageUrl
    };
    const fields = [
        {
            name: "**Title**",
            value: `[${data.productInfo[0].merchProduct.labelName}](https://nike.com/launch/t/${data.productInfo[0].productContent.slug})`,
            inline: true
        },
        {
            name: "**Style**",
            value: `${data.productInfo[0].merchProduct.styleType}`,
            inline: true
        },
        {
            name: "**Price**",
            value: `$${data.productInfo[0].merchPrice.fullPrice}`,
            inline: true
        },
        {
            name: "**Release date**",
            value: `${new Date(data.productInfo[0].launchView.startEntryDate).toLocaleString("en-US", { timeZone: "America/New_York" })}`
        }
    ];
    const embed = { color, title, url, footer, thumbnail, fields };

    console.log(embed);
    try {
    axios({
        method: "POST",
        url: webhookUrl,
        data: {
            embeds: [embed]
        }
    });
} catch (e) { console.error(e) }
};
