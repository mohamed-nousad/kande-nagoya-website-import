const IP_GEOLOCATION_URL = "https://ipapi.co/json/";

export const fetchCountryFromIp = async () => {
  try {
    const response = await fetch(IP_GEOLOCATION_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.country_name || !data?.country_code) return null;

    return {
      name: data.country_name,
      code: data.country_code,
    };
  } catch (error) {
    console.error("Failed to resolve country from IP:", error);
    return null;
  }
};