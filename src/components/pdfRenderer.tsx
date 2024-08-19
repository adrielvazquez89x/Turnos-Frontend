import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

//Styles

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#ffffff'
    },
    header: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    section: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
    date: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
    footer: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 10,
    },
    dashedLine: {
        borderTopWidth: 1,
        borderStyle: 'dashed',
        marginVertical: 10,
    }
});

interface TicketRenderingProps {
    ticketNumber: string;
    date: Date;
}

//Create  documnent component

export const TicketRendering = ({ ticketNumber, date }: TicketRenderingProps) => (
    <Document>
        <Page size="A6" style={styles.page}>
            <Text style={styles.header}>FARMACIA</Text>
            <View style={styles.dashedLine}></View>
            <Text style={styles.title}>Turno {ticketNumber}</Text>
            <View style={styles.dashedLine}></View>
            <Text style={styles.date}>{date.toLocaleDateString("es-ES")} {date.toLocaleTimeString()}</Text>
            <View style={styles.dashedLine}></View>
            <Text style={styles.footer}>adrielvazquez.com.ar</Text>
        </Page>
    </Document>
)

