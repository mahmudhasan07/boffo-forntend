declare global {
  interface Window {
    fbq: (event: string, action: string, options?: Record<string, string | number | boolean>) => void;
  }
}

export const FB_PIXEL_ID = "1205951344374498"; // Replace with your actual Pixel ID

// Function to track page views
export const pageview = () => {
  window.fbq("track", "PageView");
};

// Function to track custom events
export const event = (name: string, options = {}) => {
  window.fbq("track", name, options);
};