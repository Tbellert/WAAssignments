import { useParams } from "react-router-dom"
import IndividualChart from "../components/Charts/IndividualChart"
import Filter from "../components/Filter"

export default function Student() {
    let params = useParams()
    
    return (
        <div style={{display: "flex", width: "100%"}} >
            <IndividualChart person={params.studentName}/>
            <Filter student={true} display={true}/>
            <h2>Profile of: {params.studentName}</h2>
        </div>
    )
}