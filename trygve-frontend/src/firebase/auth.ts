import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth";
import { app } from './config';

const auth = getAuth(app);

// Store the confirmation result globally
let confirmationResultHolder: ConfirmationResult | null = null;

export const sendSignUpOTP = async (phoneNumber: string): Promise<void> => {
    const fullPhoneNumber = `+91${phoneNumber}`;
    
    try {
        // Create reCAPTCHA verifier if it doesn't exist
        if (!(window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response: any) => {
                    console.log("reCAPTCHA solved");
                },
                'expired-callback': () => {
                    console.log("reCAPTCHA expired");
                }
            });
        }

        const appVerifier = (window as any).recaptchaVerifier;
        
        // Send OTP
        confirmationResultHolder = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
        console.log("OTP sent successfully");
        
    } catch (error: any) {
        console.error("Error sending OTP:", error);
        
        // Reset reCAPTCHA on error
        if ((window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier.clear();
            (window as any).recaptchaVerifier = null;
        }
        
        throw new Error(`Failed to send OTP: ${error.message}`);
    }
};

export const verifySignUpOTP = async (otp: string) => {
    if (!confirmationResultHolder) {
        throw new Error("No OTP verification pending. Please request a new OTP.");
    }

    try {
        const result = await confirmationResultHolder.confirm(otp);
        console.log("OTP verified successfully", result.user);
        
        // Get the ID token from Firebase
        const idToken = await result.user.getIdToken();
        
        // Store the token in localStorage
        localStorage.setItem('firebaseToken', idToken);
        
        // Optional: Store user UID as well
        localStorage.setItem('userUID', result.user.uid);
        
        console.log("Token stored in localStorage");
        
        // Clear the confirmation result after successful verification
        confirmationResultHolder = null;
        
        return result;
    } catch (error: any) {
        console.error("Error verifying OTP:", error);
        throw new Error(`Invalid OTP: ${error.message}`);
    }
};

// Helper function to get stored token
export const getStoredToken = (): string | null => {
    return localStorage.getItem('firebaseToken');
};

// Helper function to clear stored authentication data
export const clearStoredAuth = (): void => {
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('userUID');
};

// Clean up function to reset reCAPTCHA
export const resetRecaptcha = () => {
    if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
        (window as any).recaptchaVerifier = null;
    }
};

export { auth };