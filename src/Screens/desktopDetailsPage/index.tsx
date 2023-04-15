import { projectIcon } from '../../assets/Icons';
import './index.css';
const DeskTopDetailsPage = ({ product }: any) => {
  return (
    <div className='desktopDetailsMainWrapper'>
      <div className='topNavContainer'>
        <div className='backAndBrandContainer'>
          <img src={projectIcon?.back} alt='back' height='20px' width='auto' />
          <span className='brandHeading'>{product?.brand}</span>
        </div>
        <div className='iconContainer'>
          <img src={projectIcon?.search} alt='search' height='20px' width='auto' />
          <img src={projectIcon?.favorite} alt='favorite' height='20px' width='auto' />
          <img src={projectIcon?.shoppingBag} alt='cart' height='20px' width='auto' />
        </div>
      </div>
      <div className='detailsDataContainer'>Main Container</div>
    </div>
  );
};

export default DeskTopDetailsPage;
