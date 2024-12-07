interface FilterProps {
  onFilter: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

const SidebarFilter = ({ onFilter }: FilterProps) => {
  const colors = ["Red", "Blue", "Green"];
  const genders = ["Men", "Women"];
  const priceRange = ["0-250", "251-450", "451+"];
  const types = ["Polo", "Hoodie", "Basic"];
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    onFilter((prevFilters) => {
      const currentFilter = prevFilters[name] || [];
      const updatedFilter = checked
        ? [...currentFilter, value]
        : currentFilter.filter((item) => item !== value);
      return { ...prevFilters, [name]: updatedFilter };
    });
  };

  return (
    <aside className="p-4 ">
      <div className="mb-4">
        <h4 className="font-semibold text-black">Color</h4>
        {colors.map((color) => (
          <label key={color} className="block text-black">
            <input
              type="checkbox"
              name="color"
              value={color}
              className="mr-1"
              onChange={handleFilterChange}
            />
            {color}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-black">Gender</h4>
        {genders.map((gender) => (
          <label key={gender} className="block text-black">
            <input
              type="checkbox"
              name="gender"
              value={gender}
              className="mr-1"
              onChange={handleFilterChange}
            />
            {gender}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-black">Price</h4>
        {priceRange.map((price) => (
          <label key={price} className="block text-black">
            <input
              type="checkbox"
              name="price"
              value={price}
              className="mr-1"
              onChange={handleFilterChange}
            />
            {price}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-black">Type</h4>
        {types.map((type) => (
          <label key={type} className="block text-black">
            <input
              type="checkbox"
              name="type"
              value={type}
              className="mr-1"
              onChange={handleFilterChange}
            />
            {type}
          </label>
        ))}
      </div>
    </aside>
  );
};

export default SidebarFilter;
