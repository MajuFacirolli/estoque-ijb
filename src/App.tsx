import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Storage } from "./Storage";
import { Outlet } from "./Outlet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Storage />}/>
        <Route path="/outlet" element={<Outlet />}/>
      </Routes>
    </Router>
  )
}

export default App
