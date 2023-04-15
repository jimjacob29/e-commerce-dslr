const MobileFilterModal = ({
  handleFilterClick,
  brandSelected,
  categorySelected,
  brands,
  handleBrandSelection,
  selectedBrands,
  category,
  selectedCategory,
  handleCategorySelection
}: any) => {
  return (
    <>
      <div className='filterButtonContainer'>
        <button
          onClick={() => handleFilterClick(true)}
          className={`filterButton ${brandSelected ? 'buttonSelected' : ''}`}
        >
          Brand
        </button>
        <button
          onClick={() => handleFilterClick(false)}
          className={`filterButton ${categorySelected ? 'buttonSelected' : ''}`}
        >
          Categories
        </button>
      </div>
      <div className='filterSelectionContainer'>
        {brandSelected &&
          (brands || []).map((brand: any, index: number) => (
            <div key={brand} className='mobileSortData'>
              <input
                type='checkbox'
                value={brand}
                name='brand'
                key={index}
                onChange={handleBrandSelection}
                checked={selectedBrands.includes(brand)}
              />
              <span>{brand}</span>
            </div>
          ))}
        {categorySelected &&
          (category || []).map((category: any, index: number) => (
            <div key={category}>
              <input
                type='checkbox'
                value={category}
                name='category'
                key={index}
                onChange={handleCategorySelection}
                checked={selectedCategory.includes(category)}
              />
              <span>{category}</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default MobileFilterModal;
