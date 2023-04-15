const MobileSortModal = ({ sortValue, handleSortChange }: any) => {
  return (
    <div className='mobileSortConatiner'>
      <label>
        <input
          type='radio'
          name='mobilesort'
          value='Ratings(high to low)'
          checked={sortValue === 'Ratings(high to low)'}
          onChange={handleSortChange}
        />
        Ratings(high to low)
      </label>
      <label>
        <input
          type='radio'
          name='mobilesort'
          value='Price(low to high)'
          checked={sortValue === 'Price(low to high)'}
          onChange={handleSortChange}
        />
        Price(low to high)
      </label>
      <label>
        <input
          type='radio'
          name='mobilesort'
          value='Price(high to low)'
          checked={sortValue === 'Price(high to low)'}
          onChange={handleSortChange}
        />
        Price(high to low)
      </label>
    </div>
  );
};

export default MobileSortModal;
