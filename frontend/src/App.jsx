import { BrowserRouter,Routes,Route } from "react-router-dom"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import ScrollToTop from "./components/ScrollToTop"
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
      <ScrollToTop />
    </>
  )
}

export default App
