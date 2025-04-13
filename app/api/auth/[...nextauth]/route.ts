import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        // Add logic here to look up the user from the credentials supplied
        const accountCredential = await prisma.accountCredential.findFirst({
          where: { email: credentials?.username },
        });

        if (!accountCredential) {
          return null;
        }

        console.log("Account Credential:", accountCredential);

        if (!bcrypt.compareSync(credentials.password, accountCredential.password)) {
          return null;
        }

        const foundUser = await prisma.user.findFirst({
          where: { id: accountCredential.userId },
        });

        console.log(foundUser);

        if (foundUser) {
          // Any object returned will be saved in `user` property of the JWT
          return foundUser;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
