/**
 * Layout component that provides the basic HTML structure for the application.
 * Includes meta tags, links, and scripts for the application.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render inside the layout.
 * @returns {JSX.Element} The layout structure for the application.
 */

/**
 * The main application component that renders the current route's outlet.
 *
 * @returns {JSX.Element} The rendered outlet for the current route.
 */

/**
 * ErrorBoundary component to handle and display errors in the application.
 *
 * @param {Object} props - The component props.
 * @param {Error} props.error - The error object caught by the boundary.
 * @returns {JSX.Element} The error display UI.
 */
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}