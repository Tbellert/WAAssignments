import { Outlet } from "react-router-dom"

export default function Students() {

    return (
        <main style={{width: "80%"}}>
            <Outlet />
        </main>
    )
}