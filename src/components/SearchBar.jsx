import { useState } from "react";
import { FaSearch } from "react-icons/fa";
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <form
      className="search-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(searchTerm.trim());
      }}
    >
      <FaSearch aria-hidden="true" />
      <input
        type="search"
        placeholder="ابحث عن طبيعة، سفر، فن…"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        aria-label="البحث عن صور"
      />
      <button type="submit">بحث</button>
    </form>
  );
}
export default SearchBar;
