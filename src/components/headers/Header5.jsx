import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Nav2 from "./Nav2";
import MobileNav2 from "./MobileNav2";
import "flag-icons/css/flag-icons.min.css";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@/store/slices/authSlice";
import { getCountryWithCode } from "@/utils/webUserCountryUtils";
import { useGetIpCountryQuery } from "@/store/api/ipCountryApi";
import { useGetFilterOptionsQuery, useGetSearchSuggestionsQuery } from "@/store/api/webStockApi";
import JpClock from "./JpClock";
import SearchBar from "./SearchBar";

const menu = [
  { title: "Search Stocks", href: "/stock-list", links: [
    { text: "All Stock", href: "/stock-list" },
    { text: "Auction Stock", href: "/home-stock" },
    { text: "New Arrivals", href: "/new-arrivals" },
  ]},
  { title: "Auction", href: "/auction", links: [
    { text: "Auction Schedule", href: "/home-schedule" },
    { text: "Live Auction", href: "/live-home" },
    { text: "Auction Guide", href: "/home-guide" },
  ]},
  { title: "Car Information", href: "/car-information", links: [
    { text: "How To Buy", href: "/how-to-buy" },
    { text: "Shipping", href: "/shipping" },
    { text: "Inspection", href: "/inspection" },
  ]},
  { title: "For Dealers", href: "/for-dealers", links: [
    { text: "Dealer Login", href: "/dealer-login" },
    { text: "Dealer Registration", href: "/dealer-registration" },
    { text: "Dealer Support", href: "/dealer-support" },
  ]},
  { title: "Customer Reviews", href: "/customer-reviews" },
  { title: "Help", href: "/help", links: [
    { text: "FAQ", href: "/faq" },
    { text: "Contact", href: "/contact" },
    { text: "Support", href: "/support" },
  ]},
];

const currencies = [
  { label: "USD" }, { label: "JPY" }, { label: "LKR" }
];

const languages = [
  { label: "English", flag: "gb" }, { label: "Japanese", flag: "jp" },
  { label: "Sinhala", flag: "lk" }, { label: "Arabic", flag: "ae" },
  { label: "French", flag: "fr" }, { label: "German", flag: "de" },
  { label: "Spanish", flag: "es" }, { label: "Chinese", flag: "cn" },
  { label: "Korean", flag: "kr" }, { label: "Russian", flag: "ru" },
];

