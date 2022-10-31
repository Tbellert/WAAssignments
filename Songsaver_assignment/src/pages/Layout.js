import { Outlet, Link, useLocation } from "react-router-dom";
import background from "../images/header.jpg"

export default function Layout() {
    const location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split("/")

    return (
        <>
            <header className="headerwrapper">
                <img src={background} alt="headerimage" className="headerwrapper_bg-image"/>
                <div className="headerwrapper_text">
                    <h1 className="headerwrapper_text_title">Songsaver</h1>
                </div>
            </header>
            <nav className="nav">
                <ul className="nav_list">
                    <li className="nav_list_item"><Link className={splitLocation[1] === "" ? "active" : ""} to="/">Home</Link></li>
                    <li className="nav_list_item"><Link className={splitLocation[1] === "about" ? "active" : ""} to="/about">About</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}