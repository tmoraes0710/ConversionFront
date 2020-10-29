import React from 'react';
import Conversor from './components/conversor/conversor'
import './style.css'

function App() {
  return (
    <div className="conv">
      <div className="row">
        <Conversor coinA={"BRL"} coinB={"USD"} quote={"USD"} type={"BRLTOUSD"} symbol={"$"} />
        <Conversor coinA={"BRL"} coinB={"EUR"} quote={"EUR"} type={"BRLTOEUR"} symbol={"€"} />
      </div>
      <div className="row">
        <Conversor coinA={"USD"} coinB={"BRL"} quote={"USD"} type={"USDTOBRL"} symbol={"R$"} />
        <Conversor coinA={"EUR"} coinB={"BRL"} quote={"EUR"} type={"EURTOBRL"} symbol={"R$"} />
      </div>
    </div>

  );
}

export default App;
