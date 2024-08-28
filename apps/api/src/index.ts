import { createServer } from "./server";
import { logger } from "@seatsavvy/logger";

const PORT = process.env.PORT || 5500;
const server = createServer();

server.listen(PORT, () => {
  logger.info(`api running on ${PORT}`);
});
