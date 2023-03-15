import { WaterForm } from './Components/WaterForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";  
import { Calculator } from "./Pages/Calculator"
import { Results } from "./Pages/Results"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Calculator/>}
        />
        <Route
          path="/results" 
          element={<Results/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
