import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { UserAuthProvider } from './context/UserProvider'
import { SearchProvider } from './context/SearchPorivder'
import { CartProductsProvider } from './context/CartProducts'
import { ThemeProvider } from './context/ThemeProvider'
import { ProductoProvider } from './context/ProductoProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserAuthProvider>
        <ProductoProvider>
          <SearchProvider>
            <CartProductsProvider>
              <RouterProvider router={routes}/>
            </CartProductsProvider>
          </SearchProvider>
        </ProductoProvider>
      </UserAuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
