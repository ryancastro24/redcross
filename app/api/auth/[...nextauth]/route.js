import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },

      async authorize(credentials) {
        // check if email and password fields are empty
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter email and password");
        }

        // check if use exist or registered
        const user = await prisma.userInfo.findFirst({
          where: {
            email: credentials.email,
          },
        });

        //  if no student was found
        if (!user || !user?.password) {
          throw new Error("User Not Found!");
        }

        console.log(user);

        //check if admin or not

        if (user.userType !== "admin") {
          throw new Error("Not Authorized!");
        }

        // if password match
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // if password dont match

        if (!passwordMatch) {
          throw new Error("Incorrect Password");
        }

        return user;
      }, //!end of authorize callbackfunction
    }),
  ],

  callbacks: {
    //create callback functions
    async jwt({ token, user, session, trigger }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          level: user.level,
          idNumber: user.idNumber,
          gender: user.gender,
          age: user.age,
          yearLevel: user.yearLevel,
          role: user.role,
          points: user.points,
          character: user.character,
          alliancePosition: user.alliancePosition,
          allianceId: user.allianceId,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      // console.log('Session callback',{session,token,user});

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          level: token.level,
          idNumber: token.idNumber,
          gender: token.gender,
          age: token.age,
          yearLevel: token.yearLevel,
          role: token.role,
          points: token.points,
          character: token.character,
          alliancePosition: token.alliancePosition,
          allianceId: token.allianceId,
        },
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", //json web tokens
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
