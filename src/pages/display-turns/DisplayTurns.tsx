import { Ticket } from "../../types";
import publicity from "../../../public/publicity.jpeg";
import { useEffect, useState, useRef } from "react";

export default function DisplayTurns() {
    const [currentTurn, setCurrentTurn] = useState<Ticket | null>(null);
    const [previousTurns, setPreviousTurns] = useState<Ticket[]>([]);
    const currentTurnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateTurns = () => {
            const turnsScreen = JSON.parse(localStorage.getItem("turnsScreen") || "[]") as Ticket[];

            if (turnsScreen.length > 0) {
                setCurrentTurn(turnsScreen[0]);
                setPreviousTurns(turnsScreen.slice(1, 3));
            } else {
                setCurrentTurn(null);
                setPreviousTurns([]);
            }
        };

        window.addEventListener("storage", updateTurns);
        updateTurns();

        return () => {
            window.removeEventListener("storage", updateTurns);
        };
    }, []);

    useEffect(() => {
        if (currentTurnRef.current) {
            currentTurnRef.current.classList.remove("blink");
            void currentTurnRef.current.offsetWidth; // Forzar el reflujo para reiniciar la animación
            currentTurnRef.current.classList.add("blink");
        }
    }, [currentTurn]);

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-gray-200 flex items-center justify-center">
                <img src={publicity} alt="Publicidad" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="w-1/2 bg-white flex flex-col items-center justify-center">
                {currentTurn ? (
                    <>
                        <div
                            ref={currentTurnRef}
                            className="text-6xl font-bold text-blue-600"
                        >
                            {currentTurn.ticketNumber}
                        </div>

                        <div className="mt-8">
                            {previousTurns.map((turn, index) => (
                                <div key={index} className="text-4xl font-bold text-gray-500">
                                    {turn.ticketNumber}
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <h1 className="text-2xl text-gray-500">Farmacia</h1>
                )}
            </div>
        </div>
    );
}
