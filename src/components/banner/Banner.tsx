import { useAuth } from "../../hooks/useAuth"


export const Banner = () => {

    const {user} = useAuth();

  return (
    <div className="bg-white pt-6 sm:pt-8 lg:pt-12">
        <div className="mx-auto max-w-screen-2xl px-4 pb-4 md:px-8">
            <div className="relative flex flex-wrap rounded-lg bg-indigo-500 px-4 py-3 shadow-lg sm:flex-nowrap sm:items-center sm:justify-center sm:gap-3 sm:pr-8 md:px-8">
                {   user && user.username && user.username.length > 0 ?
                    <div className="order-1 mb-2 inline-block w-11/12 max-w-screen-sm text-sm text-white sm:order-none sm:mb-0 sm:w-auto md:text-base">Hola {user.username} ya tienes disponible descuentos de hasta el 50%</div>
                    :
                    <div className="order-1 mb-2 inline-block w-11/12 max-w-screen-sm text-sm text-white sm:order-none sm:mb-0 sm:w-auto md:text-base">Si te logeas recibirás un descuento de hasta el 50% en nuestros productos</div>                   
                }
                <a href="#" className="order-last inline-block w-full whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-2 text-center text-xs font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 sm:order-none sm:w-auto md:text-sm">Learn more</a>

                <div className="order-2 flex w-1/12 items-start justify-end sm:absolute sm:right-0 sm:order-none sm:mr-2 sm:w-auto xl:mr-3">
                    <button type="button" className="text-white transition duration-100 hover:text-indigo-100 active:text-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xl:h-6 xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
