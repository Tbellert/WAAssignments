export default function StudentCard({input}) { 
    return (
        input.map((student) => {
            return (
                <main>
                    <div key={student.id}>
                        <img src={student.photo} alt="" style={{width: "200px", height: "200px"}} />
                        <h1>{student.name} {student.lastName}</h1>
                        <p>Age: {student.age}</p>
                        <p>Email: {student.email}</p>
                        <p>Phone: {student.phoneNumber}</p>
                    </div>
                </main>
            )
        })
    )
}