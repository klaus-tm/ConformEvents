// for use: import { formatDate } from './functions/FormatDate';
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
};

export const isDateLaterOrToday = (dateString: string): boolean => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);

    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    return inputDate >= currentDate;
}
