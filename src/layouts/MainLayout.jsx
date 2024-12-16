import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify

const MainLayout = () => {
  return (
    <>
    <Outlet/>
    <ToastContainer />
    </>
  )
}

export default MainLayout