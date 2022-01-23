export function formatDateLong(date: Date): string {
    return new Intl.DateTimeFormat('en', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long'
    }).format(date);
}

export function formatDateShort(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
        timeStyle: 'short',
        dateStyle: 'short'
    }).format(date);
}
