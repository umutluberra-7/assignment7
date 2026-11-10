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

## Reasoning questions

_To be written._

## Self-study notes

_To be written._

## Challenges

_To be written._