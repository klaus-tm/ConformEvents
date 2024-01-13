// for use: import { formatDate } from './functions/FormatDate';
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
};