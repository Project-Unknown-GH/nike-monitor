import axios from "axios";

const apiUrl = "https://www.nike.com/sitemap-launch-en-us.xml";

const requestData = async (proxy: string) => {
    const response = await axios({
        method: "GET",
	url: apiUrl
    });
	console.log(Object.keys(response));
    console.log(response.data.match(/<url>[ \S]*<\/url>/g).flatMap((l: string) => l.match(/<loc>[ \S]*<\/loc>/g)).map((l: string) => l.slice(5).slice(0, -6)));
}

requestData("b");
