import { useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import StudentCard from "../components/StudentCard"

export default function Students() {
    const location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split("/")
    const studentData = useSelector(state => state.data.students)

    return (
        splitLocation[2] ?
                <Outlet /> 
        :
            <main className="flex gap-2 flex-wrap justify-center mt-4 ml-4">
                <StudentCard input={studentData}/>
                <Outlet />
            </main> 
    )
}