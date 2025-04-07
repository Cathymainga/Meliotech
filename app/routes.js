/**
 * Defines the application's route configuration using React Router.
 * 
 * The configuration includes:
 * - A layout component (`Layout.jsx`) that wraps the routes.
 * - An index route (`Products.jsx`) that serves as the default view.
 * - A named route (`new-product`) that maps to the `NewProduct.jsx` component.
 * 
 * Dependencies:
 * - React Router's route helpers (`index`, `route`, `layout`) for defining routes.
 * - Bootstrap CSS for styling.
 * - Custom CSS from `index.css`.
 * 
 * @module routes
 * @requires @react-router/dev/routes
 * @requires bootstrap/dist/css/bootstrap.min.css
 * @requires ./index.css
 */
import { index, route, layout } from "@react-router/dev/routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

export default [
    layout("./Layout.jsx", [
        index("./Products.jsx"),
        route("new-product", "./NewProduct.jsx"),
    ]),
];