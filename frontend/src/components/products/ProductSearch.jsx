import { useMemo, useState } from "react";

export function ProductSearch({ products, query, onQueryChange, placeholder = "Try books, earbuds, tote..." }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];

    return products
      .filter((product) => product.title.toLowerCase().includes(normalizedQuery))
      .slice(0, 5);
  }, [normalizedQuery, products]);

  function selectSuggestion(title) {
    onQueryChange(title);
    setShowSuggestions(false);
  }

  return (
    <label className="field autocomplete-search">
      <span>Search products</span>
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onBlur={() => window.setTimeout(() => setShowSuggestions(false), 140)}
        onChange={(event) => {
          onQueryChange(event.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 ? (
        <div className="suggestions-dropdown">
          {suggestions.map((product) => (
            <button
              className="suggestion-item"
              key={product._id}
              type="button"
              onMouseDown={() => selectSuggestion(product.title)}
            >
              <strong>{product.title}</strong>
              <span>
                {product.category} by {product.sellerName}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </label>
  );
}
