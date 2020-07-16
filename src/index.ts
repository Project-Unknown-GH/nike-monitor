import axios from "axios";
import { Apis } from "./urls";
const httpsProxyAgent = require("https-proxy-agent");

export const requestData = async (apiUrl: string, proxy: string) => {
	console.log("Proxy", proxy, "Requesting to", apiUrl);
    const response = await axios({
        method: "GET",
		url: apiUrl,
	});
	return response.data;
}

requestData(Apis.US, "");