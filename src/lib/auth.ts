import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/server/db";

type User = {
  id: string;
  name: string;
  phonenumber: string | null;
  school: string;
  roles: {
    role: string;
  }[];
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        phonenumber: { label: "phonenumber", type: "number" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {

        if (credentials?.phonenumber && credentials?.password) {
          const user = await db.user.findFirst({
            where: { phonenumber: credentials.phonenumber },
            include: { roles: true }
          });

          if (user) {
            const isPasswordCorrect = credentials.password === user.password;
            user.password = null;

            if (isPasswordCorrect) {
              return {
                id: user.id,
                name: user.name,
                phonenumber: user.phonenumber,
                roles: user.roles,
                school: user.schoolId,
              };
            } else {
              throw new Error("Invalid Password");
            }
          } else {
            throw new Error("User not found");
          }
        }
        throw new Error("Credentials not provided");
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      const userdata = user as User;
      if (user) {
        token.sub = userdata.id
        token.phonenumber = userdata.phonenumber
        token.name = userdata.name
        token.school = userdata.school
        token.roles = userdata.roles
      }
      return token
    },

    async session({ session, token }) {
      
      if(session.user){
        session.user.name = token.name
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          phonenumber: token.phonenumber,
          name: token.name,
          school: token.school,
          roles: token.roles,
          currentRole: null,
        },
      }
    }
  }
}