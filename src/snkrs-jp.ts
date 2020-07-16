import { main } from "./main";
import { Webhooks, Apis } from "./urls";

setInterval(main, 10000, "jp", Apis.JP, Webhooks.JP);
