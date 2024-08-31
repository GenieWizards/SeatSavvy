import { logger } from "..";

jest.spyOn(global.console, "log");

describe("@seatsavvy/logger", () => {
  it("prints a message", () => {
    logger.info("hello");
    expect(console.log).toHaveBeenCalled();
  });
});
