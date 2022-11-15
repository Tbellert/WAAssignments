import { useParams } from "react-router-dom"
import IndividualChart from "../components/Charts/IndividualChart"
import Filter from "../components/Filter"

export default function Assignment() {
    let params = useParams()  
    return (
        <div style={{display: "flex", width: "100%"}}>
            <IndividualChart assignment={params.assignmentName}/>
            <Filter assignment={true} display={true}/>
        </div>
    )
}