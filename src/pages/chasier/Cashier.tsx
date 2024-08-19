import { useState, Dispatch } from 'react';
import { useFetchCustomers } from '../../hooks/useFetchCustomers';
import { Ticket } from '../../types';
import { modifyTurn } from '../../services/api';

interface TicketWithTime extends Ticket {
    time: string;
}

interface CashierProps {
    turns: Ticket[];
    turnsScreen: Ticket[];
    setTurns: Dispatch<React.SetStateAction<Ticket[]>>
    setTurnsScreen: Dispatch<React.SetStateAction<Ticket[]>>
}

export default function Cashier({ turns, setTurns, turnsScreen, setTurnsScreen }: CashierProps) {

    const [history, setHistory] = useState<TicketWithTime[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { customersTypes } = useFetchCustomers();
    const itemsPerPage = 5; //
    const totalPages = Math.ceil(history.length / itemsPerPage);

    const updateTicket = (ticket: Ticket) => {
        ticket.called = true;
        ticket.status = true;

        modifyTurn(ticket)
    }

    const handleCallNext = (customerValue: number) => {
        const turnKeys = 4;


        if (customerValue < 1 || customerValue > turnKeys) {
            console.error("Invalid customer value");
            return;
        }

        const nextTurn = turns.find(turn => turn.customer === customerValue);

        if (nextTurn) {
            const updatedTurnsScreen = [nextTurn, ...turnsScreen]; // Agregar al inicio
            setTurnsScreen(updatedTurnsScreen);
            setTurns(turns.filter(turn => turn !== nextTurn));
            setHistory([...history, { ...nextTurn, time: new Date().toLocaleTimeString() } as Ticket & { time: string }]);
            localStorage.setItem("turnsScreen", JSON.stringify(updatedTurnsScreen));
            updateTicket(nextTurn);
        }


    };


    const calculateCounters = (index: number) => {
        const ticketTypes = ["OPM", "OS", "PA", "PERF"];

        
        if (index >= 0 && index < ticketTypes.length) {
        
            const ticketType = ticketTypes[index];

        
            const count = turns.reduce((counter, turn) => {
                return turn.ticketNumber.includes(ticketType) ? counter + 1 : counter;
            }, 0);

            
            return count;
        }

        console.error("Invalid index provided");
        return 0;
    };


    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentHistory = history.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">Gestión de Turnos</h1>
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-semibold text-center mb-4">Tipos de Clientes en Espera</h2>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {customersTypes.map((customer, index) => (
                        <div key={index} className="p-4 bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold rounded-lg shadow-md text-center">
                            <p>{customer.name}</p>
                            <p>Cantidad en Espera: <span className="text-3xl text-red-500">{calculateCounters(index)}</span></p>
                            <button
                                onClick={() => handleCallNext(customer.value)}
                                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
                            >
                                Llamar Siguiente {customer.name.replace("_", " ")}
                            </button>
                        </div>
                    ))}
                </div>
                <h2 className="text-2xl font-semibold text-center mb-4">Historial de Llamadas</h2>
                <table className="w-full bg-white rounded-lg shadow-md text-left">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-2 px-4">Turno</th>
                            <th className="py-2 px-4">Hora de Llamada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentHistory.map((entry, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="py-2 px-4">{entry.ticketNumber}</td>
                                <td className="py-2 px-4">{entry.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Paginación */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
                    >
                        Anterior
                    </button>

                    <span className="text-lg font-semibold">
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
                    >
                        Siguiente
                    </button>
                </div>

            </div>
        </div>
    );
}
