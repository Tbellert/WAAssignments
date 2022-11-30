import { useSelector, useDispatch } from "react-redux"
import { addFilterStudent, addFilterAssignment, removeFilterStudent, removeFilterAssignment} from "../app/features/data/dataSlice"
import Select from "./Select"
import List from "./List"

export default function Filter({ student, assignment, display}) {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data.rawData)
    const filter = useSelector(state => state.data.filters)
    const studentNames = useSelector(state => state.data.students)
    const names = studentNames.map(item => item.name)
    const allAssignmentNames = data.map(assignments => assignments.project)
    const assignmentNames = [...new Set(allAssignmentNames)].map((name, index) => {return {id: index + 1, name: name}})

    function applyAssignmentFilters() {
        const activeAssignmentFilters = filter.filter(item => assignmentNames.map(assignment => assignment.name).includes(item))
        activeAssignmentFilters.forEach(project => {
            dispatch(removeFilterAssignment(project))
            dispatch(addFilterAssignment(project))
        })
    }

    function applyStudentFilters() {
        const activeStudentFilters = filter.filter(item => names.includes(item))
        activeStudentFilters.forEach(name => {
            dispatch(removeFilterStudent(name))
            dispatch(addFilterStudent(name))
        })
    }
   
    function handleCheckboxChange(name) {
        if (names.includes(name)) {
            if (filter.includes(name)) {
                dispatch(removeFilterStudent(name))
                applyAssignmentFilters()
            } else {
                dispatch(addFilterStudent(name))
            }
        } else {
            if (filter.includes(name)) {
                dispatch(removeFilterAssignment(name))
                applyStudentFilters()
            } else {
                dispatch(addFilterAssignment(name))
            }
        }
    }

    function handleSelectButtonClick(eventNames) {
        eventNames.forEach(name => {
            if (names.includes(name)) {
                dispatch(addFilterStudent(name))
                dispatch(removeFilterStudent(name))
                applyAssignmentFilters()
            } else {
                dispatch(addFilterAssignment(name))
                dispatch(removeFilterAssignment(name))
                applyStudentFilters()
            }
        })
    }

    function handleSelectChange(name) {
        if (names.includes(name)) {
            studentNames.forEach(item => {
                dispatch(addFilterStudent(item.name))
            })
            dispatch(removeFilterStudent(name))
            applyAssignmentFilters()
        } else {
            assignmentNames.forEach(item => {
                dispatch(addFilterAssignment(item.name))
            })
            dispatch(removeFilterAssignment(name))
            applyStudentFilters()
        }
    }

    return (
        display ?
            <div className="w-96 text-center">
                { assignment ?          
                    <div className="border shadow-md mb-3">
                        <label className="">Select Student
                           <Select linkType="students" input={studentNames} handleSelectChange={handleSelectChange}/>
                        </label>
                        <List linkType="students" input={studentNames} display="list" handleCheckboxOnChange={handleCheckboxChange} handleSelectButtonOnClick={handleSelectButtonClick}/>
                    </div>
                :
                    null
                }
                { student ?
                    <div className="border shadow-md mb-3">
                        <label>Select Assignment
                            <Select linkType="assignments" input={assignmentNames} handleSelectChange={handleSelectChange}/>
                        </label>
                        <List linkType="assignments" input={assignmentNames} display="list" handleCheckboxOnChange={handleCheckboxChange} handleSelectButtonOnClick={handleSelectButtonClick}/>
                    </div>
                :
                    null        
                }
            </div>
        :
            null 
    )
}