import { useSelector, useDispatch } from "react-redux"
import { addFilter, removeFilter, filterData, removeAllFilters, applyFilters} from "../app/features/data/dataSlice"
import Select from "./Select"
import Dropdown from "./Dropdown"

export default function Filter({ student, assignment, display}) {
    const data = useSelector(state => state.data.rawData)
    const filter = useSelector(state => state.data.filters)
    const newData = useSelector(state => state.data.newData)
    const dispatch = useDispatch()
    const studentNames = useSelector(state => state.data.students)
    const names = studentNames.map(item => item.name)
    
    const allAssignmentNames = data.map(assignments => assignments.project)
    const assignmentNames = [...new Set(allAssignmentNames)].map((name, index) => {return {id: index + 1, name: name}})

    function filterData() {
        const currentFilters = filter.map(item => item)
        currentFilters.forEach(element => {
            if (names.includes(element)) {
                const result = newData.filter(item => !item.name.includes(element))
                dispatch(applyFilters(result))
            } else {
                const result = newData.filter(item => !item.project.includes(element))
                dispatch(applyFilters(result))
            }
        })      
    }
       
    // individual checkbox
    function handleChange(name) {
        if (filter.includes(name)) {
            dispatch(removeFilter(name))
            filterData()
        } else {
            dispatch(addFilter(name))
            filterData()
        }
        // dispatch(applyFilters())
    }

    // Select All button
    function handleOnClick(eventNames) {
        dispatch(removeAllFilters(eventNames))
        filterData()
        // dispatch(applyFilters())
    }

    // Select Dropdown button
    function setChange(name) {
        if (names.includes(name)) {
            studentNames.forEach(item => {
                console.log(`Added filter ${item.name}`)
                dispatch(addFilter(item.name))
            })
            filterData()
        } else {
            assignmentNames.forEach(item => {
                console.log(`Added filter ${item.name}`)
                dispatch(addFilter(item.name))
            })
            filterData()
        }
        console.log(`Removed filter ${name}`)
        dispatch(removeFilter(name))
        filterData()
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
                        <Dropdown linkType="assignments" input={assignmentNames} display="list" handleOnChange={handleChange} handleOnClick={handleOnClick}/>
                    </div>
                :
                    null        
                }
            </div>
        :
            null 
    )
}