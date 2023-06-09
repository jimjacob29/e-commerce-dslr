import { projectIcon } from '../../assets/Icons';
interface Props {
  handleFilterClick: (value: boolean) => void;
  brandSelected: boolean;
  categorySelected: boolean;
  brands: string[];
  handleBrandSelection: (e: any) => void;
  selectedBrands: string[];
  category: string[];
  selectedCategory: string[];
  handleCategorySelection: (e: any) => void;
}
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
}: Props) => {
  return (
    <>
      <div className='filterButtonContainer'>
        <button
          onClick={() => handleFilterClick(true)}
          className={`filterButton ${brandSelected ? 'buttonSelected' : ''}`}
        >
          Brand{' '}
          <img src={brandSelected ? projectIcon.arrowUp : projectIcon.arrowDown} height='10px' width='auto' alt='v' />
        </button>
        <button
          onClick={() => handleFilterClick(false)}
          className={`filterButton ${categorySelected ? 'buttonSelected' : ''}`}
        >
          Categories{' '}
          <img
            src={categorySelected ? projectIcon.arrowUp : projectIcon.arrowDown}
            height='10px'
            width='auto'
            alt='v'
          />
        </button>
      </div>
      <div className='filterSelectionContainer'>
        {brandSelected &&
          (brands || []).map((brand: string, index: number) => (
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
          (category || []).map((category: string, index: number) => (
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
