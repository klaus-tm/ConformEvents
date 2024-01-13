// for use: import { isValidName, isValidPhone, isValidEmail, isValidPassword } from './functions/CreateAccontValidation.ts';
export const isValidName = (name: string): boolean => {
    if (name.length <3) return false;
    const regexDigit = /[0-9]/;
    return !regexDigit.test(name);
};

export const isValidPhone = (phone: string): boolean => {
    if (phone.length < 10) return false;
    const regexLowerCase = /[a-z]/;
    const regexUpperCase = /[A-Z]/;
    const regexSpc = /[!@#$%^?><;'&*()]/;
    return !(regexLowerCase.test(phone) && regexUpperCase.test(phone) && regexSpc.test(phone));
};
export const  isValidEmail = (email: string): boolean => {
    if (email.length < 8) return false;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};
export const  isValidPassword = (pass: string): boolean => {
    if (pass.length < 8) return false;
    const regexLowerCase = /[a-z]/;
    const regexUpperCase = /[A-Z]/;
    const regexDigit = /[0-9]/;
    const regexSpc = /[!@#$%^?><;'&*()]/;
    return regexLowerCase.test(pass) && regexUpperCase.test(pass) && regexDigit.test(pass) && regexSpc.test(pass);
};