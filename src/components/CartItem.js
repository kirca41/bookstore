import React from 'react';
import { motion } from 'framer-motion';

const CartItem = ({values, setCart }) => {
    const removeCartItem = () => {
        setCart(currentState => {
            return currentState.filter(item => item !== values);
        });
    }

    return (
            <motion.div 
                className="cart-row"
                key={values.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                    <div className="cart-item-img">
                        <img src={values.cover} alt={values.title} />
                    </div>
                    <div className="cart-item-content">
                        {values.title}, {values.author}
                    </div>
                    <div className="cart-item-content">
                        {values.price}$
                    </div>
                    <div className="cart-item-content">
                        {values.quantity}
                    </div>
                    <div className="cart-item-content">
                        {values.price * values.quantity}$
                    </div>
                    <div className="cart-item-content cart-item-remove">
                        <motion.span 
                            onClick={removeCartItem}
                            whileHover={{ scale: 1.3, color: '#AABFBB' }}
                        >
                            x
                        </motion.span>
                    </div>
            </motion.div>
    );
};

export default CartItem;