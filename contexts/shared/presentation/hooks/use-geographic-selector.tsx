import { useEffect, useState } from 'react';

interface Country {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
}

interface State {
  id: number;
  name: string;
  country_id: number;
}

interface City {
  id: number;
  name: string;
  state_id: number;
}

export const useGeographicSelector = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Load countries on mount
  useEffect(() => {
    setLoadingCountries(true);
    fetch('/data/geo/countries.json')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoadingCountries(false);
      });
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      setSelectedState(null);
      return;
    }
    setLoadingStates(true);
    fetch('/data/geo/states.json')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (s: State) => s.country_id === selectedCountry.id,
        );
        setStates(filtered);
        setSelectedState(null);
        setLoadingStates(false);
      });
  }, [selectedCountry]);

  // Load cities when state changes
  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity(null);
      return;
    }
    setLoadingCities(true);
    fetch('/data/geo/cities.json')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (c: City) => c.state_id === selectedState.id,
        );
        setCities(filtered);
        setSelectedCity(null);
        setLoadingCities(false);
      });
  }, [selectedState]);

  return {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    loadingCountries,
    loadingStates,
    loadingCities,
  };
};