export default function Header5() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef(null);
  const searchMobRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const [activeSelect, setActiveSelect] = useState(null);
  const [countryQ, setCountryQ] = useState("");
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const savedCountry = useMemo(
    () => getCountryWithCode(countries, user?.country) ?? null,
    [countries, user?.country]
  );
  const { data: ipCountry } = useGetIpCountryQuery(undefined, {
    skip: !!savedCountry,
  });
  const userCountry = useMemo(
    () => savedCountry || ipCountry || null,
    [savedCountry, ipCountry]
  );

  const { data: filterOptions } = useGetFilterOptionsQuery();

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const { data: suggestionsResp, isFetching: isSuggestionsLoading } =
    useGetSearchSuggestionsQuery(debouncedQuery, {
      skip: debouncedQuery.length < 2,
    });

  const suggestions = suggestionsResp?.data ?? [];

  const suggestionText = (s) => (typeof s === "string" ? s : s?.label ?? s?.text ?? "");

  const navigateToSearch = (q) => {
    navigate(`/stock-list?search=${encodeURIComponent(q)}`);
  };

  const doSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) {
      setPopup({ title: "Empty Search", message: "Please enter what you're looking for." });
      setTimeout(() => setPopup(null), 2500);
      return;
    }
    setShowSuggestions(false);
    navigateToSearch(q);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    setActiveSuggestionIndex(-1);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim().length >= 2) setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleSuggestionClick = (s) => {
    const text = suggestionText(s);
    setSearchQuery(text);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    navigateToSearch(text);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      return;
    }
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeSuggestionIndex]);
    }
  };

  const findUserCountry = (list) => {
    if (!userCountry?.name && !userCountry?.code) return null;
    return (
      (userCountry?.code && list?.find((c) => c?.flag === userCountry?.code?.toLowerCase())) ||
      (userCountry?.name && list?.find((c) => c?.label?.toLowerCase() === userCountry?.name?.toLowerCase())) ||
      (userCountry?.name ? { label: userCountry?.name, flag: userCountry?.code?.toLowerCase() } : null)
    );
  };

  const [vals, setVals] = useState(() => ({
    delivery: { label: "Select Port", country: null, port: null },
    country: findUserCountry([]) || { label: "Sri Lanka", flag: "lk" },
    currency: { label: "USD" },
    language: { label: "English", flag: "gb" },
  }));

  const portsForSelectedCountry = useMemo(() => {
    const countryLabel = vals?.country?.label;
    const ports = filterOptions?.destinationPortsByCountry?.[countryLabel] ?? [];
    return ports?.map((p) => ({ label: p })) ?? [];
  }, [filterOptions, vals?.country?.label]);

  const selectMenus = useMemo(() => [
    {
      id: "delivery",
      label: "Delivery To",
      defaultValue: { label: "Select Port" },
      useLocationIcon: true,
      items: portsForSelectedCountry,
    },
    { id: "country", label: "Country", defaultValue: { label: "Sri Lanka", flag: "lk" }, items: countries, searchable: true },
    { id: "currency", label: "Currency", defaultValue: { label: "USD" }, items: currencies },
    { id: "language", label: "Language", defaultValue: { label: "English", flag: "gb" }, items: languages },
  ], [countries, portsForSelectedCountry]);

  useEffect(() => {
    let alive = true;
    fetch("/data/countries.json")
      .then((res) => res?.json())
      .then((data) => { if (alive) setCountries(data ?? []); })
      .catch((error) => console.error("Failed to load countries:", error));
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const countryLabel = vals?.country?.label;
    if (!countryLabel || !filterOptions) return;
    const ports = filterOptions?.destinationPortsByCountry?.[countryLabel] ?? [];
    setVals((v) => ({
      ...v,
      delivery: {
        label: ports[0] ?? "No ports available",
        country: countryLabel,
        port: ports[0] ?? null,
      },
    }));
  }, [vals?.country?.label, filterOptions]);

  useEffect(() => {
  if (!countries?.length) return;
  const stored = findUserCountry(countries);
    if (stored) {
      setVals((v) => ({ ...v, country: stored }));
    }
  }, [countries, userCountry]);

  useEffect(() => {
    const fn = (e) => {
      if (!e?.target?.closest(".hg-select")) { setActiveSelect(null); setCountryQ(""); }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const showPopup = (feature) => {
    setPopup({ title: "Coming Soon", message: `${feature} is currently under development.` });
    setTimeout(() => setPopup(null), 3500);
  };

  const selectValue = (id, opt) => {
    if (id === "delivery") {
      setVals((v) => ({
        ...v,
        delivery: { label: opt?.label, country: v?.country?.label, port: opt?.label },
      }));
      const next = new URLSearchParams(searchParams);
      next.set("country", vals?.country?.label);
      next.set("port", opt?.label);
      setSearchParams(next);
      setActiveSelect(null);
      setCountryQ("");
      return;
    }

    setVals((v) => ({ ...v, [id]: opt }));
    if (id === "country") {
      setVals((v) => ({
        ...v,
        country: opt,
        delivery: { ...v?.delivery, country: opt?.label, port: null, label: "Select Port" },
      }));
      const next = new URLSearchParams(searchParams);
      next.set("country", opt?.label);
      setSearchParams(next);
    }
    setActiveSelect(null);
    setCountryQ("");
  };

  const filteredItems = (cfg) => {
    if (!cfg?.searchable || !countryQ?.trim()) return cfg?.items;
    return cfg?.items?.filter((i) => i?.label?.toLowerCase()?.includes(countryQ?.toLowerCase()));
  };
  const renderFlag = (flag, sm) => (
    <span className={`hg-flag${sm ? " sm" : ""}`}><span className={`fi fi-${flag}`} /></span>
  );

  const renderIcon = (opt, cfg, sm) => {
    if (opt?.flag) return renderFlag(opt?.flag, sm);
    if (cfg?.useLocationIcon) return (
      <span className={`hg-sel-icon${sm ? " sm" : ""}`}>
        <img src="/assets/icons/location-icon.svg" alt=""
          style={{ width: sm ? 11 : 13, height: sm ? 11 : 13, filter: "invert(15%) sepia(90%) saturate(700%) hue-rotate(320deg)" }} />
      </span>
    );
    return null;
  };

  const SelectDropdown = ({ cfg, inDrawer = false }) => {
    const val = vals?.[cfg?.id];
    const isOpen = activeSelect === cfg?.id;
    const list = filteredItems(cfg);
    return (
      <div className={`hg-select${inDrawer ? " hg-sel-drawer" : ""}`} data-id={cfg?.id}>
        <button
          type="button"
          className={`hg-sel-btn${isOpen ? " open" : ""}`}
          onClick={(e) => { e?.stopPropagation(); setActiveSelect(isOpen ? null : cfg?.id); setCountryQ(""); }}
        >
          {renderIcon(val, cfg)}
          <span>
            <small>{cfg?.label}</small>
            <strong>{val?.label}</strong>
          </span>
          <i className="fa fa-angle-down hg-sel-arrow" />
        </button>

        {isOpen && (
          <div className="hg-sel-menu">
            {cfg?.searchable && (
              <div className="hg-sel-search">
                <i className="fa fa-search" />
                <input type="text" placeholder="Search..." value={countryQ}
                  onChange={(e) => setCountryQ(e?.target?.value)} autoFocus />
              </div>
            )}
            <ul className="hg-sel-list">
              {list?.length === 0 && <li className="hg-sel-empty">No results</li>}
              {list?.map((opt) => (
                <li key={opt?.label}>
                  <button type="button" className={val?.label === opt?.label ? "active" : ""}
                    onClick={() => selectValue(cfg?.id, opt)}>
                    {renderIcon(opt, cfg, true)}
                    <span>{opt?.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const Avatar = ({ size = "md" }) => (
    <div className={`hg-avatar-wrap hg-avatar-wrap-${size}`}>
      {user ? (
        <Link to="/profile" className={`hg-avatar hg-avatar-${size}`} aria-label="Profile">
          <img src="/assets/icons/default-user-avatar.svg" alt="Profile" />
          <b>5</b>
        </Link>
      ) : (
        <Link to="/login" className="hg-signin-btn">
          Sign In
        </Link>
      )}
      {user && (
        <div className="hg-avatar-menu">
          <Link to="/profile" className="hg-avatar-menu-item">My Profile</Link>
          <button
            type="button"
            className="hg-avatar-menu-item"
            onClick={() => dispatch(signOut())}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className="hg">
        <div className="hg-promo">
          <div className="hg-container">
            <div className="hg-promo-row">
              <JpClock />
              <Link to="/" className="hg-promo-brand">
                <img src="/assets/icons/kan-de-auction.svg" alt="KAN-DE AUCTION" />
                <span>NOW AVAILABLE<br />⠀⠀OVER 100,000+ VEHICLES</span>
              </Link>
              <Link to="/contact" className="hg-promo-cta">
                Click for more details
                <img src="/assets/icons/arrow-right-circle.svg" alt="" width={16} height={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="hg-lower">
          <div className="hg-container">
            <div className="hg-row">
              <div className="hg-logo">
                <Link to="/">
                  <img src="/assets/images/logo/logo2.png" alt="KAN-DE" width={78} height={38} />
                </Link>
              </div>

              <div className="hg-search-wrap">
                <SearchBar
                  btnRef={searchRef}
                  onSubmit={doSearch}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  suggestions={suggestions}
                  showSuggestions={showSuggestions}
                  activeSuggestionIndex={activeSuggestionIndex}
                  onSuggestionClick={handleSuggestionClick}
                  onSuggestionHover={setActiveSuggestionIndex}
                  isSuggestionsLoading={isSuggestionsLoading}
                  onMicClick={() => showPopup("Voice search")}
                  onCamClick={() => showPopup("Camera search")}
                />
              </div>

              <div className="hg-selectors">
                {selectMenus?.map((cfg) => <SelectDropdown key={cfg?.id} cfg={cfg} />)}
                <Avatar />
              </div>

              <button
                type="button"
                className={`hg-toggler${drawerOpen ? " is-open" : ""}`}
                onClick={() => setDrawerOpen((v) => !v)}
                aria-label="Menu"
              >
                <span />
              </button>
            </div>
          </div>

          <div className="hg-nav-wrap">
            <nav className="hg-nav">
              <ul className="hg-nav-list">
                <Nav2 menuItems={menu} />
              </ul>
            </nav>
          </div>
        </div>

        <div className={`hg-drawer${drawerOpen ? " is-open" : ""}`} aria-hidden={!drawerOpen}>
          <div className="hg-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="hg-panel">
            <div className="hg-panel-head">
              <Link to="/" onClick={() => setDrawerOpen(false)}>
                <img src="/assets/images/logo/logo2.png" alt="KAN-DE" width={60} height={30} />
              </Link>
              <div className="hg-panel-head-right">
                <Avatar size="sm" />
              </div>
            </div>

            <div className="hg-panel-search">
              <SearchBar
                btnRef={searchMobRef}
                onSubmit={doSearch}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                activeSuggestionIndex={activeSuggestionIndex}
                onSuggestionClick={handleSuggestionClick}
                onSuggestionHover={setActiveSuggestionIndex}
                isSuggestionsLoading={isSuggestionsLoading}
                onMicClick={() => showPopup("Voice search")}
                onCamClick={() => showPopup("Camera search")}
              />
            </div>

            <div className="hg-panel-selects">
              {selectMenus?.map((cfg) => <SelectDropdown key={cfg?.id} cfg={cfg} inDrawer />)}
            </div>

            <div className="hg-panel-nav">
              <MobileNav2 menuItems={menu} />
            </div>
          </div>
        </div>
      </header>

      {popup && (
        <div className="hg-popup" onClick={() => setPopup(null)}>
          <div className="hg-popup-box" onClick={(e) => e?.stopPropagation()}>
            <h4>{popup?.title}</h4>
            <p>{popup?.message}</p>
            <button type="button" onClick={() => setPopup(null)}>Got it</button>
          </div>
        </div>
      )}
    </>
  );
}