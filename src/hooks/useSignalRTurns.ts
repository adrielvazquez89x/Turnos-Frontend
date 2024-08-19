import { useEffect, useState } from 'react';
import { Ticket } from '../types/index';
import * as signalR from '@microsoft/signalr';

// Hook para manejar la conexión a SignalR y la recepción de turnos
export const useSignalRTurns = () => {
    
    const [turns, setTurns] = useState<Ticket[]>([]);

    useEffect(() => {
        // Crear una conexión a SignalR utilizando la URL del Hub
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7118/turnsHub", {
                transport: signalR.HttpTransportType.LongPolling
            })
            // Configurar el nivel de logging para información adicional durante el desarrollo
            .configureLogging(signalR.LogLevel.Information)
            // Habilitar la reconexión automática si la conexión se pierde
            .withAutomaticReconnect()
            .build();

        // Iniciar la conexión SignalR
        connection.start()
            .then(() => {
                console.log("Connected to SignalR");

                // Definir un handler de eventos para recibir los turnos
                connection.on("ReceiveTurn", (turno: Ticket) => {
                    // Verificar si el turno ya existe en la lista
                    setTurns((prevTurns) => {
                        const exists = prevTurns.some(t => t.id === turno.id);
                        if (exists) {
                            
                            return prevTurns; // Si ya existe, devolver la lista sin cambios
                        }
                        
                        return [turno]; // Si no existe, agregarlo
                    });
                });
            })
            .catch(error => {
                console.error("Connection failed: ", error);
            });

        // Manejadores de eventos para reconexión y cierre de conexión
        connection.onreconnecting(error => {
            console.log("Connection lost, reconnecting...", error);
        });

        connection.onreconnected(connectionId => {
            console.log("Reconnected. Connection ID:", connectionId);
        });

        connection.onclose(error => {
            console.error("Connection closed", error);
        });

        // Limpiar la conexión al desmontar el componente o cambiar dependencias
        return () => {
            connection.stop();
        };
    }, []); 

    // Devolver los turnos recibidos para que puedan ser utilizados en el componente
    return turns;
};
