import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/reducers/productReducer.js";
import {
  addProductThunk,
  updateProductThunk,
} from "../redux/reducers/productReducer.js";
import { Producto } from "../interfaces/producto-tienda.js";

export default function useProductos() {

  const productos = useSelector(getAllProducts);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<Producto>({
    id: "",
    price: 0,
    title: "",
    description: "",
    image: "",
    category: "",
  });



  // Función que se ejecuta en el formulario del modal - onSubmit
  const handleSubmitFormNewProduct = (newProducto : Producto) => {
      try {
        dispatch(addProductThunk(newProducto) as any);
      } catch (error) {
        console.error("Error creating product", error);
      }
    
  };

  const handleSubmitFormEditProduct = async(productoEditado : Producto) => {
    const findProduct = productos?.find(
      (product: Producto) => product.id.toString() === form.id.toString()
    );
    const editedProduct = {
      ...findProduct,
      id: productoEditado.id,
      title: productoEditado.title,
      price: productoEditado.price,
      category: productoEditado.category,
      description: productoEditado.description,
      image: productoEditado.image,
    };
    try {
      dispatch(updateProductThunk(editedProduct) as any);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating product", error);
    }
  }

  const openEditProductModal = (id) => {
    const filteredProduct = productos?.filter(
      (product) => product.id.toString() === id.toString()
    );
    setForm({
      price: filteredProduct[0].price,
      title: filteredProduct[0].title,
      description: filteredProduct[0].description,
      id: filteredProduct[0].id,
      image: filteredProduct[0].image,
    });
    setIsModalOpen(true);
  };

  return {
    productos,
    form,
    setForm,
    isModalOpen,
    setIsModalOpen,
    openEditProductModal,
    handleSubmitFormNewProduct,
    handleSubmitFormEditProduct
  };
}
