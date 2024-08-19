import { Link } from "react-router-dom";

interface ButtonContent {
    text: string;
    color: string;
    bgColor: string;
    hover: string;
    link: string;
}

export default function PagesSwitch() {

    const buttonsContent: ButtonContent[] = [
        { text: "Pantalla Generar Ticket", color: "text-blue-800", bgColor: "bg-blue-200", hover: "hover:bg-blue-300", link: "/print-ticket" },
        { text: "Pantalla Cajero", color: "text-green-800 ", bgColor: "bg-green-200", hover: "hover:bg-green-300", link: "/cashier" },
        { text: "Pantalla Turnos", color: "text-teal-800 ", bgColor: "bg-teal-200", hover: "hover:bg-teal-300", link: "/display-turns" }];

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Turnos Farmacia</h1>
            </header>
            <section className="w-full max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-blue-500 mb-6 text-center">Elegir vista</h2>
                {
                    buttonsContent.map((button, index) => (
                        <Link to={button.link} key={index}>
                            <div className="mb-4">
                                <div className={`p-4 ${button.bgColor} ${button.hover} ${button.color} font-semibold rounded-lg shadow-md cursor-pointer text-center`}>
                                    <p>{button.text}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </section>
        </div>
    )
}
