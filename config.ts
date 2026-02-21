
export const APP_CONFIG = {
  // The WhatsApp number for the admin receiving reports
  ADMIN_PHONE: "966599597645",

  // Default city suffix for map searches
  DEFAULT_CITY: "Chennai",

  // Base URLs
  WHATSAPP_BASE_URL: "https://wa.me",
  MAPS_BASE_URL: "https://www.google.com/maps/search/?api=1&query=",

  // Message Templates
  MESSAGES: {
    REPORT_TEMPLATE: (name: string, area: string) =>
      `Assalamu Alaikum, I want to report an issue or update details for ${name}, ${area}.`,

    SHARE_TEMPLATE: (name: string, area: string, timing: string) =>
      `*Sehri Finder 2026 - Chennai*\n\nCheck out this Sehri spot:\n*${name}*\n📍 ${area}\n🕒 ${timing}\n\nView details: https://sehrifinder.com`,

    SUBMIT_TEMPLATE: (data: any) =>
      `Assalamu Alaikum, I want to submit a new Sehri spot:\n\n*Name:* ${data.name}\n*City:* ${data.city}\n*Area:* ${data.area}\n*Type:* ${data.type}\n*Food:* ${data.foodType}\n*Timing:* ${data.timing}\n*Location:* ${data.googleMapsLink || 'N/A'}\n\nAdditional Notes: ${data.notes || 'N/A'}`,

    BOOKING_TEMPLATE: (name: string, area: string) =>
      `Salam, I found *${name}* (${area}) on Sehri Finder. Is sehri available?`
  }
};
