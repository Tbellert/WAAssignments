import { VictoryBar, VictoryChart, VictoryAxis, VictoryContainer, VictoryGroup, VictoryLine } from "victory"
import { useSelector, useDispatch } from "react-redux"
import { addFilter, removeFilter } from "../../app/features/data/dataSlice"
import { Checkbox } from "../Checkbox"

export default function StudentChart({person, assignment}) {
    const data = useSelector(state => state.data.newData)
    const filter = useSelector(state => state.data.filters)
    const dispatch = useDispatch()

    const allStudentNames = data.map(students => students.name)
    const studentNames = [...new Set(allStudentNames)]
    const studentFilter = data.filter(item => item.name.includes(person))
    
    const allAssignmentNames = data.map(assignments => assignments.project)
    const assignmentNames = [...new Set(allAssignmentNames)]
    const projectFilter = data.filter(item => item.project.includes(assignment))

    const projectAverageFilter = getAverages()
    
    function getAverages() {
        const difficulty = data.filter(item => item.project.includes(assignment)).map(item => item.difficulty)
        const averageDifficulty = difficulty.reduce((a, b) => a + b, 0) / difficulty.length
        const fun = data.filter(item => item.project.includes(assignment)).map(item => item.fun)
        const averageFun = fun.reduce((a, b) => a + b, 0) / fun.length
        return [{project: assignment, difficulty: averageDifficulty, fun: averageFun}]
    }

    function handleChange(name) {
        if (filter.includes(name)) {
            dispatch(removeFilter(name))
        } else {
            dispatch(addFilter(name))
        }
    }

    return (
        <div>
            <h2>{person ? person : assignment}</h2>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Checkbox toggle={handleChange} name={"difficulty"}/>
                <Checkbox toggle={handleChange} name={"fun"}/>
                {person ? null : <Checkbox toggle={handleChange} name={"average"}/> }
                <Checkbox toggle={handleChange} name={"line"} />
            </div>
            <VictoryChart
                domain={{y: [0, 5]}}
                domainPadding={10}
                padding={ person ? {top: 10, bottom: 70, right: 10, left: 30} : {top: 10, bottom: 20, right: 10, left: 30}} 
                containerComponent={<VictoryContainer responsive={true} />}
            >
                {filter.includes("average") ?
                    filter.includes("line") ? 
                        <VictoryGroup>
                        {!filter.includes("difficulty") ? 
                            <VictoryLine
                                alignment={person ? "end" : null}
                                data={person ? studentFilter : projectFilter}
                                style={{data: {stroke: "tomato"} }} 
                                x={person ? "project" : "name"}
                                y="difficulty" 
                            />
                        : null}

                        {!filter.includes("fun") ? 
                            <VictoryLine
                                alignment={person ? "end" : null}
                                data={person ? studentFilter : projectFilter}
                                style={{data: {stroke: "gold"} }} 
                                x={person ? "project" : "name"}
                                y="fun" 
                            />
                        : null}
                        </VictoryGroup>
                    :
                        <VictoryGroup offset={122} style={{ data: {width: 120}}}>
                        {!filter.includes("difficulty") ? 
                            <VictoryBar
                                data={projectAverageFilter}
                                style={{data: {fill: "tomato"} }} 
                                x="project"
                                y="difficulty" 
                            />
                        : null}

                        {!filter.includes("fun") ? 
                            <VictoryBar
                                data={projectAverageFilter}
                                style={{data: {fill: "gold"} }} 
                                x="project"
                                y="fun" 
                            />
                        : null}
                        </VictoryGroup>
                :
                    filter.includes("line") ? 
                        <VictoryGroup>
                        {!filter.includes("difficulty") ? 
                            <VictoryLine
                                alignment={person ? "end" : null}
                                data={person ? studentFilter : projectFilter}
                                style={{data: {stroke: "tomato"} }} 
                                x={person ? "project" : "name"}
                                y="difficulty" 
                            />
                        : null}

                        {!filter.includes("fun") ? 
                            <VictoryLine
                                alignment={person ? "end" : null}
                                data={person ? studentFilter : projectFilter}
                                style={{data: {stroke: "gold"} }} 
                                x={person ? "project" : "name"}
                                y="fun" 
                            />
                        : null}
                        </VictoryGroup>
                    :
                        <VictoryGroup offset={person ? 3 : 8} style={person ? { data: {width: 3}} : { data: {width: 8}}}>
                        {!filter.includes("difficulty") ? 
                            <VictoryBar
                                alignment={person ? "end" : null}
                                data={person ? studentFilter : projectFilter}
                                style={{data: {fill: "tomato"} }} 
                                x={person ? "project" : "name"}
                                y="difficulty" 
                            />
                        : null}

                        {!filter.includes("fun") ? 
                            <VictoryBar
                                alignment={person ? "end" : null}
                                data={person ? studentFilter : projectFilter}
                                style={{data: {fill: "gold"} }} 
                                x={person ? "project" : "name"}
                                y="fun" 
                            />
                        : null}
                        </VictoryGroup>
                }
                <VictoryAxis 
                    dependentAxis
                    tickValues={[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]} 
                    style={{ 
                        tickLabels: { fontSize: 6 },
                        grid: {stroke: "lightGray", strokeWidth: 0.5 },
                    }}/>
                <VictoryAxis 
                    tickValues={filter.includes("average") ? null : person ? assignmentNames : studentNames}
                    style={person 
                    ? {tickLabels: {fontSize: 6, angle: 90, textAnchor: "start" }} 
                    : {tickLabels: {fontSize: 6, }}} 
                />
            </VictoryChart>
        </div>
    )
}