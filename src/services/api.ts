import { Ticket } from "../models/Ticket";
import { Ticket as ITicket } from "../types/index";


const API_URL = "https://localhost:7118/api/Ticket/";

export const getCustomersTypes = async () => {
    try {
        const response = await fetch(`${API_URL}GetCustomersCount`);
        const data = await response.json();
        return data
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const setTicket = async (customerType: number): Promise<Ticket | Error> => {
    try {
        const response = await fetch(`${API_URL}${customerType}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        const ticket = new Ticket(data.ticketNumber, data.dateTime);

        return ticket;
    }
    catch (error) {
        console.log(error);
        return new Error;
    }
}


export const getTurns = async () => {
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();

        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const modifyTurn = async (ticket: ITicket) => {
    try {
        const response = await fetch(`${API_URL}${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        });

        if(!response.ok){
            throw new Error("Error al modificar el ticket");
        }

    }
    catch(error){
        console.log(error);
        throw error;
    }
}