import BasketItem from "./BasketItem";

const BasketList = (props) => {
  const { order, 
        handleBasketShow = Function.prototype,
        removeFromBasket = Function.prototype,
        minusItem, plusItem } = props;

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0)

  return (
    <ul className='collection basket-list'>
      <li className='collection-item active'>Basket</li>
        {order.length ? order.map(item => {
            return <BasketItem 
                        key={item.id} 
                        {...item} 
                        removeFromBasket={removeFromBasket} 
                        minusItem={minusItem} 
                        plusItem={plusItem} />
        }) : <li className='collection-item'>Basket is empty</li>}
      <li className='collection-item active'>Total price: {totalPrice} USD 
      <button className="secondary-content btn buy-btn">Send payment</button></li>
      
      <i className="material-icons basket-close" onClick={handleBasketShow}>close</i>
    </ul>
  );
};

export default BasketList;
