export interface Ticket {
    id: number;
    customer: number;
    counterNumber: number;
    called: boolean;
    status: boolean;
    ticketNumber: string;
    dateTime: string;
}