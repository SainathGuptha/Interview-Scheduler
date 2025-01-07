// import Calendar from "./calender"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Sheduler from "./components/sheduler"
import { ContextProvider } from "./components/context"
import Resheduler from "./components/resheduler"
import Dashboard from "./components/dashboard"
function App() {


  return (
    <>
  <BrowserRouter>
  <ContextProvider>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/sheduler" element={<Sheduler/>}/>
      <Route path="/resheduler" element={<Resheduler/>}/>
    </Routes>
  </ContextProvider>
  </BrowserRouter>

    </>
  )
}

export default App
