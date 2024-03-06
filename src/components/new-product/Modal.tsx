import useProductos from "../../hooks/useProductos";
import {useForm} from "react-hook-form";
import {Producto} from "@/interfaces/producto-tienda.ts";
import {v4 as uuidv4} from "uuid";



export const Modal = ({toggleModal}) => {
    
    const {handleSubmitFormNewProduct} = useProductos();
    const { register, handleSubmit, formState: { errors }, watch, setError } = useForm();

    const newProduct: Producto = {
        id: uuidv4(),
        title: watch('name'),
        price: watch('price'),
        category: watch('category'),
        description: watch('description'),
        image: watch('image'),
    };

    const handleRegisterNewProduct = () => {
        handleSubmitFormNewProduct(newProduct);
    }

    const handleNameProduct = () => {
        const name = watch('name');
        if(name.length < 3){
            return setError('name', {message: "El nombre debe tener al menos 3 caracteres."})
        }
        if(name.length > 15){
            return setError('name', {message: "El nombre no puede tener más de 15 caracteres."})
        }
    }

    const handlePriceProduct = () => {
        const price = watch('price');
        if(price < 1){
            return setError('price', {message: "El precio debe ser mayor que 0."})
        }
    }

    const handleImageProduct = () => {
        const image = watch('image');
        if(!image.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)){
            return setError('image', {message: "Por favor, introduce una url válida."})
        }
    }

  return (

          <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="flex  fixed justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-full max-w-md max-h-full">

                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Crear Un Nuevo Producto
                          </h3>
                          <button onClick={toggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                              </svg>
                              <span className="sr-only">Close modal</span>
                          </button>
                      </div>

                      <form onSubmit={handleSubmit(handleRegisterNewProduct)} className="p-4 md:p-5">
                          <div className="grid gap-4 mb-4 grid-cols-2">
                              <div className="col-span-2">
                                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                  <input  type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el nombre del producto aquí"
                                         {...register("name", {required: "Por favor, ingrese un nombre"})} onBlur={() => handleNameProduct()}/>
                                    {errors.name && (
                                        <span className="text-red-600 text-sm">{errors.name.message}</span>
                                    )}

                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                                  <input type="number"  id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="123€"
                                         {...register("price", {required: "Por favor, introduce un precio"})} onBlur={() => handlePriceProduct()}/>
                                    {errors.price && (
                                        <span className="text-red-600 text-xs">{errors.price.message}</span>
                                    )}

                              </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        {...register("category", {required: "Por favor, selecciona una categoría"})}>
                                    <option value="">Select category</option>
                                    <option value="camisetas">Camisetas</option>
                                    <option value="chaquetas">Chaquetas</option>
                                    <option value="zapatillas">Zapatillas</option>
                                    <option value="pantalones">Pantalones</option>
                                    <option value="accesorios">Accesorios</option>
                                </select>
                                    {errors.category && (
                                        <span className="text-red-600 text-xs">{errors.category.message}</span>
                                    )}
                            </div>
                            <div className="col-span-2">
                                  <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                                  <input type="text" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Introduce la imagen"
                                         {...register("image", {required: "Por favor, introduce una imagen"})} onBlur={() => handleImageProduct()}/>
                                    {errors.image && (
                                        <span className="text-red-600 text-sm">{errors.image.message}</span>
                                    )}
                              </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                <textarea id="description" tabIndex={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe la descripción del producto aquí"
                                          {...register("description",{required: "Por favor, introduce una descripción"})}></textarea>
                                    {errors.description && (
                                        <span className="text-red-600 text-sm">{errors.description.message}</span>
                                    )}
                            </div>
                          </div>
                          <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                              Add new product
                          </button>
                      </form>
                  </div>
              </div>
          </div>

  )
}
