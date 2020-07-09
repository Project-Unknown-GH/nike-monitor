import cheerio from "cheerio";
import axios from "axios";

const proxies = ``.split("\n");

export const getWebsiteData = async (site: string) => {
    const raw = await axios({
        method: "GET",
        url: site
    })
    const $ = cheerio.load(raw.data);
    return $('.product-info')[0].children.flatMap(l => l.children).flatMap(l => l.children ? l.children : l).flatMap(l => l.children ? l.children : l).flat(10);
}