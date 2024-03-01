import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  const handleSubmitFormNewProduct = async (e) => {
      e.preventDefault();

      const newProduct: Producto = {
        id: uuidv4(),
        title: form.title,
        price: form.price,
        category: form.category,
        description: form.description,
        image: form.description,
      };

      try {
        dispatch(addProductThunk(newProduct) as any); 
      } catch (error) {
        console.error("Error creating product", error);
      }
    
  };

  const handleSubmitFormEditProduct = async (e, form) => {
    e.preventDefault();
    const findProduct = productos?.find(
      (product) => product.id.toString() === form.id.toString()
    );
    const editedProduct = {
      ...findProduct,
      title: form.title,
      price: form.price,
      category: form.category,
      description: form.description,
      image: form.image,
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
