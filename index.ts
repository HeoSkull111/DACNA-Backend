//Generate basic Express server with CORS and body-parser using ES Modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { routers } from "./src/modules/v1/index.ts";

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/v1/user", routers.user);
server.use("/v1/workday", routers.workday);
server.use("/v1/group", routers.group);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
