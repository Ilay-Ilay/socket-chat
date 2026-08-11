function protectRoute(req, res, next) {
  try {
    const auth = getAuth(req);

    console.log("AUTH:", auth);

    console.log("USER ID:", auth.userId);
    console.log("AUTH:", auth);

    console.log("USER ID:", auth.userId);
    console.log("AUTH:", auth);

    console.log("USER ID:", auth.userId);
    console.log("AUTH:", auth);

    console.log("USER ID:", auth.userId);
    console.log("AUTH:", auth);

    console.log("USER ID:", auth.userId);
    console.log("AUTH:", auth);

    console.log("USER ID:", auth.userId);

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
