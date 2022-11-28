import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import IndividualChart from "../components/Charts/IndividualChart"
import Filter from "../components/Filter"
import StudentCard from "../components/StudentCard"


export default function Student() {
    let params = useParams()
    const studentData = useSelector(state => state.data.students)

    return (
        <div style={{display: "flex", width: "100%"}} >
            <IndividualChart person={params.studentName}/>
            <Filter student={true} display={true}/>
            <StudentCard input={studentData.filter(item => item.name.includes(params.studentName))}/>
        </div>
    )
}