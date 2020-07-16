import { main } from "./main";
import { Webhooks, Apis } from "./urls";

setInterval(main, 10000, "us", Apis.US, Webhooks.US);
