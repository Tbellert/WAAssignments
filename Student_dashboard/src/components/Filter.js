import { useSelector, useDispatch } from "react-redux"
import { addFilter, removeFilter, filterData, removeAllFilters} from "../app/features/data/dataSlice"
import Select from "./Select"
import Dropdown from "./Dropdown"


export default function Filter({ student, assignment, display}) {
    const data = useSelector(state => state.data.rawData)
    const filter = useSelector(state => state.data.filters)
    const dispatch = useDispatch()
    const studentNames = useSelector(state => state.data.students)
    const names = studentNames.map(item => item.name)

    const allAssignmentNames = data.map(assignments => assignments.project)
    const assignmentNames = [...new Set(allAssignmentNames)].map((name, index) => {return {id: index + 1, name: name}})

    function handleChange(name) {
        if (filter.includes(name)) {
            dispatch(removeFilter(name))
        } else {
            dispatch(addFilter(name))
        }
        dispatch(filterData(name))
    }

    function handleOnClick(eventNames) {
        dispatch(removeAllFilters(eventNames))
        eventNames.forEach(item => dispatch(filterData(item)))
    }

    function setChange(name) {
        if (names.includes(name)) {
            studentNames.forEach(item => {
                dispatch(addFilter(item.name))
                dispatch(filterData(item.name))
            })
        } else {
            assignmentNames.forEach(item => {
                dispatch(addFilter(item.name))
                dispatch(filterData(item.name))
            })
        }
        dispatch(removeFilter(name))
        dispatch(filterData(name))
    }

    return (
        display ?
            <div style={{width: "400px", textAlign: "center"}}>
                { assignment ?          
                    <div>
                        <h2>Students</h2>
                        <label>Select one student
                           <Select linkType="students" input={studentNames} handleSelectChange={setChange}/>
                        </label>
                        <Dropdown linkType="students" input={studentNames} display="list" handleOnChange={handleChange} handleOnClick={handleOnClick}/>
                    </div>
                :
                    null
                }
                { student ?
                    <div>
                    <h2>Assignments</h2>
                        <label>Select one assignment
                            <Select linkType="assignments" input={assignmentNames} handleSelectChange={setChange}/>
                        </label>
                        <Dropdown linkType="assignments" input={assignmentNames} display="list" handleOnChange={handleChange}handleOnClick={handleOnClick}/>
                    </div>
                :
                    null        
                }
            </div>
        :
            null 
    )
}