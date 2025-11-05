import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/root/home.tsx"),
    layout("./routes/auth/authLayout.tsx", [
        route("login", "routes/auth/login.tsx"),
        route("register", "routes/auth/register.tsx"),
        route("verify-email", "routes/auth/verify-email.tsx"),
        route("forgot-password", "routes/auth/forgot-password.tsx"),
        route("reset-password", "routes/auth/reset-password.tsx"),
    ]),
    route("dashboard", "routes/dashboard/index.tsx"),
    // layout(>)
] satisfies RouteConfig;
