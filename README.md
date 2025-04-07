# Meliotech Product Catalog

This project is a React-based product catalog application built with Vite. It allows users to view, add, and manage products. The application uses React Router for routing and React Bootstrap for styling.

## Features

- **Product Listing**: Displays a list of products stored in the browser's local storage.
- **Add New Product**: Users can add new products with details such as title, description, price, and images.
- **Product Details Modal**: View detailed information about a product, including a carousel of images, in a modal.
- **Drag-and-Drop Image Upload**: Supports drag-and-drop or file selection for uploading product images.
- **Responsive Design**: Built with React Bootstrap for a responsive and user-friendly interface.

## Project Structure

The project is organized as follows:
app/
├── App.css # Global styles for the application
├── index.css # Base styles for the application 
├── Layout.jsx # Main layout component with navigation
├── NewProduct.jsx # Component for adding new products
├── Products.jsx # Component for displaying the product catalog
├── root.jsx # Root component with error boundary and meta tags
├── routes.js # React Router configuration
├── components/ 
│ └── Product.jsx # Component for rendering individual product cards 
├── assets/ 
│ └── react.svg # Example asset


## Key Components

### `Layout.jsx`
- Provides the main layout for the application, including a navigation bar.
- Uses React Router's `Outlet` to render child routes.

### `Products.jsx`
- Fetches and displays products from local storage.
- Allows users to view product details in a modal with a carousel of images.

### `NewProduct.jsx`
- Provides a form for adding new products.
- Supports drag-and-drop or file selection for uploading images.
- Validates form inputs and stores product data in local storage.

### `Product.jsx`
- Renders individual product cards with an image, title, and price.
- Includes a click handler to trigger actions like opening the product modal.

## Routing

The application uses React Router for navigation. The routes are defined in [`routes.js`](app/routes.js):

- `/`: Displays the product catalog using the `Products.jsx` component.
- `/new-product`: Displays the form for adding a new product using the `NewProduct.jsx` component.

## Styling

The application uses:
- **Bootstrap**: For responsive and consistent UI components.
- **Custom CSS**: Additional styles defined in `App.css` and `index.css`.

## Local Storage

Products are stored in the browser's local storage. This allows the application to persist data across sessions without requiring a backend.

## Getting Started

### Prerequisites

- Node.js and yarn (you can also use npm based on preference) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
2. Install dependencies:
   ```bash
   yarn
3. Start the development server:
   ```bash
   yarn dev
4. Open the application in your browser at http://localhost:5173.

## Scripts

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the application for production.
- `yarn preview`: Previews the production build.
- `yarn lint`: Runs ESLint to check for code quality issues.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Fast build tool for modern web projects.
- **React Router**: For routing and navigation.
- **React Bootstrap**: For responsive UI components.
- **Local Storage**: For persisting product data.

## Future Enhancements

- Add a backend API for product storage and retrieval.
- Implement user authentication for managing products.
- Add search and filter functionality for the product catalog.