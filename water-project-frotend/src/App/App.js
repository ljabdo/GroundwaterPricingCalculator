import { BrowserRouter, Routes, Route } from "react-router-dom";  
import { Calculator } from "./Pages/Calculator"
import { Results } from "./Pages/Results"
import { ThemeProvider } from '@emotion/react';
import theme from "./Pages/theme"


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
