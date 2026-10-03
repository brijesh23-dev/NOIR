# NOIR

NOIR is a small fashion storefront demo built with **vanilla JavaScript**, HTML, and CSS. It has a home page with a product grid and a separate product details page. Product and cart state are stored in the browser, so the demo does not require an API or database.

## Tech stack

- HTML for page structure
- CSS for styling
- Modern JavaScript (ES modules and native DOM APIs) for page behavior
- Vite for the local development server and production build

There is no React, Vue, Angular, or other UI framework. Vite is a development/build tool; the application UI and behavior are written directly with browser APIs.

## Requirements

- Node.js and npm
- A modern browser

## Run locally

Install the project dependencies and start Vite:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The home page is `index.html`; product details use `product.html?id=<product-id>` and can also be reached by selecting a product card.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the site into `dist/`. |
| `npm run preview` | Serve the production build locally after running the build command. |

There is currently no test or lint command configured in `package.json`.

## Project structure

```text
.
├── index.html                  # Storefront home page
├── product.html                # Product details page
├── package.json                # Vite scripts and dependency metadata
├── public/                     # Static files copied/served by Vite
└── src/
    ├── main.js                 # Home page behavior and product grid
    ├── product.js              # Product details, size selection, add-to-bag
    ├── data/
    │   └── products_data.js    # Sample product catalog
    ├── css/
    │   ├── style.css           # Shared and home page styles
    │   └── product.css         # Product details styles
    └── assets/                 # Project image and other local assets
```

## Pages and behavior

### Home page (`index.html`)

- Displays the NOIR storefront layout and a product grid generated from the catalog.
- Selecting a product opens its details page with the product ID in the URL.
- The bag button opens the bag panel. On this page, saved cart entries are rendered with quantity controls and a remove button.
- The bag count is the sum of item quantities, rather than the number of distinct cart entries.

### Product details (`product.html`)

- Reads the product ID from the URL and fills in the matching product's image, name, category, price, and description.
- Allows selecting one size (S, M, L, or XL). Clicking the selected size again clears the selection.
- Adds the selected product and size to the bag. Adding the same product in the same size increases its quantity; a different size is a separate entry.
- Updates the bag count and opens/closes the bag panel.

### Browser storage

The app uses `localStorage` to persist data across page loads in the same browser:

| Key | Contents |
| --- | --- |
| `noir_products` | Catalog initialized from `src/data/products_data.js` on first use. |
| `noir_cart` | Cart entries containing product ID, name, price, size, and quantity. |

To clear the demo data, open the browser developer tools and remove these keys under **Application/Storage → Local Storage** for the local site. Clearing site data also resets the catalog and cart.

## Product catalog

Edit `src/data/products_data.js` to add or change products. Each product currently has this shape:

```js
{
  id: 1,
  name: "Oversized Wool Coat",
  price: 129.99,
  category: "Women",
  image: "https://example.com/product-image.jpg"
}
```

Use unique numeric IDs because the product details page reads the ID from the query string. Product images are remote Unsplash URLs in the sample data, so viewing them requires an internet connection. The details page also reads a `description` property; add that property to catalog entries when supplying product descriptions.

## Vanilla JavaScript notes

The page scripts use standard browser JavaScript rather than a framework:

- ES module `import` statements organize page code, styles, and catalog data.
- `document.querySelector`, `document.createElement`, and element properties build and update the interface.
- `addEventListener` handles clicks and other user interactions.
- `URLSearchParams` reads the selected product ID from the URL.
- `localStorage` and `JSON.stringify`/`JSON.parse` persist the catalog and cart.
- Array methods such as `forEach`, `find`, `filter`, and `reduce` render and update product/cart data.

Keep page-specific code in `main.js` or `product.js`, shared product records in `data/products_data.js`, and presentation in the CSS files. Prefer semantic HTML, small named functions for repeated DOM work, and clear data transformations as the project grows.

## Current demo scope

This is a front-end learning/demo project, not a production shop. There is no server, account system, inventory validation, order creation, or payment integration. Search, wishlist, newsletter, navigation links, and checkout are currently visual controls/placeholders rather than complete workflows. Cart data is local to the current browser and is not shared between users or devices.