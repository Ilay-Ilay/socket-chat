import { getAuth } from "@clerk/express";

function protectRoute(req, res, next) {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      return res.status(401).send("User not authenticated");
    }

    req.userId = auth.userId;

    next();
  } catch (error) {
    res.status(401).send("User not authenticated");
  }
}

export default protectRoute;
