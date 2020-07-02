import { compareData } from "./compare";
import { sendEmbed } from "./webhook";

const main = async () => {
    const data = await compareData();
    if (data) {
        sendEmbed(data, "https://discord.com/api/webhooks/726133952469008397/aENg94lwsRmsCTVuKkOqZmcagZdschiCKdzzzoeBSDUMbKYoPVCvFiaV62ik3ST6-iSc");
    }
}

main();
