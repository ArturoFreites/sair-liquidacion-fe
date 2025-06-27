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
