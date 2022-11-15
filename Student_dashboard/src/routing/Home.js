import Chart from "../components/Charts/Chart"
import Filter from "../components/Filter"

export default function Home() {
    return (
        <main style={{display: "flex", width: "100%"}}>
            <Chart />
            <Filter display={true} student={true} assignment={true}/>
        </main>
    )
}