import { Outlet, Link, useLocation } from "react-router-dom"
import Logo from "../images/logo.svg"

export default function Layout() {
    const location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split("/")

    return (
        <>
            <header className="h-32 shadow-md flex justify-center md:justify-start items-center bg-blue-500" >
                <img src={Logo} alt="WINC Logo" className="w-28 ml-2 bg-white p-4 border shadow-md rounded-full"/>
                <h1 className="ml-2 text-2xl font-bold uppercase bg-white bg-clip-text text-transparent">Student Dashboard</h1>
            </header>
            <nav className="nav font-semibold text-lg">
                <ul className="flex flex-col items-center justify-center md:justify-end md:flex-row list-none">
                    <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer"><Link className={`${splitLocation[1] === "" ? "text-blue-500" : ""}`} to="/">Home</Link></li>
                    <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer"><Link className={`${splitLocation[1] === "students" ? "text-blue-500" : ""}`} to="/students">Students</Link></li>
                    <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer"><Link className={`${splitLocation[1] === "about" ? "text-blue-500" : ""}`} to="/about">About</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}