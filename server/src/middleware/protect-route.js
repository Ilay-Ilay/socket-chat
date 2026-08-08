function protectRoute(req, res, next) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).send("User not authenticated");
    }

    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).send("User not authenticated");
  }
}

export default protectRoute;
