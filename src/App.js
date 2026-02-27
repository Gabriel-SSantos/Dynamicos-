import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Start from './pages/Start';
import Times from './pages/Times';
function App() {

  
  const AppLayout = ()=>{
    const location = useLocation();
    // const rotasFull = ['/placar']
    // const verificarRotas = rotasFull.includes(location.pathname)
    return (
      <>
       
          <Routes>
            <Route exact path='/' Component={Start}></Route>
            <Route exact path='/Times' Component={Times}></Route>
            
            {/* <Route path='/placar' Component={Placar}></Route>
            <Route path='/placarconfig' Component={PlacarConfig}></Route>
            <Route path='/placarvencedor' Component={Vencedor}></Route>
            <Route path='/cadastros' Component={Cadastrar}></Route>
            <Route path='/times' Component={Times}></Route>

            <Route path='/embaralhamento' Component={Embaralhamento}></Route>
            <Route exact path='/classificacoes' Component={Ranking}></Route> */}

          </Routes>
       
        
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
