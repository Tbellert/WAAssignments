import { useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import StudentCard from "../components/StudentCard"

export default function Students() {
    const location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split("/")

    const studentData = useSelector(state => state.data.students)

    return (
        <main style={{width: "80%"}}>
            {splitLocation[2] ? null : <StudentCard input={studentData}/>}
            <Outlet />
        </main>
    )
}