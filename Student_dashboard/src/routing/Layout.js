import { Outlet, Link, useLocation } from "react-router-dom"
import Logo from "../images/logo.svg"

export default function Layout() {
    const location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split("/")

    return (
        <>
            <header style={{display: "flex", alignItems: "center", backgroundImage: "linear-gradient(to right, white, rgb(79, 139, 201))" }}>
                <img src={Logo} alt="WINC Logo" style={{width: "150px"}}/>
                <h1>Student Dashboard</h1>
            </header>
            <div style={{display: "flex", width: "100%"}}>
                <nav>
                    <ul style={{listStyleType: "none"}}>
                        <li><Link className={splitLocation[1] === "" ? "active" : ""} to="/">Home</Link></li>
                        <li><Link className={splitLocation[1] === "" ? "active" : ""} to="/students">Students</Link></li>
                        <li><Link className={splitLocation[1] === "about" ? "active" : ""} to="/about">About</Link></li>
                    </ul>
                </nav>
                <Outlet />
            </div>

        </>
    )
}