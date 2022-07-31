const GoodsItem = (props) => {
  const { id, name, description, price, full_background, addToCart } = props;

  return (
    <div className='card'>
      <div className='card-image'>
        <img src={full_background} alt={name} />
      </div>
      <div className='card-content'>
      <span className='card-title'>{name}</span>
        <p>
         {description}
        </p>
      </div>
      <div className='card-action'>
        <button onClick={() => addToCart({id, name, price})} className="btn">Buy</button>
        <span style={{fontSize: '1.8rem'}} className="right">{price} USD</span>
      </div>
    </div>
  );
};

export default GoodsItem;
