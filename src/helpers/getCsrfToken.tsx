export const getCsrfToken = () => localStorage.getItem('csrfToken') || undefined;
export const setCsrfToken = ( value : string) => localStorage.setItem('csrfToken' , value) 
export const rmCsrfToken = () => localStorage.removeItem('csrfToken') 