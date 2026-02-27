import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Start from './pages/Start';
import Times from './pages/Times';
import Desafio from './pages/Desafio';
import Ponto from './pages/Ponto';
import Placar from './pages/Placar';
import { WiDayCloudy } from 'react-icons/wi';
function App() {

  
  const AppLayout = ()=>{
    const location = useLocation();
    // const rotasFull = ['/placar']
    // const verificarRotas = rotasFull.includes(location.pathname)
    return (
      <>
          <div  style={{height: "100%"}}>
          <Routes>
            <Route exact path='/' Component={Start}></Route>
            <Route exact path='/Times' Component={Times}></Route>
            <Route exact path='/Desafio' Component={Desafio}></Route>
            <Route exact path='/Ponto' Component={Ponto}></Route> 
            <Route exact path='/Placar' Component={Placar}></Route>
          </Routes>
          </div>
      </>
    )
  }

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
