# Web Programming – Assignment 7: Online Shop

A multi-page React shop built with Vite, react-router, Context + useReducer and Zustand.
Products come from the DummyJSON API.

## How to run

```bash
npm install
npm run dev
```

## Demo account

- Username: 230408024@st.biruni.edu.tr
- Password: demo123456

## File organization

```
src/
 ├─ api/
 │   ├─ productsApi.js     # fetchProducts / fetchProduct (fetch + AbortSignal, checks response.ok)
 │   └─ authApi.js         # fake login, resolves after ~500 ms
 ├─ hooks/
 │   ├─ useFetch.js        # loading / error / data with useReducer, aborts on change or unmount
 │   └─ useLocalStorage.js # useState-like hook that persists to localStorage (used for theme)
 ├─ context/
 │   └─ AuthContext.jsx    # AuthProvider + useAuth, reducer with LOGGED_IN / LOGGED_OUT
 ├─ store/
 │   └─ cartStore.js       # Zustand cart store, derived selectors, persisted via subscribe
 ├─ components/
 │   ├─ Layout.jsx         # navbar + <Outlet /> + footer, applies the theme class
 │   ├─ NavBar.jsx         # NavLinks, cart count, login/logout, theme toggle
 │   ├─ ProductCard.jsx    # one product in the list
 │   └─ ProtectedRoute.jsx # redirects to /login when signed out
 ├─ pages/
 │   ├─ Home.jsx
 │   ├─ ProductList.jsx    # filters stored in the URL query string
 │   ├─ ProductDetail.jsx  # reads :id from the URL
 │   ├─ Cart.jsx
 │   ├─ Login.jsx
 │   └─ NotFound.jsx
 ├─ App.jsx                # route configuration (nested /products routes)
 └─ main.jsx               # BrowserRouter + AuthProvider
```

## Reasoning Questions

### 1. State Choices

I chose different places for different types of state depending on how they are used.

- **User:** Stored in React Context because authentication information is needed by different components.
- **Cart:** Managed with Zustand because multiple components need access to cart data and actions.
- **Filters:** Stored in URL query parameters so the selected filters can be preserved when refreshing or sharing the URL.
- **Product list:** Managed through API requests using the useFetch hook.
- **Theme:** Managed in the Layout using the useLocalStorage hook, so the selected theme can be remembered.

I learned that choosing the right place for each type of state makes the application easier to manage.

### 2. Context vs Store

I used Context for authentication and Zustand for the shopping cart.

Authentication information does not change very frequently, so Context was enough for this purpose.

The cart changes more often because users can add and remove products. If I used Context for the cart, components consuming the context could re-render whenever the context value changes, even if they only need a small part of the cart state.

With Zustand, I can use selectors to subscribe only to the data a component needs. For example, the Navbar only selects the cart item count, so it does not need to subscribe to the entire cart.

This makes Zustand more suitable for frequently changing cart data in my application.

### 3. Custom Hooks

I used the useFetch custom hook to avoid repeating API request logic in different components.

It shares the fetching logic, loading and error handling, and the cleanup process using AbortController.

However, it does not share the actual state between components. For example, ProductList and ProductDetail each have their own useReducer state when they use the hook.

This means that the loading state of one component does not affect the other component.

I also learned that aborting an unfinished request during cleanup helps prevent unnecessary requests when a component unmounts.

### 4. Route Parameters

I used useParams to get the product ID from the URL.

The ID received from the URL is a string, even if it looks like a number.

This became important in the ProductDetail page when I created the Next Product link.

I used `Number(id) + 1` to calculate the next product ID. Without converting it to a number, `"5" + 1` would produce `"51"` instead of 6.

### 5. Protected Routes

I used ProtectedRoute to prevent users who are not logged in from accessing protected pages.

However, this is not real security because it only controls navigation on the client side.

A user could still access API endpoints directly or modify client-side code.

For real security, authentication and authorization must also be checked on the server side before returning protected data.

### 6. Deep Links

A deep link allows users to open a specific page directly using its URL, for example `/products/3`.

When a page is refreshed on a static server without SPA fallback configuration, the server looks for a file matching `/products/3`. Since that file does not exist, it returns a 404 error and React never loads.

Vite's development server handles this using SPA fallback and serves index.html for these routes. React Router can then read the URL and display the correct page.

In production, the static server also needs to be configured to redirect unknown routes to index.html.

## Self-Study Notes

### Query Parameters

I learned how to update one query parameter without losing the other parameters.

Instead of creating a completely new set of search parameters, I can pass a function to setSearchParams and copy the previous parameters using `new URLSearchParams(prev)`.

Then I can update only the parameter I need with `set()` or remove it with `delete()`.

I also learned that using `replace: true` replaces the current history entry instead of adding a new one. This is useful when I do not want every filter change to create another browser history entry.

### Safe LocalStorage Reading

LocalStorage stores data as strings, so I used JSON.parse when reading saved data.

I also learned that parsing should be handled with try/catch because the stored value might be invalid.

In my cart implementation, I check whether the saved value is null and whether it is actually an array using `Array.isArray()`. If the data is invalid, I return an empty array.

For saving cart data, I used `useCartStore.subscribe` outside React components. This means the cart can be saved whenever the Zustand store changes without putting the saving logic inside a component.

### Theme Management

I managed the theme in the Layout using the useLocalStorage custom hook.

I used a `dark` class and CSS variables such as `--bg` and `--text` to change the appearance of the application.

The selected theme is saved so that it can be remembered after refreshing the page.

## Challenges I Faced

During the assignment, I encountered several problems.

- At first, I did not understand why the empty context folder was not appearing in Git. I learned that Git does not track empty folders.
- I received an import error when trying to import useLocalStorage because the file had not been created yet.
- I had a problem with the git remote command because I used angle brackets around the repository URL. I learned that I needed to use the actual repository URL without those brackets.
- I also had difficulty opening the browser console in Safari, which made debugging a little harder.

These problems took some time to solve, but they helped me understand Git, project structure and debugging better.

## What I Learned

This assignment helped me understand how different React concepts work together in a real application.

I practiced separating application state, creating reusable hooks, managing routes and handling authentication.

I also learned that different state management solutions have different purposes and that choosing the right one depends on how the data is used.

## Conclusion

Overall, this assignment was a useful experience for improving my React knowledge. Some parts were challenging at first, especially state management and project organization, but solving the problems helped me understand the concepts better.