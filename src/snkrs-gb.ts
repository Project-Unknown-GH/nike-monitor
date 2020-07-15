import { main } from "./main";
import { Webhooks, Apis } from "./urls";

setInterval(main, 10000, Apis.GB, Webhooks.GB);
