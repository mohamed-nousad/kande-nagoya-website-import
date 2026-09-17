export const getCountryWithCode = (countries, country) => {
  if (!countries?.length === 0 || !country) return null;

  const normalize = (value) =>
    value.trim().toLowerCase().replace(/\s+/g, " ");

  const matchedCountry = countries.find(
    (item) => normalize(item?.label) === normalize(country)
  );

  if (!matchedCountry) return null;
  return {
    name: country,
    code: matchedCountry.flag?.toUpperCase(),
  };
};