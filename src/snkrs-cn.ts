import { main } from "./main";
import { Webhooks, Apis } from "./urls";

setInterval(main, 10000, "cn", Apis.CN, Webhooks.CN);
