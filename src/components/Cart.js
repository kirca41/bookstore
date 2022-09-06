import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import CartItem from './CartItem';
import { motion } from 'framer-motion';

import '../styles/Cart.css';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delay: 0.3,
            staggerChildren: 0.5
      }
    }
}

const Cart = (props) => {
    const { cart, setCart, totalPrice } = useContext(CartContext);

    let history = useHistory();

    const renderCartItems = () => {
        return cart.map((item) => {
            return (
               <CartItem key={item.title} values={item} setCart={setCart} />
            );
        });
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <div className="cart-container">
            { cart.length ? 
            <>
                <motion.div 
                    className="cart-list"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <div className="cart-row cart-header">
                        <div>
                            Products
                        </div>
                        <div>
                            Name &amp; Author
                        </div>
                        <div>
                            Price
                        </div>
                        <div>
                            Quantity
                        </div>
                        <div>
                            Total
                        </div>
                        <div>
                            Remove
                        </div>
                    </div>
                    {renderCartItems()}
                </motion.div>
                <div className="cart-buttons">
                    <div>Cart total: {totalPrice()}$</div>
                    <motion.button 
                        className="clear-cart-btn" 
                        onClick={clearCart}
                        whileHover={{ scale: 1.1, boxShadow: '0 0.2em 0.5em 0.2em rgba(195,192,192,.9)' }}
                    >
                        Clear cart
                    </motion.button>
                    <motion.button 
                        className="checkout-cart-btn" 
                        onClick={() => history.push(`/${props.match.params.userId}/checkout`)}
                        whileHover={{ scale: 1.1, boxShadow: '0 0.2em 0.5em 0.2em rgba(195,192,192,.9)' }}
                    >
                        Checkout
                    </motion.button>
                </div>
            </> : 
            <>
            <div className="cart-empty">Your cart is empty</div>
            <motion.button 
                className="cart-back-btn" 
                onClick={() => history.push('/')}
                whileHover={{ scale: 1.1, boxShadow: '0 0.2em 0.5em 0.2em rgba(195,192,192,.9)' }}
            >
                Back to shopping
            </motion.button>
            </>
            }            
        </div>
    );    
};

export default Cart;