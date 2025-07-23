import { AuthOptions } from "@/features/auth/next-auth";
import NextAuth from "next-auth";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
