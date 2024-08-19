import "./index.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrintTicket from "./pages/print-ticket/PrintTicket";
import PagesSwitch from "./pages/switch/PagesSwitch";
import Cashier from "./pages/chasier/Cashier";
import DisplayTurns from "./pages/display-turns/DisplayTurns";
import { useSignalRTurns } from "./hooks/useSignalRTurns";
import { Ticket } from "./types";

function App() {
  const [turns, setTurns] = useState<Ticket[]>([]);
  const [turnsScreen, setTurnsScreen] = useState<Ticket[]>([]);

  const newTurns = useSignalRTurns();
  
  useEffect(() => {
    // Filtrar los turnos para evitar duplicados
    const updatedTurns = newTurns.filter(
      newTurn => !turns.some(existingTurn => existingTurn.id === newTurn.id)
    );

    // Agregar los turnos filtrados al estado
    if (updatedTurns.length > 0) {
      setTurns(prevTurns => [...prevTurns, ...updatedTurns]);
    }

  }, [newTurns]);


  const links = [
    { path: "/print-ticket", component: <PrintTicket /> },
    { path: "/cashier", component: <Cashier turns={turns} setTurns={setTurns} turnsScreen={turnsScreen} setTurnsScreen={setTurnsScreen} /> },
    { path: "/display-turns", component: <DisplayTurns /> },
    { path: "/", component: <PagesSwitch /> }
  ]

  return (
    <>
      <Router>
        <Routes>
          {links.map((link, index) => (<Route path={link.path} element={link.component} key={index} />))}
        </Routes>
      </Router>


    </>
  )
}

export default App
