import { Link } from "react-router-dom"
import { useSearch } from "../../hooks/useSearch"
import { useCartProduct } from "../../hooks/useCartProduct";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";


export const Header = () => {

  const { searchProduct } = useSearch();
  const { totalProductsNumber } = useCartProduct();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`mx-auto max-w-screen-2xl px-4 md:px-8 ${theme ? 'bg-gray-400' : ''}`}>
    <header className="flex items-center justify-between py-4 md:py-8">

      <a href="/" className={`inline-flex items-center gap-2.5 text-2xl font-bold  md:text-3xl ${theme ? 'text-white' : 'text-black'}`} aria-label="logo">
        <svg width="95" height="94" viewBox="0 0 95 94" className="h-auto w-6 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M96 0V47L48 94H0V47L48 0H96Z" />
        </svg>
        Ecommerce
      </a>
      <nav className="hidden gap-12 lg:flex">
        <a href="#" className={`text-lg font-semibold transition duration-100 hover:text-indigo-500 active:text-indigo-700 ${theme ? 'text-white' : 'text-gray-600'}`}>Home</a>
        <a href="#" className={`text-lg font-semibold transition duration-100 hover:text-indigo-500 active:text-indigo-700 ${theme ? 'text-white' : 'text-gray-600'}`}>Categorías</a>
        <a href="#" className={`text-lg font-semibold transition duration-100 hover:text-indigo-500 active:text-indigo-700 ${theme ? 'text-white' : 'text-gray-600'}`}>Ofertas</a>
        <a href="#" className={`text-lg font-semibold transition duration-100 hover:text-indigo-500 active:text-indigo-700 ${theme ? 'text-white' : 'text-gray-600'}`}>Contacto</a>
      </nav>

      <div className="flex gap-12 items-center">
        <input onChange={searchProduct} name="first-name" placeholder="Buscar producto" className="w-72 rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        <Link to={user.username ? '/cart' : ''} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M16 6V4H8v2M7 18c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m10 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-9.8-3.2v-.1l.9-1.7h7.4c.7 0 1.4-.4 1.7-1l3.9-7l-1.7-1l-3.9 7h-7L4.3 2H1v2h2l3.6 7.6L5.2 14c-.1.3-.2.6-.2 1c0 1.1.9 2 2 2h12v-2H7.4c-.1 0-.2-.1-.2-.2"/></svg>  
            <span>{user.username ? totalProductsNumber : ''}</span>
        </Link>
        <button onClick={toggleTheme} className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md text-md">
            DARKMODE
        </button>
      </div>

      <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
        <Link to="/login" className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base">Sign in</Link>

        <a href="#" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Sign up</a>
      </div>

      <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>

        Menu
      </button>
    </header>
    </div>
  )
}
