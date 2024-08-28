import { createServer } from "./server";
import { logger } from "@seatsavvy/logger";

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  logger.info(`api running on ${port}`);
});
