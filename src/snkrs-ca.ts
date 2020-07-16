import { main } from "./main";
import { Webhooks, Apis } from "./urls";

setInterval(main, 10000, "ca", Apis.CA, Webhooks.CA);
