import Chart from "../components/Charts/Chart"
import Filter from "../components/Filter"

export default function Home() {
    return (
        <main className="flex flex-wrap justify-center gap-2 w-full">
            <Chart />
            <Filter display={true} student={true} assignment={true}/>
        </main>
    )
}