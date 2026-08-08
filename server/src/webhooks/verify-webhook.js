import { verifyWebhook } from "@clerk/express/webhooks";

export default async function webhook(req, res) {
  try {
    const event = await verifyWebhook(req);
    console.log(
      "******************************************************************",
    );
    console.log(event);
    const eventType = evt.type;
    console.log(eventType);

    console.log(req.data);
    console.log(
      "******************************************************************",
    );
    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook verification failed:", error);
  }
}
