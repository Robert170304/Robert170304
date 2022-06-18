import React from 'react';
import About from './components/About';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [mode, setMode] = React.useState(false)
  const [alert, setAlert] = React.useState(null)
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
  
  function showAlert(msg, type) {
    setAlert({message: msg, alertType: type})
    setTimeout(() => {
      setAlert(null)
    }, 2500);
  }

  function handleMode() {
      setMode((oldState) => {
        return !oldState
      });
      document.body.classList.toggle("dark-theme");
      let theme = "light"
      if (document.body.classList.contains("dark-theme")) {
        theme = "dark";
      } 
      localStorage.setItem("theme", theme);
  }

  return (
    <Router>
      <div className="App">
        <Navbar title='TypeWriter' modeClick={handleMode} theme={currentTheme}/>
        <div className='container'>
          <Routes>
            <Route exact path="/about" element={<About theme={currentTheme}/>}></Route>
            <Route path="/" 
            element={<Textform heading='Type Anything' showAlert={showAlert} theme={currentTheme}/>}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
