/**
 * Get the appropriate alt text based on the current language
 * @param {Object} data - Object containing english_alt and arabic_alt fields
 * @param {boolean} isRTL - Whether the current theme direction is RTL (Arabic)
 * @param {string} fallback - Fallback text if neither alt field is available
 * @returns {string} The appropriate alt text
 */
export const getAltText = (data, isRTL, fallback = 'Image') => {
    console.log("getAltText data:", data, "isRTL:", isRTL);
  if (!data) return fallback;
  
  if (isRTL && data.arabic_alt) {
    return data.arabic_alt;
  }
  
  if (!isRTL && data.english_alt) {
    return data.english_alt;
  }
  
  // Fallback to any available alt text
  return data.arabic_alt || data.english_alt || fallback;
};
