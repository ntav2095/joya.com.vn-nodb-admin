import { useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { fetchVisasAvailableCountries } from "../../../services/apis";
const COUNTRIES = new Map([
  ["europe", "Châu Âu"],
  ["africa", "Châu Phi"],
  ["asia", "Châu Á"],
  ["america", "Châu Mỹ"],
  ["oceania", "Châu Úc"],
]);

function useFetchVisaCountries() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();

  useEffect(() => {
    sendRequest(fetchVisasAvailableCountries());
  }, []);

  const continents = data
    ? Object.entries(data.data)
        .map(([key, value]) => {
          if (value.length > 0) {
            return {
              code: key,
              name: COUNTRIES.get(key),
            };
          }
          return null;
        })
        .filter((item) => item)
    : null;

  const countries = data
    ? Object.entries(data.data).reduce(
        (prev, [key, value]) => [...prev, ...value],
        []
      )
    : null;

  const getCountries = (continent) => {
    if (!continent) {
      return "";
    }
    return data ? data.data[continent].map((item) => item.code) : null;
  };

  const getCountryName = (code) => {
    return countries ? countries.find((item) => item.code === code).name : "";
  };

  return {
    isLoading,
    countries,
    getCountries,
    getCountryName,
    continents,
    error,
  };
}

export default useFetchVisaCountries;
