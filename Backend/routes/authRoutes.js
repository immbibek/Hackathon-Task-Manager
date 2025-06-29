// routes/authRoutes.js
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Start Google OAuth
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Callback route
router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    // Send token to frontend (for simplicity: send in query param or JSON)
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  }
);

export default router;
