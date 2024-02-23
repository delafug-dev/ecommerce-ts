import { useEffect, useState } from "react";
import { Producto } from "../../interfaces/producto-tienda";
import { useProducts } from "../../hooks/useProducts";


export const ModalEditProduct = ({toggleModal, producto}) => {

    const {title, description, price, image} = producto;
    const {updateProduct} = useProducts();

    const [productoEditado, setProductoEditado] = useState<Producto>({
        id: "",
        title: "",
        price: 0,
        category: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        setProductoEditado(producto);
    }, [producto]);



    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductoEditado({...productoEditado, title: e.target.value});
    }

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductoEditado({...productoEditado, price: parseInt(e.target.value)});
    }

    // const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setProductoEditado({...productoEditado, category: e.target.value});
    // }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductoEditado({...productoEditado, image: e.target.value});
    }

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProductoEditado({...productoEditado, description: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProduct(producto.id, productoEditado);
        toggleModal();
    };

  return (

          <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-full max-w-md max-h-full">

                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Editar Producto
                          </h3>
                          <button onClick={toggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                              </svg>
                              <span className="sr-only">Close modal</span>
                          </button>
                      </div>

                      <form onSubmit={handleSubmit} className="p-4 md:p-5">
                          <div className="grid gap-4 mb-4 grid-cols-2">
                              <div className="col-span-2">
                                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                  <input onChange={handleName} type="text" name="name" id="name" value={productoEditado.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe el nombre del producto aquí" required/>
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                                  <input onChange={handlePrice} type="number" name="price" id="price" value={productoEditado.price} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="123€" required/>
                              </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option>Select category</option>
                                    <option value="TV">TV/Monitors</option>
                                    <option value="PC">PC</option>
                                    <option value="GA">Gaming/Console</option>
                                    <option value="PH">Phones</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                  <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                                  <input onChange={handleImage} type="text" name="image" id="image" value={productoEditado.image} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Introduce la imagen" required/>
                              </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                <textarea onChange={handleDescription} id="description" tabIndex={9} value={productoEditado.description} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe la descripción del producto aquí"></textarea>
                            </div>
                          </div>
                          <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                              Editar producto
                          </button>
                      </form>
                  </div>
              </div>
          </div>

  )
}
