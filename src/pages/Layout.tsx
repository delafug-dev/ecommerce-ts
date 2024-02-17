import { Outlet } from "react-router-dom"
import { Banner } from "../components/banner/Banner"
import { Footer } from "../components/footer/Footer"
import { Header } from "../components/header/Header"

export const Layout = () => {

  return (
    <>
        <Header/>
        <Banner/>
        <Outlet/>
        <Footer/>
    </>
  )
}
