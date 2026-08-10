import { verifyWebhook } from "@clerk/express/webhooks";

export default async function webhook(req, res) {
  try {
    const event = await verifyWebhook(req);

    const eventType = event.type;

    const data = JSON.parse(req.body.toString());

    if (eventType === "user.created") {
      console.log("NEW USER CREATED");
      console.log("NEW USER CREATED");
      console.log("NEW USER CREATED");
      console.log("NEW USER CREATED");
      console.log("NEW USER CREATED");
      console.log("NEW USER CREATED");
      console.log(data);
    }
    if (eventType === "user.updated") {
      console.log("NEW USER UPDATED");
    }
    if (eventType === "user.deleted") {
      console.log("NEW USER DELETED");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook verification failed:", error);
    res.status(400).json({ message: "Webhook verification failed", error });
  }
}
