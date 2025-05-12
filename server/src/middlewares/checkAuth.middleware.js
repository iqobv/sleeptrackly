import "dotenv/config";

const onlyForAdmin = process.env.ONLY_ADMIN === "true";
const isProd = process.env.NODE_ENV === "production";

export const checkAuth = async (req, res, next) => {
  const { role } = req.user;

  if (req.isAuthenticated()) {
    if (onlyForAdmin && isProd && role !== "admin") {
      return res.status(401).json({ message: "Temporarily disabled" });
    }

    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
