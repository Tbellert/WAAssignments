import { Link, useLocation } from "react-router-dom"

export default function StudentCard({input}) { 
    const location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split("/")

    return (
        input.map((student) => {
            return (
                    <div className={`text-center h-fit pb-6 shadow-xl border rounded-md ${splitLocation[2] === student.name ? "w-80" : "w-64" }`} key={student.id}>
                        <img className={`rounded-t-lg ${splitLocation[2] === student.name ? "w-80 h-80" : "w-64 h-64" }`} src={student.photo} alt={`${student.name}`} />
                        <h1 className="text-xl font-bold border-b-2 border-blue-500 w-44 m-auto">{student.name} {student.lastName}</h1>
                        <div className="flex flex-wrap">
                            <p className={`${splitLocation[2] === student.name ? "w-20 md:w-32" : "w-16" }`}>Age:</p><span className="w-44 text-left">{student.age}</span>
                            <p className={`${splitLocation[2] === student.name ? "w-20 md:w-32" : "w-16" }`}>Email:</p><span className="w-44 text-left">{student.email}</span>
                            <p className={`${splitLocation[2] === student.name ? "w-20 md:w-32" : "w-16" }`}>Phone:</p><span className="w-44 text-left">{student.phoneNumber}</span>
                            {splitLocation[2] === student.name ? null :                 
                            <p className="m-auto w-24 mt-3 p-1 text-blue-500 border rounded-lg shadow-md cursor-pointer">
                                <Link className="" to={`/students/${student.name}`}
                                >Show ratings
                                </Link>
                            </p>}
                        </div>
                    </div>
            )
        })
    )
}