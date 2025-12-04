export const getGeoLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export async function getAddressInformation({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  try {
    const response = await fetch(
      `/api/geocode?lat=${latitude}&lon=${longitude}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching address:", errorData);
      throw new Error("Couldn't get your address information");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Address fetch error:", error);
    throw new Error("Couldn't get your address information");
  }
}
