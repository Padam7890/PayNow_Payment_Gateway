import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";


interface Authentication{
  token: any;
  user: User
}
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone Number", type: "text", placeholder: "1231", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials: any) {
        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              number: existingUser.number,
              address: existingUser.address || null, // Ensure address is included
              city: existingUser.city || null, // Ensure city is included
              email: existingUser.email || null, // Ensure email is included
            };
          }
          throw new Error("Invalid Password");
        }

        throw new Error("Phone Number not found");
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.name = token.name; 
        session.user.number = token.number;
        session.user.address = token.address;
        session.user.city = token.city;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      // Include additional user data in the JWT token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.number = user.number;
        token.address = user.address;
        token.city = user.city;
        token.email = user.email;
      }
      return token;
    },
  },
};
