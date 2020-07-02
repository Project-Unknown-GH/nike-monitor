import axios from "axios";

const urlToEmbed = (prodUrl: string) => {
    const color = 0x008080;
    const title = "New upcoming product!";
    const url = "https://www.nike.com/launch?s=upcoming";
    const footer = {
        text: `Project Unknown | Powered by https://discord.gg/24TqAYj | ${new Date().toLocaleString("en-US", {timeZone: "America/New_York"})}`
    };
    const fields = [
        {
	    name: "Link",
	    value: `[Click here](${prodUrl})`
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

export const sendEmbed = (urls: string[], webhookUrl: string) => {
    const embeds = urls.map(urlToEmbed);
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
