import axios from "axios";
const httpsProxyAgent = require("https-proxy-agent");

export const requestData = async (apiUrl: string, proxy: string): Promise<string[]> => {
	console.log("Proxy", proxy, "Requesting to", apiUrl);
    const response = await axios({
        method: "GET",
		url: apiUrl,
		httpsAgent: new httpsProxyAgent(proxy)
	});
	console.log(response.data);
    return response.data
		.match(/<url>[ \S]*<\/url>/g)
		.flatMap((l: string) => l.match(/<loc>[ \S]*<\/loc>/g))
		.map((l: string) => 
		    l
		        .slice(5)
			.slice(0, -6));
}

