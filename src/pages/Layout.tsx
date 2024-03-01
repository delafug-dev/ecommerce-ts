import { Outlet } from "react-router-dom"
import { Banner } from "../components/banner/Banner"
import { Footer } from "../components/footer/Footer"
import { Header } from "../components/header/Header"
import { useDispatch, useSelector } from "react-redux"
import { getProductsError, getProductsLoading, getProductsThunk } from "../redux/reducers/productReducer"
import { ErrorPage } from "../components/error/ErrorPage"
import { Loader } from "../components/Loader/Loader"
import { useEffect } from "react"

export const Layout = () => {

  const dispatch = useDispatch();
  const loading = useSelector(getProductsLoading);
  const error = useSelector(getProductsError);

  useEffect(() => {
    dispatch(getProductsThunk() as any);
  }, []);

  return (
    <>
        <Header/>
        <Banner/>
        {error && <ErrorPage error={error} />}
        {loading ? <Loader /> : <Outlet />}
        <Footer/>
    </>
  )
}
