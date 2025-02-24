import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("common/pages/home.tsx"),
    route("/trend_charts", "features/trend_charts/pages/trend_chart_page.tsx")
] satisfies RouteConfig;

