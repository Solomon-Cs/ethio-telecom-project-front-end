// middleware.ts  (place at project root or src/)
import { auth } from "./auth"; // adjust path if needed (e.g. "@/auth")
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = [
    "/dashboard",
    "/profile",
    "/transactions",
    "/category",
    // Do NOT include "/" here unless you really want landing page to require login
];

const PUBLIC_PATHS = [
    "/auth/login",
    "/auth/signup",
    "/auth/error",
    // Add more public routes if needed: "/", "/about", "/pricing", etc.
];

function isProtected(pathname: string): boolean {
    return PROTECTED_PATHS.some((prefix) => {
        if (prefix === "/") return pathname === "/";
        return pathname === prefix || pathname.startsWith(`${prefix}/`);
    });
}

function isPublic(pathname: string): boolean {
    return PUBLIC_PATHS.some((path) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    });
}

export default auth((req: NextRequest & { auth: any }) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth?.user;

    // Debug log – remove in production
    console.log(
        `[Middleware] ${pathname} → logged in: ${isLoggedIn ? "YES" : "NO"}`
    );

    // Allow public routes
    if (isPublic(pathname)) {
        // Optional: redirect logged-in users away from auth pages
        if (
            isLoggedIn &&
            (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))
        ) {
            const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") || "/dashboard";
            return NextResponse.redirect(new URL(callbackUrl, req.url));
        }
        return NextResponse.next();
    }

    // Protect selected routes (including / if you added it)
    if (isProtected(pathname) && !isLoggedIn) {
        const loginUrl = new URL("/auth/login", req.url);
        loginUrl.searchParams.set("callbackUrl", encodeURI(pathname + req.nextUrl.search));
        console.log(`[Middleware] Redirecting to: ${loginUrl.toString()}`);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        /*
         * Match all paths except:
         * - static files
         * - image optimization
         * - favicon
         * - public assets
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|json)$).*)",
        "/",
    ],
};