import { Ticket } from '../types/index';
import { useSignalRTurns } from '../hooks/useSignalRTurns';

const DisplayTurns = () => {
    // Usar el hook personalizado para obtener los turnos
    const turns: Ticket[] = useSignalRTurns();

    return (
        <div>
            <h1>Turnos Actuales</h1>
            <ul>
                {/* Iterar sobre los turnos y renderizar cada uno como un elemento de lista */}
                {turns.map((turn, index) => (
                    <li key={index}>
                        <strong>Ticket Number:</strong> {turn.ticketNumber} <br />
                        <strong>Date:</strong> {new Date(turn.dateTime).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayTurns;
