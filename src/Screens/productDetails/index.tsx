import DeskTopDetailsPage from '../desktopDetailsPage';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useLocation, useHistory } from 'react-router-dom';
import { projectIcon } from '../../assets/Icons';
import './index.css';
const ProductDetails = () => {
  const location: any = useLocation();
  const history = useHistory();
  const { product } = location.state;
  const handleBackButton = () => {
    history.goBack();
  }
  return (
    <>
    <div className='desktopDetailsMainWrapper'>
      <div className='topNavContainer'>
        <div onClick={handleBackButton} className='backAndBrandContainer'>
          <img src={projectIcon?.back} alt='back' height='20px' width='auto' />
          <span className='brandHeading'>{product?.brand}</span>
        </div>
        <div className='iconContainer'>
          <img src={projectIcon?.search} alt='search' height='20px' width='auto' />
          <img src={projectIcon?.favorite} alt='favorite' height='20px' width='auto' />
          <img src={projectIcon?.shoppingBag} alt='cart' height='20px' width='auto' />
        </div>
      </div>
    </div>
    <div className='detailsContainerWrapper'>
      <div className='corouselContainer'>
        <Carousel width="70%" showThumbs={false} centerMode dynamicHeight>
          {product?.images?.map((image: any) => (
            <div key={image}>
              <img src={image} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className='detailsContainer'>
        <p>{product?.product_title}</p>
        <div className='pricingCOntainer'>
          {!!product?.price && <span className='productPrice'>{`Rs. ${product?.price}`}</span>}
          {!!product?.mrp && (
            <span className='productMrp'>
              <del>{`Rs. ${product?.mrp}`}</del>
            </span>
          )}
          {!!product?.discounts && <span className='productDiscount'>{`(${product?.discounts}% OFF)`}</span>}
        </div>
        <span className='inclusiveText'>inclusive of all taxes</span>
        <div className='buttonContainerDetailsPage'>
          <button className='addToCartButton'>
          <img src={projectIcon?.shoppingBag} alt='cart' height='20px' width='auto' />
            Add to Bag</button>
          
          <button className='buyNowButton'>
          <img src={projectIcon?.favorite} alt='favorite' height='20px' width='auto' />
             Wishlist
             </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;
