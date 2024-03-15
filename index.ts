import { createServer } from "./src/core/server";
import { initializeMongoDB } from "./src/core/mongo";
import { routers } from "./src/modules/v1/index";

export const server = createServer();

server.loadRouters(routers);

initializeMongoDB();
server.run();
