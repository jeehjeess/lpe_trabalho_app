import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Especialidade from './componentes/telas/especialidade/Especialidade'
import Medico from './componentes/telas/medico/Medico'

function App() {
  return (
      <Router>
        <Menu/>
        <Routes>
          <Route exact="true" path="/" element={<Home/>}/>
          <Route exact="true" path="/especialidades" element={<Especialidade/>}/>
          <Route exact="true" path="/medicos" element={<Medico/>}/>
        </Routes>
      </Router>
  );
}

export default App;
