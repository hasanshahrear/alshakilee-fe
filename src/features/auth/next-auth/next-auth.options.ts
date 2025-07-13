import { Api } from "@/features/api";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Please provide both phone and password");
        }

        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${baseUrl}/${Api.Login}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: credentials.phone,
              password: credentials.password,
            }),
          });

          const data = await response.json();
          console.log("API Response:", data);

          if (!response.ok) {
            throw new Error(data.message || "Authentication failed");
          }

          if (data.user && data.accessToken) {
            return {
              id: String(data.user.id),
              name: data.user.name,
              phone: data.user.phone,
              role: data.user.role,
              accessToken: data.accessToken,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as {
        id: string;
        name: string;
        phone: string;
        role: string;
      };
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};
