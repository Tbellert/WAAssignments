import { Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Layout from "./pages/Layout"
import { BrowserRouter } from "react-router-dom"

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} >
            <Route index element={<Home />} />
            <Route path="/About" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}