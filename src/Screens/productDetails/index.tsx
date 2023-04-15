import DeskTopDetailsPage from '../desktopDetailsPage';
import { useLocation } from 'react-router-dom';
import './index.css';
const ProductDetails = () => {
  const location: any = useLocation();
  const { product } = location.state;
  console.log({ product });
  return (
    <div>
      <div className='desktopDetailsPage'>
        <DeskTopDetailsPage product={product} />
      </div>
      <div className='mobileDetailPage'>Mobile</div>
    </div>
  );
};

export default ProductDetails;
