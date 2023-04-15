import { useState, useEffect } from 'react';
import { productData } from '../../utils/const/productData';
import ProductCard from '../../components/productCard';
import { useHistory } from 'react-router-dom';
import { projectIcon } from '../../assets/Icons';
import './index.css';
const Home = () => {
  const [data, setData] = useState<any>(productData);
  const [brandSelected, setBrandSelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [selectedBrands, setSelectedBrands] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [mobileSortButton, setMobileSortButton] = useState(false);
  const [mobileFilterButton, setMobileFilterButton] = useState(false);
  const history = useHistory();

  const handleData = (tempSelectedBrand = selectedBrands, tempSelectedCategory = selectedCategory) => {
    let tempData = productData;
    if (tempSelectedBrand.length > 0) {
      tempData = tempData.filter((item: any) => tempSelectedBrand.includes(item.brand));
    }
    if (tempSelectedCategory.length > 0) {
      tempData = tempData.filter((item: any) => tempSelectedCategory.includes(item.category));
    }
    setData(tempData);
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
    if (selectedCategory.includes(value)) {
      setSelectedCategory(selectedCategory.filter((item: any) => item !== value));
    } else {
      setSelectedCategory([...selectedCategory, value]);
    }
    handleData();
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
              Brand
            </button>
            <button
              onClick={() => handleFilterClick(false)}
              className={`filterButton ${categorySelected ? 'buttonSelected' : ''}`}
            >
              Categories
            </button>
          </div>
          <div>
            <select>
              <option>Price(low to high)</option>
              <option>Price(high to low)</option>
              <option>Ratings(high to low)</option>
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
      </div>
    </>
  );
};

export default Home;
