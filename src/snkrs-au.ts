import { main } from "./main";
import { Webhooks, Apis } from "./urls";

setInterval(main, 10000, "au", Apis.AU, Webhooks.AU);
