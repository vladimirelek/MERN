import "./Filters.scss";

const Filters = ({ filter, setFilter, inputRef }) => {
  const onFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="filters">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pretraži proizvode..."
          ref={inputRef}
          name="search"
          onChange={onFilterChange}
          value={filter.search}
        />
      </div>
      <h4>KATEGORIJA</h4>
      <select
        name="category"
        id="category"
        onChange={onFilterChange}
        defaultValue={filter.category}
      >
        <option value="">Svi artikli</option>
        <option value="Bicikl">Bicikl</option>
        <option value="Steper">Steper</option>
        <option value="Traka">Traka</option>
      </select>
      <h4>OD</h4>
      <select
        name="minPrice"
        onChange={onFilterChange}
        defaultValue={filter.minPrice}
      >
        <option value=""></option>
        <option value="0">0 €</option>
        <option value="2000">2000 €</option>
        <option value="5000">5000 €</option>
        <option value="10000">10000 €</option>
      </select>
      <h4>DO</h4>

      <select
        name="maxPrice"
        id="maxPrice"
        onChange={onFilterChange}
        defaultValue={filter.maxPrice}
      >
        <option value=""></option>
        <option value="0">0 €</option>
        <option value="2000">2000 €</option>
        <option value="5000">5000 €</option>
        <option value="10000">10000 €</option>
      </select>
    </div>
  );
};
export default Filters;
