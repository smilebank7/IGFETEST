import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "id", type: "text" },
        password: { label: "password", type: "password" },
      },

      // 로그인 실행
      async authorize(credentials) {
        const params = {
          userId: credentials?.id,
          userPw: credentials?.password,
        };
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/api/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          });

          const res = await response.json();

          if (res.message === "OK") {
            return {
              id: res.user.id,
              role: res.user.role,
            };
          } else {
            throw new Error(res.message);
          }
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  // 커스텀 로그인 페이지 사용
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };