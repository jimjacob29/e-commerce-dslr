import { getRatingNumbers } from '../../utils/helpers';
import './index.css';
const ProductCard = (props: any) => {
  const { product } = props;
  return (
    <div className='productCardMainWrapper'>
      <div className='productCardandRating'>
        <div className='productCardImageWrapper'>
          <img src={product?.images?.[0]} alt='product' width='100%' height='auto' />
        </div>
        {product?.ratings && (
          <div className='ratingContainer'>
            <span className='ratingText'>{product?.ratings}</span>
            <img src='Images/rating.png' height='14px' width='auto' />
            <div className='verticalLine'></div>
            <span className='ratingNumberText'>{getRatingNumbers(product?.ratings_count)}</span>
          </div>
        )}
      </div>
      <div className='descriptionWrapper'>
        <span className='brandText'>{product.brand}</span>
        <span className='descriptionText'>{product.description}</span>
        <div className='pricingCOntainer'>
          {!!product?.price && <span className='productPrice'>{`Rs. ${product?.price}`}</span>}
          {!!product?.mrp && (
            <span className='productMrp'>
              <del>{`Rs. ${product?.mrp}`}</del>
            </span>
          )}
          {!!product?.discounts && <span className='productDiscount'>{`(${product?.discounts}% OFF)`}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
