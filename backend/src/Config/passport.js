import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../DB/UserModel.js";

// Check if variables are missing and log a clear warning to your console
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("❌ CRITICAL ERROR: Google OAuth credentials are missing in backend/.env!");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "PLACEHOLDER",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "PLACEHOLDER",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "https://field-sync-1.onrender.com/api/auth/google/callback",
    },
    async (_at, _rt, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        if (!email) return done(new Error("No email from Google"));

        let user = await User.findOne({ email });
        const isAdminEmail = email === (process.env.ADMIN_EMAIL || "").toLowerCase();

        if (!user) {
          user = await User.create({
            name: profile.displayName || email,
            email,
            googleId: profile.id,
            role: isAdminEmail ? "admin" : "worker",
          });
        } else if (!user.googleId) {
          user.googleId = profile.id;
          if (isAdminEmail && user.role !== "admin") user.role = "admin";
          await user.save();
        }
        done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);