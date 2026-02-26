import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { jwtDecode } from 'jwt-decode';

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Add the secret here
  secret: process.env.AUTH_SECRET,

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(4) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

          try {
            // Call your backend API
            const response = await fetch(
              process.env.NEXT_PUBLIC_API_URL + '/auth/login',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
              },
            );

            if (!response.ok) {
              return null;
            }

            // Get the access token from response
            // Assuming your API returns the token directly as a string
            const accessToken = await response.text();

            // Or if it returns JSON:
            // const data = await response.json();
            // const accessToken = data.accessToken || data.token || data.access_token;

            console.log('✅ Received access token:', accessToken);

            // Decode the JWT to get user information
            const decodedToken: any = jwtDecode(accessToken);
            console.log('📦 Decoded token:', decodedToken);

            // Extract user info from the decoded token
            return {
              id: decodedToken.userId || decodedToken.sub || decodedToken.id,
              name:
                decodedToken.username ||
                decodedToken.name ||
                `${decodedToken.firstName} ${decodedToken.lastName}`.trim(),
              email: decodedToken.email,
              firstName: decodedToken.firstName,
              middleName: decodedToken.middleName,
              lastName: decodedToken.lastName,
              username: decodedToken.username,
              accessToken: accessToken, // Store the raw token
            };
          } catch (error) {
            console.error('Error during authentication:', error);
            return null;
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // Persist the access token and user info to the token right after signin
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.firstName = user.firstName;
        token.middleName = user.middleName;
        token.lastName = user.lastName;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Send properties to the client
      if (session.user) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.middleName = token.middleName;
        session.user.lastName = token.lastName;
        session.user.username = token.username;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard =
        nextUrl.pathname === '/dashboard' ||
        nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (
        isLoggedIn &&
        (nextUrl.pathname === '/auth/login' ||
          nextUrl.pathname === '/auth/signup')
      ) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
