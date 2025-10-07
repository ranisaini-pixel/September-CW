import cron from "node-cron";
import userAvailabilityModel from "../models/userAvailabilityModel";

// Run every 1 hour
export const task = cron.schedule("*/5 * * * *", async () => {
  try {
    const result = await userAvailabilityModel.deleteMany({
      expiry: { $lt: new Date() },
    });

    if (result.deletedCount > 0) {
      console.log(
        `${result.deletedCount} expired user availabilities removed.`
      );
    }
  } catch (err) {
    console.error("Error while deleting expired availabilities:", err);
  }
});
