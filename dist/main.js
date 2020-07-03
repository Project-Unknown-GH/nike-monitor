"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compare_1 = require("./compare");
const webhook_1 = require("./webhook");
const main = async () => {
    const data = await compare_1.compareData();
    if (data) {
        webhook_1.sendEmbed(data, "https://discord.com/api/webhooks/726133952469008397/aENg94lwsRmsCTVuKkOqZmcagZdschiCKdzzzoeBSDUMbKYoPVCvFiaV62ik3ST6-iSc");
    }
};
console.log("[STATUS] Starting...");
setInterval(main, 10000);
