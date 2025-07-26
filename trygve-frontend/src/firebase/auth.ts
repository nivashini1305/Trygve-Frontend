import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth";
import { app } from './config';

const auth = getAuth(app);

// Use SEPARATE holders for signup and login to prevent conflicts
let signUpConfirmationResult: ConfirmationResult | null = null;
let loginConfirmationResult: ConfirmationResult | null = null;

// --- SIGNUP FUNCTIONS ---
export const sendSignUpOTP = async (phoneNumber: string): Promise<void> => {
    const fullPhoneNumber = `+91${phoneNumber}`;
    try {
        if (!(window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
        }
        const appVerifier = (window as any).recaptchaVerifier;
        signUpConfirmationResult = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
    } catch (error) {
        throw new Error(`Failed to send signup OTP: ${error}`);
    }
};

export const verifySignUpOTP = async (otp: string) => {
    if (!signUpConfirmationResult) {
        throw new Error("Signup verification process expired. Please request a new OTP.");
    }
    try {
        const result = await signUpConfirmationResult.confirm(otp);
        const idToken = await result.user.getIdToken();
        localStorage.setItem('firebaseToken', idToken);
        localStorage.setItem('userUID', result.user.uid);
        signUpConfirmationResult = null; // Clear after use
        return result;
    } catch (error) {
        throw new Error(`Invalid signup OTP: ${error}`);
    }
};


// --- LOGIN FUNCTIONS ---
export const sendLoginOTP = async (phoneNumber: string): Promise<void> => {
    const fullPhoneNumber = `+91${phoneNumber}`;
    try {
        if (!(window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
        }
        const appVerifier = (window as any).recaptchaVerifier;
        loginConfirmationResult = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
    } catch (error) {
        throw new Error(`Failed to send login OTP: ${error}`);
    }
};

export const verifyLoginOTP = async (otp: string) => {
    if (!loginConfirmationResult) {
        throw new Error("Login verification process expired. Please request a new OTP.");
    }
    try {
        const result = await loginConfirmationResult.confirm(otp);
        const idToken = await result.user.getIdToken();
        localStorage.setItem('firebaseToken', idToken);
        localStorage.setItem('userUID', result.user.uid);
        loginConfirmationResult = null; // Clear after use
        return result;
    } catch (error) {
        throw new Error(`Invalid login OTP: ${error}`);
    }
};


// --- HELPER FUNCTIONS ---
export const resetRecaptcha = () => {
    // 1. Clear the Firebase verifier instance if it exists on the window object.
    if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
         (window as any).recaptchaVerifier = null; // Nullify the object to be safe.
    }
};

const recaptchaContainer = document.getElementById('recaptcha-container');
    if (recaptchaContainer) {
        recaptchaContainer.innerHTML = '';
    }

export const getStoredToken = (): string | null => {
    return localStorage.getItem('firebaseToken');
};

export const clearStoredAuth = (): void => {
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('userUID');
};