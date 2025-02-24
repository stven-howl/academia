import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Link, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, redirect, useSearchParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { createElement, useState } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { BellIcon, MessageCircleIcon, BarChart3Icon, UserIcon, SettingsIcon, LogOutIcon, ChevronLeftIcon, MoreHorizontalIcon, ChevronRightIcon, DotIcon } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { createClient } from "@supabase/supabase-js";
import * as RechartsPrimitive from "recharts";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as TogglePrimitive from "@radix-ui/react-toggle";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator-root",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-accent/50 data-[state=open]:bg-accent/50 data-[active=true]:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1"
);
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Navigation({
  isLoggedIn,
  hasNotification,
  hasMessage
}) {
  return /* @__PURE__ */ jsxs("nav", { className: "w-[1400px] mx-auto flex px-10 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-xl font-bold tracking-tighter", children: "Academia" }),
      /* @__PURE__ */ jsx(Separator, { orientation: "vertical", className: "h-6 mx-4" })
    ] }),
    isLoggedIn ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", asChild: true, className: "relative", children: /* @__PURE__ */ jsxs(Link, { to: "/my/notifications", children: [
        /* @__PURE__ */ jsx(BellIcon, { className: "w-4 h-4" }),
        hasNotification && /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" })
      ] }) }),
      /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", asChild: true, className: "relative", children: /* @__PURE__ */ jsxs(Link, { to: "/my/messages", children: [
        /* @__PURE__ */ jsx(MessageCircleIcon, { className: "w-4 h-4" }),
        hasMessage && /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" })
      ] }) }),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Avatar, { children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: "https://github.com/shadcn.png" }),
          /* @__PURE__ */ jsx(AvatarFallback, { children: "N" })
        ] }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", children: [
          /* @__PURE__ */ jsxs(DropdownMenuLabel, { className: "flex flex-col justify-center items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "John Doe" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "@username" })
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/my/dashboard", children: [
              /* @__PURE__ */ jsx(BarChart3Icon, { className: "w-4 h-4 mr-2" }),
              "Dashboard"
            ] }) }),
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/my/profile", children: [
              /* @__PURE__ */ jsx(UserIcon, { className: "w-4 h-4 mr-2" }),
              "Profile"
            ] }) }),
            /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/my/settings", children: [
              /* @__PURE__ */ jsx(SettingsIcon, { className: "w-4 h-4 mr-2" }),
              "Settings"
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs(Link, { to: "/logout", children: [
            /* @__PURE__ */ jsx(LogOutIcon, { className: "w-4 h-4 mr-2" }),
            "Logout"
          ] }) })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Login" }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/signup", children: "Join" }) })
    ] })
  ] });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Navigation, {
      isLoggedIn: false,
      hasNotification: false,
      hasMessage: false
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function loader$1() {
  return redirect(`/trend_charts`);
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const client = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
const getArticles = async ({
  start_year,
  end_year,
  journal,
  subject
}) => {
  let query = client.from("all_articles").select("*").gte("journal_year", start_year).lte("journal_year", end_year).order("journal_year", { ascending: false });
  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
const getArticlesNumber = async ({
  start_year,
  end_year
}) => {
  let query = client.from("number_of_all_articles_years").select("journal_year, article_count").gte("journal_year", start_year).lte("journal_year", end_year).order("journal_year");
  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
const getSubjectRatio = async ({
  category_level,
  category_value
}) => {
  const { data, error } = await client.rpc("count_articles_by_jel_v2", { category_level, category_value });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
const getSector2Name = async ({
  sector2_code
}) => {
  var _a;
  const { data, error } = await client.from("jel_code").select("jel_code_sector2_name").eq("jel_code_sector2", sector2_code).limit(1);
  if (error) {
    throw new Error(error.message);
  }
  return (_a = data == null ? void 0 : data[0]) == null ? void 0 : _a.jel_code_sector2_name;
};
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
}
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            var _a;
            const color = ((_a = itemConfig.theme) == null ? void 0 : _a[theme]) || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn("flex flex-col gap-1.5 px-6", className),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx(ScrollBar, {}),
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Toggle({
  className,
  variant,
  size,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TogglePrimitive.Root,
    {
      "data-slot": "toggle",
      className: cn(toggleVariants({ variant, size, className })),
      ...props
    }
  );
}
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: cn("mx-auto flex w-full justify-center", className),
      ...props
    }
  );
}
function PaginationContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "pagination-content",
      className: cn("flex flex-row items-center gap-1", className),
      ...props
    }
  );
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsx("li", { "data-slot": "pagination-item", ...props });
}
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      "aria-current": isActive ? "page" : void 0,
      "data-slot": "pagination-link",
      "data-active": isActive,
      className: cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size
        }),
        className
      ),
      ...props
    }
  );
}
function PaginationPrevious({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pl-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChevronLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Previous" })
      ]
    }
  );
}
function PaginationNext({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    PaginationLink,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pr-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: "Next" }),
        /* @__PURE__ */ jsx(ChevronRightIcon, {})
      ]
    }
  );
}
function PaginationEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "aria-hidden": true,
      "data-slot": "pagination-ellipsis",
      className: cn("flex size-9 items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(MoreHorizontalIcon, { className: "size-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
function ArticlesPagination({
  totalItems
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  let page = Number(searchParams.get("page")) ?? 1;
  if (isNaN(page) || page < 1 || page > Math.ceil(totalItems / 20)) {
    page = 1;
  }
  const totalPages = Math.ceil(totalItems / 20);
  const onClick = (page2) => {
    searchParams.set("page", page2.toString());
    setSearchParams(searchParams);
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Pagination, { children: /* @__PURE__ */ jsxs(PaginationContent, { children: [
    page === 1 ? null : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
        PaginationPrevious,
        {
          to: `?page=${page - 1}`,
          onClick: (event) => {
            event.preventDefault();
            onClick(page - 1);
          },
          size: "default"
        }
      ) }),
      /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
        PaginationLink,
        {
          to: `?page=${page - 1}`,
          onClick: (event) => {
            event.preventDefault();
            onClick(page - 1);
          },
          size: "default",
          children: page - 1
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
      PaginationLink,
      {
        to: `?page=${page}`,
        onClick: (event) => {
          event.preventDefault();
          onClick(page);
        },
        isActive: true,
        size: "default",
        children: page
      }
    ) }),
    page === totalPages ? null : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
        PaginationLink,
        {
          to: `?page=${page + 1}`,
          onClick: (event) => {
            event.preventDefault();
            onClick(page + 1);
          },
          size: "default",
          children: page + 1
        }
      ) }),
      page + 1 === totalPages ? null : /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(PaginationEllipsis, {}) }),
      /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
        PaginationNext,
        {
          to: `?page=${page + 1}`,
          onClick: (event) => {
            event.preventDefault();
            onClick(page + 1);
          },
          size: "default"
        }
      ) })
    ] })
  ] }) }) });
}
const loader = async ({
  request
}) => {
  const url = new URL(request.url);
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const startYear = parseInt(url.searchParams.get("startYear") || String(currentYear - 9));
  const endYear = parseInt(url.searchParams.get("endYear") || String(currentYear));
  let subjects = (url.searchParams.get("subject") || "").split(",").filter(Boolean);
  if (subjects.length === 0) {
    subjects = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "Y", "Z"];
  }
  const subjectNames = {};
  for (const subject of subjects) {
    const name = await getSector2Name({
      sector2_code: subject
    });
    subjectNames[subject] = name || subject;
  }
  let articles = await getArticles({
    start_year: startYear,
    end_year: endYear
  });
  let subjectsRatio = [];
  for (const subject of subjects) {
    subjectsRatio.push(await getSubjectRatio({
      category_level: "sector2",
      category_value: subject
    }));
  }
  const articlesNumber = await getArticlesNumber({
    start_year: startYear,
    end_year: endYear
  });
  return {
    subjectsRatio,
    articles,
    articlesNumber,
    startYear,
    endYear,
    subjects,
    subjectNames
  };
};
const trend_chart_page = withComponentProps(function ArticlesPage() {
  const {
    articles,
    startYear,
    endYear,
    subjects,
    subjectNames,
    subjectsRatio
  } = useLoaderData();
  const [searchParams] = useSearchParams();
  let page = Number(searchParams.get("page")) ?? 1;
  const itemsPerPage = 20;
  if (isNaN(page) || page < 1 || page > Math.ceil(articles.length / itemsPerPage)) {
    page = 1;
  }
  const currentPage = page;
  const currentArticles = articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const years = Array.from(new Set(subjectsRatio.flatMap((subjectTable) => subjectTable.map((item) => item.journal_year)))).sort();
  const chartData = years.map((year) => {
    const dataPoint = {
      year
    };
    subjectsRatio.forEach((subjectTable, index) => {
      const subject = subjects[index];
      const subjectName = subjectNames[subject];
      const item = subjectTable.find((item2) => item2.journal_year === year);
      dataPoint[subjectName] = item ? Number(item.ratio) : 0;
    });
    return dataPoint;
  });
  console.log("Chart Data:", chartData);
  console.log("Subjects Ratio:", subjectsRatio);
  const chartConfig = {
    x: {
      label: "Year",
      color: "bg-muted focus:bg-primary/80"
    },
    y: {
      label: "Ratio",
      color: "bg-muted focus:bg-primary/80"
    }
  };
  const [activeSubjects, setActiveSubjects] = useState(/* @__PURE__ */ new Set(["D", "G", "J"]));
  return /* @__PURE__ */ jsxs("div", {
    className: "p-4 pt-20 w-[1400px] mx-auto gap-4",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-3 gap-4 mb-6 h-[600px]",
      children: [/* @__PURE__ */ jsxs(Card, {
        className: "col-span-2 h-[600px]",
        children: [/* @__PURE__ */ jsx(CardHeader, {
          className: "grid grid-cols-2 gap-4 justify-between items-center",
          children: /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx(CardTitle, {
              children: "Ratio of Articles"
            }), /* @__PURE__ */ jsxs(CardDescription, {
              children: ["from ", startYear, " to ", endYear]
            })]
          })
        }), /* @__PURE__ */ jsx(CardContent, {
          children: /* @__PURE__ */ jsx(ChartContainer, {
            config: chartConfig,
            className: "min-h-[200px] h-full w-full max-w-[1500px]",
            children: /* @__PURE__ */ jsxs(LineChart, {
              data: chartData,
              margin: {
                top: 20,
                left: 12,
                right: 12
              },
              children: [subjectsRatio.map((_, index) => {
                const subject = subjects[index];
                const subjectName = subjectNames[subject];
                if (activeSubjects.has(subject)) return null;
                return /* @__PURE__ */ jsx(Line, {
                  type: "monotone",
                  dataKey: subjectName,
                  stroke: `hsl(var(--muted)/50)`,
                  strokeWidth: 2,
                  dot: false
                }, `subject-line-${index}`);
              }), subjectsRatio.map((_, index) => {
                const subject = subjects[index];
                const subjectName = subjectNames[subject];
                if (!activeSubjects.has(subject)) return null;
                return /* @__PURE__ */ jsx(Line, {
                  type: "monotone",
                  dataKey: subjectName,
                  stroke: `hsl(${index * 360 / subjectsRatio.length}, 70%, 50%)`,
                  strokeWidth: 2,
                  dot: true
                }, `subject-line-active-${index}`);
              }), /* @__PURE__ */ jsx(XAxis, {
                dataKey: "year"
              }), /* @__PURE__ */ jsx(YAxis, {})]
            })
          })
        })]
      }), /* @__PURE__ */ jsxs(Card, {
        className: "h-[600px]",
        children: [/* @__PURE__ */ jsx(CardHeader, {
          children: /* @__PURE__ */ jsx(CardTitle, {
            children: "Subjects"
          })
        }), /* @__PURE__ */ jsx(CardContent, {
          className: "flex flex-col gap-4",
          children: /* @__PURE__ */ jsxs(ScrollArea, {
            className: "max-h-[500px] w-[400px]",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex flex-col gap-2 w-[400px]",
              children: subjects.map((subject, index) => /* @__PURE__ */ jsxs(Toggle, {
                variant: "outline",
                className: "w-full relative",
                pressed: activeSubjects.has(subject),
                onPressedChange: (pressed) => {
                  setActiveSubjects((prev) => {
                    const newSet = new Set(prev);
                    if (pressed) {
                      newSet.add(subject);
                    } else {
                      newSet.delete(subject);
                    }
                    return newSet;
                  });
                },
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-4 h-9 rounded-md absolute left-0",
                  style: {
                    backgroundColor: `hsl(${index * 360 / subjects.length}, 70%, 50%)`
                  }
                }), /* @__PURE__ */ jsx("span", {
                  className: "pl-6",
                  children: subjectNames[subject]
                })]
              }, subject))
            }), /* @__PURE__ */ jsx(ScrollBar, {
              forceMount: true
            })]
          })
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "space-y-4 overflow-y-auto",
      children: [/* @__PURE__ */ jsxs("h2", {
        className: "text-2xl font-bold",
        children: ["Related Articles ", activeSubjects.size > 0 ? `(${activeSubjects.size})` : ""]
      }), subjects.map((subject) => activeSubjects.has(subject) ? /* @__PURE__ */ jsx(Badge, {
        variant: "outline",
        className: "cursor-pointer",
        children: subjectNames[subject]
      }, subject) : null), /* @__PURE__ */ jsx("div", {
        className: "flex",
        children: articles.length === 0 ? /* @__PURE__ */ jsx("p", {
          children: "No articles found for the selected year range."
        }) : /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-4 items-center",
          children: [currentArticles.map((article) => /* @__PURE__ */ jsxs(Badge, {
            variant: "outline",
            className: "border p-4 rounded w-[900px] flex flex-col items-start hover:bg-primary/10",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-lg font-semibold text-left",
              children: article.title
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-start gap-2",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-gray-600 text-left",
                children: "authors"
              }), /* @__PURE__ */ jsx(DotIcon, {
                className: "w-4 h-4 text-gray-600"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 text-left",
                children: article.journal_name
              }), /* @__PURE__ */ jsx(DotIcon, {
                className: "w-4 h-4 text-gray-600"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 text-left",
                children: article.journal_year
              })]
            })]
          }, article.id)), /* @__PURE__ */ jsx(ArticlesPagination, {
            totalItems: articles.length
          })]
        })
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: trend_chart_page,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DLXTD7W6.js", "imports": ["/assets/chunk-HA7DTUK3-Co2gqNl3.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-C3nJvEmC.js", "imports": ["/assets/chunk-HA7DTUK3-Co2gqNl3.js", "/assets/button-C6XaWGr1.js"], "css": ["/assets/root-D1RQe5Lv.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "common/pages/home": { "id": "common/pages/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "features/trend_charts/pages/trend_chart_page": { "id": "features/trend_charts/pages/trend_chart_page", "parentId": "root", "path": "/trend_charts", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/trend_chart_page-D1UzgR7Q.js", "imports": ["/assets/button-C6XaWGr1.js", "/assets/chunk-HA7DTUK3-Co2gqNl3.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-2691a348.js", "version": "2691a348" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "common/pages/home": {
    id: "common/pages/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "features/trend_charts/pages/trend_chart_page": {
    id: "features/trend_charts/pages/trend_chart_page",
    parentId: "root",
    path: "/trend_charts",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
