const BasketItem = (props) => {
  const { id, name, price, quantity, removeFromBasket, minusItem, plusItem } = props;

  return (
    <li className='collection-item'>
      {name} x  
      <i onClick={() => minusItem(id)} className='material-icons basket-add-remove'>remove_circle_outline</i> 
      {quantity} 
      <i onClick={() => plusItem(id)}  className='material-icons basket-add-remove'>add_circle_outline</i> 
      = {price*quantity} USD
      <span className='secondary-content' onClick={() => removeFromBasket(id)}>
        <i className='material-icons basket-delete'>close</i>
      </span>
    </li>
  );
};

export default BasketItem;
