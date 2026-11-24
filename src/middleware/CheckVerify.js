export let CheckVerify = async (req, res, next) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res
        .status(400)
        .json({ msg_login: "Please login — no token provided" });
    }

    const decoded = jwt.verify(token, config.jwtsecret);

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ msg_signup: "Please signup" });
    }

    if (user.verified === false) {
      return res.status(400).json({
        msg_not_verified: "User is not verified",
        user,
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ msg_login: "Invalid or expired token" });
  }
};
