import { main } from "./main";
import { Webhooks, Apis } from "./urls";

setInterval(main, 10000, "fr", Apis.FR, Webhooks.TEST);
