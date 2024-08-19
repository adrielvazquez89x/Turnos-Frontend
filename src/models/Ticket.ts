export class Ticket {
    ticketNumber: string;
    dateTime: Date;

    constructor(ticketNumber: string, dateTime: string) {
        this.ticketNumber = ticketNumber;
        this.dateTime = new Date(dateTime);
    }
}