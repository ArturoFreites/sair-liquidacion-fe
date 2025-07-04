export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();

    if (year < 1900 || year > 2100) return '-';

    return date.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}


export const formatCurrency = (value: number) => {
    return value.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    });
};

export const formatPeriod = (month: number, year: number) => {
    const date = new Date(year, month - 1);
    return date
        .toLocaleDateString("es-AR", { year: "numeric", month: "long" })
        .replace(" de ", " ");
};

export const formatDni = (dni?: string | number): string => {
    if (!dni) return "-";
    const raw = dni.toString().replace(/\D/g, "");
    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

