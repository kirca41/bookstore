import React, { useState } from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
    const [cart, setCart] = useState([]);

    const totalPrice = () => {
        let total = 0;
        cart.map((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    const value = {
        cart,
        setCart,
        totalPrice
    };

    return (
        <CartContext.Provider value={value}>
            {props.children}
        </CartContext.Provider>
    );
}