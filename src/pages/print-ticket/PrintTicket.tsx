import { PDFViewer } from "@react-pdf/renderer";
import { Spinner } from "../../components/Spinner";
import { useFetchCustomers } from "../../hooks/useFetchCustomers";
import { setTicket } from "../../services/api";
import ReactDOM from 'react-dom/client';
import { TicketRendering } from "../../components/pdfRenderer";
import { Ticket } from "../../models/Ticket";

export default function PrintTicket() {

    const { customersTypes, loading, error } = useFetchCustomers();

    const isEven = (num: number) => num % 2 === 0;

    const handleClick = async (customer: number) => {
        const ticket: Ticket | Error = await setTicket(customer);

        const newWindow = window.open("", "_blank", "width=600,height=400");

        if (newWindow && !(ticket instanceof Error)) {
            newWindow.document.title = "Imprimir Ticket";
            newWindow.document.body.style.margin = "0";

            const container = newWindow.document.createElement('div');
            newWindow.document.body.appendChild(container);

            const root = ReactDOM.createRoot(container);

            root.render(
                <PDFViewer width="100%" height="100%">
                    <TicketRendering ticketNumber={ticket.ticketNumber} date={ticket.dateTime} />
                </PDFViewer>
            );

            newWindow.onbeforeunload = () => {
                root.unmount();
            }
        }
    };

    if (error) {
        console.error(error);
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <header className="text-center mb-8">
                        
                        <h1 className="text-4xl font-bold text-blue-600">BIENVENIDOS</h1>
                        <p className="text-xl text-blue-500">Farmacia</p>
                    </header>
                    <section className="w-full max-w-md mx-auto">
                        <div className="grid grid-cols-2 gap-4">
                            {customersTypes.map((customer, index) => (
                                <div
                                    className={`p-6 ${isEven(index) ? "bg-blue-200" : "bg-green-200"}
                                        ${isEven(index) ? "hover:bg-blue-300" : "hover:bg-green-300"}
                                        ${isEven(index) ? "text-blue-800" : "text-green-800 "}
                                        font-semibold rounded-lg shadow-md cursor-pointer text-center`}
                                    key={index}
                                    onClick={() => handleClick(customer.value)}
                                >
                                    {customer.name.replace("_", " ")}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}

        </div>
    );
}
