import { VictoryBar, VictoryChart, VictoryAxis, VictoryContainer, VictoryGroup, VictoryLine} from "victory"
import { useSelector, useDispatch } from "react-redux"
import { addFilter, removeFilter } from "../../app/features/data/dataSlice"
import { Checkbox } from "../Checkbox"

export default function Chart() {
    const data = useSelector(state => state.data.newData)
    const filter = useSelector(state => state.data.filters)
    const dispatch = useDispatch()

    const allAssignmentNames = data.map(assignments => assignments.project)
    const assignmentNames = [...new Set(allAssignmentNames)].map((name, index) => {return {id: index + 1, name: name}})
    const onlyNames = assignmentNames.map(item => item.name)

    function createAverageArray(array) {
        const averageArray = []
        array.forEach(assignment => {
        averageArray.push(calculateAverages(assignment))
        })
        return averageArray
    }
    
    function calculateAverages(assignment) {
        const difficultyArray = data.filter(item => item.project.includes(assignment)).map(assignment => assignment.difficulty)
        const funArray = data.filter(item => item.project.includes(assignment)).map(assignment => assignment.fun)
        const averageDifficulty = difficultyArray.reduce((a, b) => a + b, 0) / difficultyArray.length
        const averageFun = funArray.reduce((a, b) => a + b, 0) / funArray.length
        return {project: assignment, difficulty: averageDifficulty, fun: averageFun}
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
            <h2 style={{textAlign: "center"}}>Average Rating for all students per assignment</h2>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Checkbox toggleCheckbox={handleChange} name={"difficulty"}/>
                <Checkbox toggleCheckbox={handleChange} name={"fun"}/>
                <Checkbox toggleCheckbox={handleChange} name={"line"}/>
            </div>
            <VictoryChart
                domain={{y: [0, 5]}}
                domainPadding={{x:10, y:0}}
                padding={{top: 10, bottom: 80, right: 10, left: 30}} 
                containerComponent={<VictoryContainer responsive={true} />}
            >
                {filter.includes("line") ? 
                    <VictoryGroup>
                    {!filter.includes("difficulty") ? 
                    <VictoryLine
                        alignment="end"
                        data={createAverageArray(onlyNames)}
                        style={{data: {stroke: "tomato"} }} 
                        x="project"
                        y="difficulty" 
                    />: null}
                
                    {!filter.includes("fun") ? 
                    <VictoryLine
                        alignment="end"
                        data={createAverageArray(onlyNames)} 
                        style={{data: {stroke: "gold"} }} 
                        x="project" 
                        y="fun" 
                    />: null }
                    </VictoryGroup>
                :
                    <VictoryGroup offset={3} style={{ data: {width: 3}}}>
                    {!filter.includes("difficulty") ? 
                        <VictoryBar
                            alignment="end"
                            data={createAverageArray(onlyNames)}
                            style={{data: {fill: "tomato"} }} 
                            x="project"
                            y="difficulty" 
                        /> 
                    : null}

                    {!filter.includes("fun") ? 
                        <VictoryBar
                            alignment="end"
                            data={createAverageArray(onlyNames)} 
                            style={{data: {fill: "gold"} }} 
                            x="project" 
                            y="fun" 
                        />
                    : null }
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
                    tickValues={onlyNames}
                    style={{tickLabels: { fontSize: 6, angle: 90, textAnchor: "start"}}} />
            </VictoryChart>
        </div>
    )
}