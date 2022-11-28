import { Route, Routes } from "react-router-dom"
import Home from "./routing/Home"
import About from "./routing/About"
import Students from "./routing/Students"
import Student from "./routing/Student"
import Assignments from "./routing/Assignments"
import Assignment from "./routing/Assignment"
import Layout from "./routing/Layout"
import { BrowserRouter } from "react-router-dom"

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} >
            <Route index element={<Home />} />
            <Route path="/students" element={<Students />}>
              <Route path=":studentName" element={<Student />} />
            </Route>
            <Route path="/assignments" element={<Assignments />}>
              <Route path=":assignmentName" element={<Assignment />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<main><p>There's nothing here!</p></main>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}