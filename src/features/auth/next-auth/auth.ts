import NextAuth from "next-auth";
import { AuthOptions } from "./next-auth.options";

export const { auth } = NextAuth(AuthOptions);

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
