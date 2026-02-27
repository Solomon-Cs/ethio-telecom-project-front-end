// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(4) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { username, password } = parsedCredentials.data;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
            }
          );

          if (!response.ok) return null;

          // Adjust based on your actual API response format
          const accessToken = await response.text(); // or await response.json() → .accessToken

          const decoded: any = jwtDecode(accessToken);

          return {
            id: decoded.userId || decoded.sub || decoded.id,
            name:
              decoded.username ||
              decoded.name ||
              `${decoded.firstName || ""} ${decoded.lastName || ""}`.trim(),
            email: decoded.email,
            firstName: decoded.firstName,
            middleName: decoded.middleName,
            lastName: decoded.lastName,
            username: decoded.username,
            accessToken, // important: store raw token
          };
        } catch (error) {
          console.error("Credentials auth error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.firstName = user.firstName;
        token.middleName = user.middleName;
        token.lastName = user.lastName;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string | undefined;
        session.user.middleName = token.middleName as string | undefined;
        session.user.lastName = token.lastName as string | undefined;
        session.user.username = token.username as string | undefined;
        session.accessToken = token.accessToken as string | undefined;
      }
      return session;
    },
  },
});