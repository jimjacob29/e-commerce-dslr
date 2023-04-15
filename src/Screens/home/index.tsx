import { useState, useEffect, useContext } from 'react';
import { productData } from '../../utils/const/productData';
import ProductCard from '../../components/productCard';
import { useHistory } from 'react-router-dom';
import { projectIcon } from '../../assets/Icons';
import { MainContext } from '../../utils/contextData';
import MobileFilterModal from '../../components/mobileFilterModal';
import Modal from 'react-modal';
import './index.css';
import MobileSortModal from '../../components/mobileSortModal';
const Home = () => {
  const [data, setData] = useState<any>(productData);

  const [brandSelected, setBrandSelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [mobileSortButton, setMobileSortButton] = useState(false);
  const [mobileFilterButton, setMobileFilterButton] = useState(false);
  const history = useHistory();
  const { selectedBrands, setSelectedBrands, selectedCategory, setSelectedCategory, sortValue, setSortValue }: any =
    useContext(MainContext);

  const getSortFunction = (tempSortValue: any) => {
    switch (tempSortValue) {
      case `Price(low to high)`:
        return (a: any, b: any) => a.price - b.price;
      case 'Price(high to low)':
        return (a: any, b: any) => b.price - a.price;
      case 'Ratings(high to low)':
        return (a: any, b: any) => b.ratings - a.ratings;
    }
  };
  const handleData = (
    tempSelectedBrand = selectedBrands,
    tempSelectedCategory = selectedCategory,
    tempSortValue = sortValue
  ) => {
    let tempData = productData;
    if (tempSelectedBrand.length > 0) {
      tempData = tempData.filter((item: any) => tempSelectedBrand.includes(item.brand));
    }
    if (tempSelectedCategory.length > 0) {
      tempData = tempData.filter((item: any) => tempSelectedCategory.includes(item.category));
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
      tempSelectedBrand = selectedBrands.filter((item: any) => item !== value);
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
      tempSelectedCategory = selectedCategory.filter((item: any) => item !== value);
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
  const handleItemClick = (product: any) => {
    history.push({
      pathname: '/product-details',
      state: { product }
    });
  };
  useEffect(() => {
    setLoading(true);
    const tempBrands = productData.reduce((acc: any, item: any) => {
      if (!acc.includes(item.brand)) {
        acc.push(item.brand);
      }
      return acc;
    }, []);
    const tempCategory = productData.reduce((acc: any, item: any) => {
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
            (brands || []).map((brand: any, index: number) => (
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
            (category || []).map((category: any, index: number) => (
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
          {data.map((product: any, index: number) => (
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
