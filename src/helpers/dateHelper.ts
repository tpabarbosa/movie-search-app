export const oneDay = 1000 * 60 * 60 * 24;

export const isDateOlderThan = (date: Date, elapsaded: number) => {
    return new Date().getTime() - elapsaded > new Date(date).getTime() 
}

export const yMMd = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
} as Intl.DateTimeFormatOptions;


export const dateToLocal = (date: Date, format: Intl.DateTimeFormatOptions) => {
    return new Date(date).toLocaleDateString('pt-BR', format)
}

export const convertMinutesToHours = (min: number) => { 
    const hours = Math.floor(min / 60);  
    const minutes = min % 60;
    return {hours, minutes};         
}