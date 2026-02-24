// types/next-auth.d.ts
import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

    interface User {
        accessToken?: string
        firstName?: string
        middleName?: string
        lastName?: string
        username?: string
        id?: string
    }

    interface Session {
        user: {
            id?: string
            firstName?: string
            middleName?: string
            lastName?: string
            username?: string
            accessToken?: string
        } & DefaultSession["user"]
        accessToken?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
        id?: string
        firstName?: string
        middleName?: string
        lastName?: string
        username?: string
        email?: string
    }
}