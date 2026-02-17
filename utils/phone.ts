/**
 * Checks if a given phone number is likely a mobile number.
 * 
 * Logic:
 * - Removes non-digit characters.
 * - Checks if it starts with '044', '040', '022' (Major City Landlines) or is less than 10 digits.
 * - Assumes 10-digit numbers starting with 6, 7, 8, 9 are mobile.
 * 
 * @param phone The phone string to check
 * @returns true if mobile, false if landline/unknown
 */
export const isMobileNumber = (phone: string): boolean => {
    if (!phone) return false;

    // Clean the number
    const cleanPhone = phone.replace(/\D/g, '');

    // Check for common landline codes (Chennai, Hyderabad, Mumbai, Bangalore)
    // 044 - Chennai, 040 - Hyderabad, 022 - Mumbai, 080 - Bangalore
    if (cleanPhone.startsWith('044') || cleanPhone.startsWith('040') || cleanPhone.startsWith('022') || cleanPhone.startsWith('080')) {
        return false;
    }

    // Check length and starting digit (India Mobile: 10 digits, starts with 6-9)
    if (cleanPhone.length === 10 && /^[6-9]/.test(cleanPhone)) {
        return true;
    }

    // Attempt to handle +91 format
    if (cleanPhone.length === 12 && cleanPhone.startsWith('91') && /^[6-9]/.test(cleanPhone.substring(2))) {
        return true;
    }

    // If it's a short number (likely landline without code or shortcode), return false
    if (cleanPhone.length < 10) {
        return false;
    }

    // Default to true if ambiguous but not explicitly a known landline format, 
    // BUT for the purpose of "Chat on WhatsApp", we enforce strict mobile validation.
    // If we aren't sure it's a mobile number, return false to fallback to "Call" button.
    return false;
};
