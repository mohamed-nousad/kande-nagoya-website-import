import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetFilterOptionsQuery } from "@/store/api/webStockApi";
import { useGetIpCountryQuery } from "@/store/api/ipCountryApi";
import { getCountryWithCode } from "@/utils/webUserCountryUtils";
import { DEFAULT_DEST_COUNTRY } from "@/constants";

const OPTION_ROWS = [
  { key: "insurance", label: "Insurance" },
  { key: "inspection", label: "Inspection" },
  { key: "certificate", label: "Certificate" },
  { key: "kandeWarranty", label: "Kan-de Warranty" },
];

const CALCULATOR_PARAM_KEYS = [
  "country",
  "port",
  "shippingMethod",
  "insurance",
  "inspection",
  "certificate",
  "kandeWarranty",
];

const DEFAULT_STATE = {
  country: DEFAULT_DEST_COUNTRY,
  port: "",
  shippingMethod: "roro",
  insurance: "No",
  inspection: "No",
  certificate: "No",
  kandeWarranty: "No",
};

const PriceCalculator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: options, isLoading: optionsLoading } = useGetFilterOptionsQuery();
  const user = useSelector((state) => state?.auth?.user);

  const savedCountry = useMemo(
    () =>
      getCountryWithCode(
        options?.destinationCountry?.map((c) => ({ label: c })) ?? [],
        user?.country
      ) ?? null,
    [options, user?.country]
  );
  const { data: ipCountry } = useGetIpCountryQuery(undefined, {
    skip: !!savedCountry,
  });
  const userCountry = useMemo(
    () => savedCountry || ipCountry || null,
    [savedCountry, ipCountry]
  );

  const [country, setCountry] = useState(
    searchParams.get("country") || DEFAULT_STATE.country
  );
  const [port, setPort] = useState(searchParams.get("port") || DEFAULT_STATE.port);
  const [shippingMethod, setShippingMethod] = useState(
    searchParams.get("shippingMethod") || DEFAULT_STATE.shippingMethod
  );
  const [insurance, setInsurance] = useState(
    searchParams.get("insurance") || DEFAULT_STATE.insurance
  );
  const [inspection, setInspection] = useState(
    searchParams.get("inspection") || DEFAULT_STATE.inspection
  );
  const [certificate, setCertificate] = useState(
    searchParams.get("certificate") || DEFAULT_STATE.certificate
  );
  const [kandeWarranty, setKandeWarranty] = useState(
    searchParams.get("kandeWarranty") || DEFAULT_STATE.kandeWarranty
  );

  const countryOptions = options?.destinationCountry ?? [];

  const portOptions = useMemo(() => {
    if (!country || !options?.destinationPortsByCountry) return [];
    return options.destinationPortsByCountry[country] ?? [];
  }, [country, options]);

  useEffect(() => {
    if (!options) return;
    const urlCountry = searchParams.get("country");

    if (urlCountry) {
      const matched = countryOptions.find(
        (item) => item.toLowerCase() === urlCountry.toLowerCase()
      );
      if (matched && matched !== country) {
        setCountry(matched);
      }
      return;
    }

    const preferred = userCountry?.name || DEFAULT_DEST_COUNTRY;
    const matched = countryOptions.find(
      (item) => item.toLowerCase() === preferred.toLowerCase()
    );
    if (matched && matched !== country) {
      setCountry(matched);
    }
  }, [options, searchParams.get("country"), userCountry]);
  
  useEffect(() => {
    if (!options) return;
    const urlPort = searchParams.get("port");

    if (urlPort) {
      const matched = portOptions.find(
        (item) => item.toLowerCase() === urlPort.toLowerCase()
      );
      if (matched && matched !== port) {
        setPort(matched);
      } else if (!matched && portOptions.length > 0) {
        setPort(portOptions[0]);
      }
      return;
    }

    const portStillValid = portOptions.some(
      (item) => item.toLowerCase() === port?.toLowerCase()
    );
    if ((!port || !portStillValid) && portOptions.length > 0) {
      setPort(portOptions[0]);
    }
  }, [options, portOptions, searchParams.get("port")]);

  const handleCountryChange = (e) => {
    const nextCountry = e.target.value;
    setCountry(nextCountry);
    const nextPorts = options?.destinationPortsByCountry?.[nextCountry] ?? [];
    setPort(nextPorts[0] || "");
  };

  const handleCalculate = () => {
    const params = {
      country,
      port,
      shippingMethod,
      insurance,
      inspection,
      certificate,
      kandeWarranty,
    };

    const next = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) next.set(key, value);
    });
    next.set("page", "1");
    setSearchParams(next);
  };

  const handleReset = () => {
    const defaultCountry =
      countryOptions.find(
        (item) => item.toLowerCase() === (userCountry?.name || DEFAULT_DEST_COUNTRY).toLowerCase()
      ) || DEFAULT_DEST_COUNTRY;
    const defaultPorts = options?.destinationPortsByCountry?.[defaultCountry] ?? [];

    setCountry(defaultCountry);
    setPort(defaultPorts[0] || "");
    setShippingMethod(DEFAULT_STATE.shippingMethod);
    setInsurance(DEFAULT_STATE.insurance);
    setInspection(DEFAULT_STATE.inspection);
    setCertificate(DEFAULT_STATE.certificate);
    setKandeWarranty(DEFAULT_STATE.kandeWarranty);

    const next = new URLSearchParams(searchParams);
    CALCULATOR_PARAM_KEYS.forEach((key) => next.delete(key));
    next.set("page", "1");
    setSearchParams(next);
  };

  const optionState = {
    insurance: [insurance, setInsurance],
    inspection: [inspection, setInspection],
    certificate: [certificate, setCertificate],
    kandeWarranty: [kandeWarranty, setKandeWarranty],
  };

  return (
    <section className="price-calculator-section">
      <div className="price-calculator-header">
        <div className="price-calculator-title-wrap">
          <img
            src="/assets/images/stock-list/cal.png"
            alt="Calculator"
            className="price-calculator-icon"
          />
          <h3 className="price-calculator-title">Price Calculator</h3>
        </div>
        <p className="price-calculator-subtitle">
          Please select country and port
        </p>
      </div>

      <div className="price-calculator-content">
        <div className="price-calculator-left">
          <div className="price-calculator-selects">
            <select
              value={country}
              onChange={handleCountryChange}
              disabled={optionsLoading}
            >
              <option value="">Select Country</option>
              {countryOptions?.map((item) => (
                <option key={item} value={item}>
                  {item?.toUpperCase()}
                </option>
              ))}
            </select>

            <select
              value={port}
              onChange={(e) => setPort(e.target.value)}
              disabled={optionsLoading || !country}
            >
              <option value="">Select Port</option>
              {portOptions?.map((item) => (
                <option key={item} value={item}>
                  {item?.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="shipping-method">
            <span>Shipping Method</span>

            <label className="custom-radio">
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === "roro"}
                onChange={() => setShippingMethod("roro")}
              />
              <span className="radio-circle" />
              RORO
            </label>

            <label className="custom-radio">
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === "container"}
                onChange={() => setShippingMethod("container")}
              />
              <span className="radio-circle" />
              Container
            </label>
          </div>
        </div>

        <div className="price-calculator-center">
          {OPTION_ROWS.map(({ key, label }) => {
            const [value, setValue] = optionState[key];
            return (
              <div key={key} className="calculator-option-row">
                <span>{label}</span>
                <label className="custom-radio">
                  <input
                    type="radio"
                    name={`${key}-option`}
                    checked={value === "Yes"}
                    onChange={() => setValue("Yes")}
                  />
                  <span className="radio-circle" />
                  Yes
                </label>

                <label className="custom-radio">
                  <input
                    type="radio"
                    name={`${key}-option`}
                    checked={value === "No"}
                    onChange={() => setValue("No")}
                  />
                  <span className="radio-circle" />
                  No
                </label>
              </div>
            );
          })}
        </div>

        <div className="price-calculator-actions">
          <button
            type="button"
            className="calculate-btn"
            onClick={handleCalculate}
            disabled={!country || !port}
          >
            Calculate
          </button>

          <button
            type="button"
            className="calculator-reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;