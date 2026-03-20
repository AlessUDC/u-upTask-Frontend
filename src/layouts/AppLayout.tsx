import { Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function AppLayout() {
    return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Logo />
                    </div>

                    <NavMenu />
                </div>
            </header>

            <section className="max-w-screen-2xl mx-auto mt-4 lg:mt-10 px-8 py-5 lg:px-5">
                <Outlet />
            </section>

            <footer className="py-5">
                <p className="text-center">
                    UpTask - Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer 
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
