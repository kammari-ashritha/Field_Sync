import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../DB/UserModel.js";

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
}
