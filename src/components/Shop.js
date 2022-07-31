import { useState, useEffect } from "react";
import {API_KEY, API_URL} from '../config';
import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import Alert from "./Alert";

const Shop = () => {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setIsBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    // додати в корзину 
    const addToCart = (item) => {
        // чи клікнули по товару, який вже в корзині
        const itemIndex = order.findIndex(el => el.id === item.id)
        // якщо ні, додаємо 
        if (itemIndex < 0) {
            const newItem = {
                ...item, 
                quantity: 1,
            }
            setOrder([...order, newItem])
        } // якщо клікнули по тому, що вже є, то його не додаємо заново, а просто міняємо в нього властивість quantity, додаючи +1
        else {
            const newOrder = order.map((el, i) => {
                if (i === itemIndex) {
                    return {
                        ...el,
                        quantity: el.quantity + 1
                    }
                } else {
                    return el;
                }
            })
            setOrder(newOrder)
        }
        setAlertName(item.name)
    }

    // видалити з корзини
    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(el => el.id !== itemId);
        setOrder(newOrder)
    }

    const handleBasketShow = () => {
        setIsBasketShow(!isBasketShow);
    }

    const minusItem = (id) => {
        const itemIndex = order.findIndex(el => el.id === id);

        const newOrder = order.map((item, i) => {
            if (i == itemIndex && item.quantity > 0) {
                return {...item, quantity: item.quantity - 1} 
            } else {
                return item
            }
        })
        setOrder(newOrder)
    }

    const plusItem = (id) => {
        const itemIndex = order.findIndex(el => el.id === id);

        const newOrder = order.map((item, i) => {
            if (i == itemIndex) {
                return {...item, quantity: item.quantity + 1} 
            } else {
                return item
            }
        })
        setOrder(newOrder)
    }

    const closeAlert = () => {
        setAlertName('');
    }

    useEffect(() => {
        fetch(API_URL, {
            headers: {
                'Authorization': 'b2ed789b-53c6c48a-83b0d42f-1e0340b4'
            }
        })
        .then(res => res.json())
        .then(data => {
            data.featured && setGoods(data.featured);
            setLoading(false);
        })
            
    }, [])

    return  <main className="container content">
        <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
        {loading ? <Preloader /> : <GoodsList goods={goods} addToCart={addToCart} />}
        {isBasketShow && 
            <BasketList 
                order={order} 
                handleBasketShow={handleBasketShow}
                removeFromBasket={removeFromBasket}
                minusItem={minusItem}
                plusItem={plusItem} />
        }
        {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </main>
    
}

export default Shop;