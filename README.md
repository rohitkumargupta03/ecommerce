## Northstar Market

A e-commerce web app built with Next.js App Router and TypeScript.

It uses the provided Fake Store endpoint:

https://fake-store-api.mock.beeceptor.com/api/products

## Features

- Product listing with image, name, price, and short description
- Product details page with complete information and reviews
- Add to cart and add/remove wishlist actions
- Cart quantity controls (increase/decrease/remove)
- Cart subtotal and total calculation
- Wishlist and cart persisted in browser local storage
- Checkout page with cart summary and basic form (name, email, address)
- Loading and error states for API fetch flows

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Notes

- API data is fetched from a public mock endpoint.
- Cart and wishlist persistence are client-side only (local storage).
- This app is intentionally mock-based and does not send real orders to a backend.


