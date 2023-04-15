import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { projectIcon } from '../../assets/Icons';
import MobileFilterModal from '../../components/mobileFilterModal';
import MobileSortModal from '../../components/mobileSortModal';
import ProductCard from '../../components/productCard';
import { productData } from '../../utils/const/productData';
import { MainContext } from '../../utils/contextData';
import { MainContextType, ProductType } from '../../utils/propertyType';
import './index.css';
const Home = () => {
  const [data, setData] = useState<ProductType[]>(productData);

  const [brandSelected, setBrandSelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[] | []>([]);
  const [category, setCategory] = useState<string[] | []>([]);
  const [mobileSortButton, setMobileSortButton] = useState(false);
  const [mobileFilterButton, setMobileFilterButton] = useState(false);
  const history = useHistory();
  const { selectedBrands, setSelectedBrands, selectedCategory, setSelectedCategory, sortValue, setSortValue }: MainContextType =
    useContext(MainContext);

  const getSortFunction = (tempSortValue: string) => {
    switch (tempSortValue) {
      case `Price(low to high)`:
        return (a: ProductType, b: ProductType) => a.price - b.price;
      case 'Price(high to low)':
        return (a: ProductType, b: ProductType) => b.price - a.price;
      case 'Ratings(high to low)':
        return (a: ProductType, b: ProductType) => b.ratings - a.ratings;
    }
  };
  const handleData = (
    tempSelectedBrand = selectedBrands,
    tempSelectedCategory = selectedCategory,
    tempSortValue = sortValue
  ) => {
    let tempData = productData;
    if (tempSelectedBrand.length > 0) {
      tempData = tempData.filter((item: ProductType) => tempSelectedBrand.includes(item.brand));
    }
    if (tempSelectedCategory.length > 0) {
      tempData = tempData.filter((item: ProductType) => tempSelectedCategory.includes(item.category));
    }
    if (tempSortValue) {
      const sortFunction = getSortFunction(tempSortValue);
      tempData.sort(sortFunction);
    }
    setData(tempData);
  };
  const handleSortChange = (e: any) => {
    setSortValue(e.target.value);
    handleData(selectedBrands, selectedCategory, e.target.value);
  };
  const handleMobileBottomButton = (isSort: boolean) => {
    if (isSort) {
      setMobileSortButton(!mobileSortButton);
      setMobileFilterButton(false);
    } else {
      setMobileFilterButton(!mobileFilterButton);
      setMobileSortButton(false);
    }
  };
  const handleBrandSelection = (e: any) => {
    const { value } = e.target;
    let tempSelectedBrand;
    if (selectedBrands.includes(value)) {
      tempSelectedBrand = selectedBrands.filter((item: string) => item !== value);
      setSelectedBrands(tempSelectedBrand);
    } else {
      tempSelectedBrand = [...selectedBrands, value];
      setSelectedBrands(tempSelectedBrand);
    }
    handleData(tempSelectedBrand, selectedCategory);
  };
  const handleCategorySelection = (e: any) => {
    const { value } = e.target;
    let tempSelectedCategory;
    if (selectedCategory.includes(value)) {
      tempSelectedCategory = selectedCategory.filter((item: string) => item !== value);
      setSelectedCategory(tempSelectedCategory);
    } else {
      tempSelectedCategory = [...selectedCategory, value];
      setSelectedCategory(tempSelectedCategory);
    }
    handleData(selectedBrands, tempSelectedCategory);
  };
  const handleFilterClick = (isBrand: boolean) => {
    if (isBrand) {
      setBrandSelected(!brandSelected);
      setCategorySelected(false);
    } else {
      setBrandSelected(false);
      setCategorySelected(!categorySelected);
    }
  };
  const handleItemClick = (product: ProductType) => {
    history.push({
      pathname: '/product-details',
      state: { product }
    });
  };
  useEffect(() => {
    setLoading(true);
    const tempBrands = productData.reduce((acc: string[], item: any) => {
      if (!acc.includes(item.brand)) {
        acc.push(item.brand);
      }
      return acc;
    }, []);
    const tempCategory = productData.reduce((acc: string[], item: any) => {
      if (!acc.includes(item.category)) {
        acc.push(item.category);
      }
      return acc;
    }, []);
    handleData(selectedBrands, selectedCategory, sortValue);
    setBrands(tempBrands);
    setCategory(tempCategory);
    setLoading(false);
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className='desktopFilterWrapper'>
        <div className='desktopFilterButtonWrapper'>
          <div className='filterButtonContainer'>
            <button
              onClick={() => handleFilterClick(true)}
              className={`filterButton ${brandSelected ? 'buttonSelected' : ''}`}
            >
              Brand{' '}
              <img
                src={brandSelected ? projectIcon.arrowUp : projectIcon.arrowDown}
                height='10px'
                width='auto'
                alt='v'
              />
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
          <div>
            <select onChange={handleSortChange} value={sortValue}>
              <option value='Ratings(high to low)'>Ratings(high to low)</option>
              <option value='Price(low to high)'>Price(low to high)</option>
              <option value='Price(high to low)'>Price(high to low)</option>
            </select>
          </div>
        </div>
        <div className='filterSelectionContainer'>
          {brandSelected &&
            (brands || []).map((brand: string, index: number) => (
              <>
                <input
                  type='checkbox'
                  value={brand}
                  name='brand'
                  key={index}
                  onChange={handleBrandSelection}
                  checked={selectedBrands.includes(brand)}
                />
                <span>{brand}</span>
              </>
            ))}
          {categorySelected &&
            (category || []).map((category: string, index: number) => (
              <>
                <input
                  type='checkbox'
                  value={category}
                  name='category'
                  key={index}
                  onChange={handleCategorySelection}
                  checked={selectedCategory.includes(category)}
                />
                <span>{category}</span>
              </>
            ))}
        </div>
      </div>
      <div>
        <ul className='productCardContainer'>
          {data.map((product: ProductType, index: number) => (
            <li className='productCardList' key={index} onClick={() => handleItemClick(product)}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
      <div className='mobileFilterContainer'>
        <div className='mobileFilterButtonWrapper'>
          <div onClick={() => handleMobileBottomButton(true)} className='mobileSortButton'>
            <img src={projectIcon.sortIcon} alt='sort' height='20px' width='auto' />
            <span>Sort</span>
          </div>
          <div onClick={() => handleMobileBottomButton(false)} className='mobileSortButton'>
            <img src={projectIcon.filterIcon} alt='filter' height='20px' width='auto' />
            <span>Filter</span>
          </div>
        </div>
        <Modal
          isOpen={mobileSortButton}
          onRequestClose={() => {
            setMobileSortButton(false);
          }}
        >
          <MobileSortModal sortValue={sortValue} handleSortChange={handleSortChange} />
        </Modal>
        <Modal
          isOpen={mobileFilterButton}
          onRequestClose={() => {
            setMobileFilterButton(false);
          }}
        >
          <MobileFilterModal
            handleCategorySelection={handleCategorySelection}
            selectedCategory={selectedCategory}
            category={category}
            selectedBrands={selectedBrands}
            handleBrandSelection={handleBrandSelection}
            brands={brands}
            categorySelected={categorySelected}
            brandSelected={brandSelected}
            handleFilterClick={handleFilterClick}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
