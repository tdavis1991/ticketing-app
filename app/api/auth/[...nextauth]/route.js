import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import User from "@/app/(models)/User";
import { connectToDB } from "@/utils/database";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    // This callback runs whenever a session is created or updated
    async session({ session }) {
      // Retrieve user information from the database based on email
      const sessionUser = await User.findOne({ email: session.user.email });

      // Set the session user's ID to their MongoDB _id as a string
      session.user.id = sessionUser._id.toString();

      return session;
    },
    // This callback runs whenever a user signs in
    async signIn({ profile }) {
      try {
        await connectToDB(); // Connect to the database

        const userExists = await User.findOne({ email: profile.email }); // Check if the user already exists in the database

        if (!userExists && profile.email === "tdavis.070991@gmail.com") {
          // If the user doesn't exist, create a new user with data from Google profile
          await User.create({
            email: profile.email,
            fullName: profile.name.toUpperCase(),
            avatar: profile.picture,
            role: "admin",
          });
        }

        if (!userExists) {
          // If the user doesn't exist, create a new user with data from Google profile
          await User.create({
            email: profile.email,
            fullName: profile.name.toUpperCase(),
            avatar: profile.picture,
          });
        }

        return true; // Return true to indicate successful sign-in
      } catch (error) {
        console.log(error); // Log any errors that occur during sign-in
        return false; // Return false to indicate an error occurred during sign-in
      }
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
