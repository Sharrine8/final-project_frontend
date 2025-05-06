import "./SearchForm.css";

function SearchForm({ searchTerm, setSearchTerm, handleSearch }) {
  const onChange = (e) => {
    let term = e.target.value;
    setSearchTerm(term);
  };
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSearch}>
        <input
          className="search-form__input"
          placeholder="Enter topic"
          type="text"
          value={searchTerm}
          onChange={onChange}
        />
        <button className="search-form__btn">Search</button>
      </form>
    </section>
  );
}

export default SearchForm;
