import type { LinksFunction } from "remix";
import { Meta, Links, Scripts, LiveReload } from "remix";
import { Link, Outlet } from "react-router-dom";

import tailwindUrl from "./styles/tailwind.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindUrl }];
};

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-050">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <header>
        <nav className="bg-pink-600 p-4 text-center relative">
          <Link to="/">
            <h1 className="text-2xl text-white drop-shadow-md">Porkazon</h1>
          </Link>

          <Link
            className="text-white hover:text-pink-100 absolute right-4 top-1/2 -translate-y-1/2"
            to="/cart"
          >
            Cart
          </Link>
        </nav>
      </header>

      <main className="container mx-auto">
        <Outlet />
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
