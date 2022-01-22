export function formatDate(date: string): string {
    return new Intl.DateTimeFormat('en', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long'
    }).format(new Date(date));
}
