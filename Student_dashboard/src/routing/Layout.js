import { Outlet, Link, useLocation } from "react-router-dom"
import Logo from "../images/logo.svg"
import { useSelector } from "react-redux"
import { useState } from "react"
import Topbar from "../components/Topbar"
import Dropdown from "../components/Dropdown"

export default function Layout() {
    const location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split("/")
    const data = useSelector(state => state.data.rawData)
    const studentNames = useSelector(state => state.data.students)
    const allAssignmentNames = data.map(assignments => assignments.project)
    const assignmentNames = [...new Set(allAssignmentNames)].map((name, index) => {return {id: index + 1, name: name}})

    // const [allMenuValues, setAllMenuValues] = useState({students: false, assignments: false})

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
                        <li><Link className={splitLocation[1] === "" ? "active" : ""} to="/assignments">Assignments</Link></li>
                        {/* <Topbar linkType="students" isOpen={allMenuValues.students} setMenuStatus={setAllMenuValues}/>
                        <Dropdown linkType="students" input={studentNames} isOpen={allMenuValues.students}/>
                        <Topbar linkType="assignments" isOpen={allMenuValues.assignments} setMenuStatus={setAllMenuValues}/>
                        <Dropdown linkType="assignments" input={assignmentNames} isOpen={allMenuValues.assignments}/> */}
                        <li><Link className={splitLocation[1] === "about" ? "active" : ""} to="/about">About</Link></li>
                        <li><Link className={splitLocation[1] === "contact" ? "active" : ""} to="/contact">Contact</Link></li>
                    </ul>
                </nav>
                <Outlet />
            </div>

        </>
    )
}