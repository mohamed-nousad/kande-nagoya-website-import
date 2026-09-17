import React from "react";
import { Link } from "react-router-dom";

const suggestionText = (s) => (typeof s === "string" ? s : s?.label ?? s?.text ?? "");

const SearchBar = ({
  btnRef,
  onSubmit,
  compact = false,
  value = "",
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  suggestions = [],
  showSuggestions = false,
  activeSuggestionIndex = -1,
  onSuggestionClick,
  onSuggestionHover,
  isSuggestionsLoading = false,
  onMicClick,
  onCamClick,
}) => (
  <div className={`hg-search-wrap-inner${compact ? " hg-search-compact-wrap" : ""}`}>
    <form
      className={`hg-search${compact ? " hg-search-compact" : ""}`}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <Link to="/add-listing" className="hg-add-btn" aria-label="Add listing">
        <img src="/assets/icons/plus-circle-solid.svg" alt="Profile" />
      </Link>
      <input
        ref={btnRef}
        type="text"
        className="hg-search-input"
        placeholder="Search cars..."
        aria-label="Search"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        role="combobox"
        aria-expanded={showSuggestions}
        aria-autocomplete="list"
        aria-controls="hg-suggestions-list"
      />
      <div className="hg-tools">
        <button type="button" className="hg-tool hg-mic" onClick={onMicClick} aria-label="Mic">
          <span />
        </button>
        <button type="button" className="hg-tool hg-cam" onClick={onCamClick} aria-label="Camera">
          <span />
        </button>
      </div>
      <button type="submit" className="hg-search-btn">
        <i className="fa fa-search" />
        <span>Search Cars</span>
      </button>
    </form>

    {showSuggestions && (
      <ul id="hg-suggestions-list" className="hg-suggestions" role="listbox">
        {isSuggestionsLoading && <li className="hg-suggestion-loading">Searching…</li>}
        {!isSuggestionsLoading && suggestions.length === 0 && (
          <li className="hg-suggestion-empty">No matches found</li>
        )}
        {!isSuggestionsLoading &&
          suggestions.map((s, i) => (
            <li
              key={s?.id ?? suggestionText(s) ?? i}
              role="option"
              aria-selected={i === activeSuggestionIndex}
              className={`hg-suggestion-item${i === activeSuggestionIndex ? " active" : ""}`}
              onMouseDown={(e) => e.preventDefault()} 
              onClick={() => onSuggestionClick?.(s)}
              onMouseEnter={() => onSuggestionHover?.(i)}
            >
              <i className="fa fa-search hg-suggestion-icon" />
              <span>{suggestionText(s)}</span>
            </li>
          ))}
      </ul>
    )}
  </div>
);

export default SearchBar;