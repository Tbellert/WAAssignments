import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup, VictoryLine, VictoryZoomContainer } from "victory"
import { useSelector, useDispatch } from "react-redux"
import { addFilter, removeFilter } from "../../app/features/data/dataSlice"
import { Checkbox } from "../Checkbox"

export default function IndividualChart({person, assignment}) {
    const data = useSelector(state => state.data.newData)
    const filter = useSelector(state => state.data.filters)
    const studentNames = useSelector(state => state.data.students).map(item => item.name)
    const allAssignmentNames = data.map(assignments => assignments.project)
    const assignmentNames = [...new Set(allAssignmentNames)]
    const projectFilter = data.filter(item => item.project.includes(assignment))
    const studentFilter = data.filter(item => item.name.includes(person))
    const projectAverageFilter = getAverages()
    const dispatch = useDispatch()

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
        <div className="border shadow-md h-2/3">
            <h2 className="text-md md:text-xl font-bold text-center mb-2">{person ? `Ratings of ${person} per assignment` : `Ratings of ${assignment} per student` }</h2>
            <h3 className="text-center text-xs italic">Drag to pan, scroll to zoom </h3>
            <div className="flex gap-2 justify-center">
                <Checkbox toggleCheckbox={handleChange} name={"difficulty"}/>
                <Checkbox toggleCheckbox={handleChange} name={"fun"}/>
                {person ? null : <Checkbox toggleCheckbox={handleChange} name={"average"}/> }
                <Checkbox toggleCheckbox={handleChange} name={"line"} />
            </div>
            <VictoryChart
                width={1000}
                height={577}
                domain={{y: [0, 5]}}
                domainPadding={20}
                padding={ person ? {bottom: 120, right: 10, left: 40} : {bottom: 80, right: 10, left: 40}}
                containerComponent={<VictoryZoomContainer/>}  
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
                        <VictoryGroup offset={182} style={{ data: {width: 180}}}>
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
                        <VictoryGroup offset={person ? 8 : 20} style={person ? { data: {width: 8}} : { data: {width: 20}}}>
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
                        tickLabels: { fontSize: 12 },
                        grid: {stroke: "lightGray", strokeWidth: 0.5 },
                    }}/>
                <VictoryAxis 
                    tickValues={filter.includes("average") ? null : person ? assignmentNames : studentNames}
                    style={person 
                    ? {tickLabels: {fontSize: 12, angle: 90, textAnchor: "start" }} 
                    : {tickLabels: {fontSize: 12 }}} 
                />
            </VictoryChart>
        </div>
    )
}