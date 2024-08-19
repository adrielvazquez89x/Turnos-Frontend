import { useState, useEffect } from "react";
import { getCustomersTypes } from "../services/api";

interface CustomerType {
    value: number;
    name: string;
}


export const useFetchCustomers = () => {
    const [customersTypes, setCustomersTypes] = useState<CustomerType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | unknown>(null);

    useEffect(() => {
        const fetchCustomerTypes = async () => {
            try {
                setLoading(true);
                const data = await getCustomersTypes();
                setCustomersTypes(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerTypes();
    }, []);

    return { customersTypes, loading, error };
};
