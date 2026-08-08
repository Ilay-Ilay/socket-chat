import { verifyWebhook } from "@clerk/express/webhooks";

export default async function webhook(req, res) {
  try {
    const event = await verifyWebhook(req);

    console.log(event);
    const eventType = event.type;
    console.log(eventType);

    console.log(req.data);

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook verification failed:", error);
    res.status(400).json({ message: "Webhook verification failed", error });
  }
}
