import { BrowserRouter,Routes,Route } from "react-router-dom"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About/>}></Route>
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
