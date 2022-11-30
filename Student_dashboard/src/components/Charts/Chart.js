import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup, VictoryLine, VictoryZoomContainer } from "victory"
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
        <div className="h-2/3 border shadow-md">
            <h2 className="text-center font-bold text-xs md:text-xl mb-2">Average Rating for all students per assignment</h2>
            <h3 className="text-center text-xs italic">Drag to pan, scroll to zoom </h3>
            <div className="flex justify-center gap-2">
                <Checkbox toggleCheckbox={handleChange} name={"difficulty"}/>
                <Checkbox toggleCheckbox={handleChange} name={"fun"}/>
                <Checkbox toggleCheckbox={handleChange} name={"line"}/>
            </div>
            <VictoryChart
                width={1000}
                height={577}
                domain={{y: [0, 5]}}
                domainPadding={{x:10, y:0}}
                padding={{top: 10, bottom: 120, right: 10, left: 30}}
                containerComponent={<VictoryZoomContainer />} 
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
                    <VictoryGroup offset={8} style={{ data: {width: 8}}}>
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
                        tickLabels: { fontSize: 12 },
                        grid: {stroke: "lightGray", strokeWidth: 0.5 },
                    }}/>
                <VictoryAxis
                    tickValues={onlyNames}
                    style={{tickLabels: { fontSize: 12, angle: 90, textAnchor: "start"}}} />
            </VictoryChart>
        </div>
    )
}