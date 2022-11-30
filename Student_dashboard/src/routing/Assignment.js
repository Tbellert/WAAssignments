import { useParams } from "react-router-dom"
import IndividualChart from "../components/Charts/IndividualChart"
import Filter from "../components/Filter"

export default function Assignment() {
    let params = useParams()  
    return (
        <main className="flex flex-wrap justify-center w-full h-fit gap-2">
            <IndividualChart assignment={params.assignmentName}/>
            <Filter assignment={true} display={true}/>
        </main>
    )
}