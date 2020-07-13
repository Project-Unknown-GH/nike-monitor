import cheerio from "cheerio";
import axios from "axios";
const httpsProxyAgent = require("https-proxy-agent");

export const getWebsiteData = async (site: string, proxy: string) => {
    const raw = await axios({
        method: "GET",
        url: site,
        httpsAgent: new httpsProxyAgent(proxy)
    })
    const $ = cheerio.load(raw.data);
    return $('.product-info')[0].children.flatMap(l => l.children).flatMap(l => l.children ? l.children : l).flatMap(l => l.children ? l.children : l).flat(10);
}