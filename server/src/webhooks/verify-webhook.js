import { verifyWebhook } from "@clerk/express/webhooks";
import { User } from "../db/mongoose";

export default async function webhook(req, res) {
  try {
    const event = await verifyWebhook(req);

    const user = event.data;

    if (event.type === "user.created") {
      await User.findOneAndUpdate(
        { clerkId: user.id },

        {
          clerkId: user.id,

          email: user.email_addresses[0].email_address,

          avatar: user.image_url,

          firstName: user.first_name,

          lastName: user.last_name,
        },

        {
          upsert: true,

          new: true,
        },
      );
    }

    if (event.type === "user.updated") {
      await User.findOneAndUpdate(
        { clerkId: user.id },

        {
          email: user.email_addresses[0].email_address,

          firstName: user.first_name,

          lastName: user.last_name,

          avatar: user.image_url,
        },

        {
          new: true,
        },
      );
    }

    if (event.type === "user.deleted") {
      await User.findOneAndDelete({
        clerkId: user.id,
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook processing failed:", error);

    res.status(400).json({
      message: "Webhook processing failed",
    });
  }
}
