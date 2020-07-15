import { compareData } from "./compare";
import { sendEmbed } from "./webhook";
import axios from "axios";

const getProxyUrls = async () => {
    const response = await axios({
        method: "GET",
        url: "https://api.projectunkn.com/api/proxies/"
    });
    return response.data.map((l: {proxy: string}) => l.proxy).map(proxyToUrl);
};

const proxyToUrl = (proxy: string) => {
    const splitProxy = proxy.split(":");
    const reorganizedProxy = [[splitProxy[2], splitProxy[3]], [splitProxy[0], splitProxy[1]]];
    const joinedProxy = reorganizedProxy.map(l => l.join(":")).join("@");
    return `http://${joinedProxy}`;
};


const main = async () => {
    const proxies = await getProxyUrls();
    const proxy = proxies[Math.floor(Math.random() * proxies.length)];
    const data = await compareData(proxy);
    if (data) {
        sendEmbed(data, "https://discord.com/api/webhooks/726133952469008397/aENg94lwsRmsCTVuKkOqZmcagZdschiCKdzzzoeBSDUMbKYoPVCvFiaV62ik3ST6-iSc", proxy);
    }
}

console.log("[STATUS] Starting...");
setInterval(main, 10000);
