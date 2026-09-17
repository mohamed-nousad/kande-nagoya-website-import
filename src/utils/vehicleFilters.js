 import { useState, useCallback, useMemo } from "react";
import { useGetFilterOptionsQuery } from "@/store/api/webStockApi";
import { DEFAULT_VEHICLE_FILTERS, FALLBACK_OPTIONS } from "@/constants/vehicleFilters";

export const buildVehicleQueryParams = (filters = {}) => {
  const params = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) return;
    if (typeof value === "boolean") {
      if (value) params[key] = "true";
      return;
    }
    params[key] = String(value);
  });
  return params;
};

export const buildQueryString = (filters = {}) => {
  const usp = new URLSearchParams(buildVehicleQueryParams(filters));
  return usp.toString();
};

export const parseSearchParamsToFilters = (searchParams) => {
  const filters = { ...DEFAULT_VEHICLE_FILTERS };
  for (const key of Object.keys(filters)) {
    if (!searchParams.has(key)) continue;
    const raw = searchParams.get(key);
    filters[key] = typeof DEFAULT_VEHICLE_FILTERS[key] === "boolean" ? raw === "true" : raw;
  }
  return filters;
};

export const useVehicleFilterState = (initialFilters) => {
  const [filters, setFilters] = useState(initialFilters ?? DEFAULT_VEHICLE_FILTERS);
  const { data: options, isLoading: optionsLoading } = useGetFilterOptionsQuery();

  const setField = useCallback((field, value) => {
    setFilters((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "make") next.model = ""; 
      return next;
    });
  }, []);

  const toggleField = useCallback((field) => {
    setFilters((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const resetFilters = useCallback(() => setFilters(DEFAULT_VEHICLE_FILTERS), []);

  const makeOptions = (options?.make ?? []).map((m) => m.name);

  const modelOptions = useMemo(() => {
    if (!filters.make || !options?.modelsByMake) return [];
    return options.modelsByMake[filters.make] ?? [];
  }, [filters.make, options]);

  const bodyTypeOptions = options?.bodyType?.length
  ? options.bodyType.map((b) => b.name)
  : FALLBACK_OPTIONS.bodyType;
  
  const steeringOptions = options?.steering?.length ? options.steering.map(s => s.name) : FALLBACK_OPTIONS.steering;
  const transmissionOptions = options?.transmission?.length ? options.transmission.map(t => t.name) : FALLBACK_OPTIONS.transmission;
  const fuelOptions = options?.fuel?.length ? options.fuel.map(f => f.name) : FALLBACK_OPTIONS.fuel;
  
  const colorOptions = options?.colour?.length ? options.colour : FALLBACK_OPTIONS.colour;

  return {
    filters,
    setFilters,
    setField,
    toggleField,
    resetFilters,
    optionsLoading,
    makeOptions,
    modelOptions,
    bodyTypeOptions,
    steeringOptions,
    transmissionOptions,
    fuelOptions,
    colorOptions,
  };
};