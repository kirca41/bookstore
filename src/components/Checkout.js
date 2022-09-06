import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import Error from './Error';
import { motion } from 'framer-motion';

import '../styles/Checkout.css';

const Checkout = () => {
    const initialFieldValues = {
        name: '',
        lastname: '',
        email: '',
        phone: '',
        delivery: '',
        address: '',
        city: '',
        postalcode: '',
        country: ''
    };

    const initialErrors = {
        name: '',
        lastname: '',
        email: '',
        phone: '',
        delivery: '',
        address: '',
        city: '',
        postalcode: '',
        country: ''
    };

    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState(initialErrors);

    let history = useHistory();

    const { cart, setCart, totalPrice } = useContext(CartContext);

    const handleInputChange = (event) => {
        const { name, value} = event.target;
        setValues({
            ...values,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: '' 
        });
        if(name === 'delivery' && value === 'delivery-store') {
            setErrors(prevErrors => ({
                ...prevErrors,
                address: '',
                city: '',
                postalcode: '',
                country: ''
            }));
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        let isValid = true;

        if(!values.name) {
            setErrors(prevErrors => ({
                ...prevErrors,
                name: 'Please enter your name.'
            }));
            isValid = false;
        }
        if(!values.lastname) {
            setErrors(prevErrors => ({
                ...prevErrors,
                lastname: 'Please enter your lastname.'
            }));
            isValid = false;
        }
        if(!values.email) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Please enter your email.'
            }));
            isValid = false;
        }
        if(!values.phone) {
            setErrors(prevErrors => ({
                ...prevErrors,
                phone: 'Please enter your phone number.'
            }));
            isValid = false;
        }
        if(!values.delivery) {
            setErrors(prevErrors => ({
                ...prevErrors,
                delivery: 'Please select a delivery option.'
            }));
            isValid = false;
        }
        if(values.delivery === 'delivery-address' && !values.address) {
            setErrors(prevErrors => ({
                ...prevErrors,
                address: 'Please enter your address.'
            }));
            isValid = false;
        }
        if(values.delivery === 'delivery-address' && !values.city) {
            setErrors(prevErrors => ({
                ...prevErrors,
                city: 'Please enter your city.'
            }));
            isValid = false;
        }
        if(values.delivery === 'delivery-address' && !values.postalcode) {
            setErrors(prevErrors => ({
                ...prevErrors,
                postalcode: 'Please enter your city\'s postal code.'
            }));
            isValid = false;
        }
        if(values.delivery === 'delivery-address' && !values.country) {
            setErrors(prevErrors => ({
                ...prevErrors,
                country: 'Please enter your country.'
            }));
            isValid = false;
        }

        if(isValid) {
            setValues(initialFieldValues);
            setErrors(initialErrors);
            setCart([]);
            history.push('/');
        }
    };

    return (
        <motion.div 
            className="checkout-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
        >
            <form className="checkout-form" onSubmit={handleFormSubmit}>
                <div className="checkout-personal-info">
                    <div className="checkout-info-item">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            id="name"
                            value={values.name}
                            name="name"
                            autocomplete="off"
                            onChange={handleInputChange}
                        />
                        {errors.name && <Error content={errors.name} />}
                    </div>
                    <div className="checkout-info-item">
                        <label htmlFor="lastname">Last Name</label>
                        <input 
                            type="text"
                            id="lastname"
                            value={values.lastname}
                            name="lastname"
                            autocomplete="off"
                            onChange={handleInputChange}
                        />
                        {errors.lastname && <Error content={errors.lastname} />}
                    </div>
                    <div className="checkout-info-item">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            id="email"
                            value={values.email}
                            name="email"
                            autocomplete="off"
                            onChange={handleInputChange}
                        />
                        {errors.email && <Error content={errors.email} />}
                    </div>
                    <div className="checkout-info-item">
                        <label htmlFor="phone">Phone</label>
                        <input 
                            type="text"
                            id="phone"
                            value={values.phone}
                            name="phone"
                            autocomplete="off"
                            onChange={handleInputChange}
                        />
                        {errors.phone && <Error content={errors.phone} />}
                    </div>
                </div>
                <div className="delivery-options">
                    <span>Delivery Options: </span>
                    <div className="delivery-options-item">
                        <label htmlFor="delivery-address">
                            Delivery Address
                            <input 
                                type="radio"
                                value="delivery-address"
                                selected={values.delivery === 'delivery-address'}
                                id="delivery-address"
                                name="delivery"
                                onChange={handleInputChange}
                            />
                        </label>  
                    </div>
                    <div className="delivery-options-item">
                        <label htmlFor="delivery-store">
                            Collect in Store (Free)
                            <input 
                                type="radio"
                                value="delivery-store"
                                selected={values.delivery === 'delivery-store'}
                                id="delivery-store"
                                name="delivery"
                                onChange={handleInputChange}
                            />
                        </label>  
                    </div>    
                    {errors.delivery && <Error content={errors.delivery} />}          
                </div>
                {values.delivery === 'delivery-address' && 
                <motion.div 
                    className="checkout-delivery-info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9 }}
                >
                    <div className="checkout-info-item">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text"
                            id="address"
                            value={values.address}
                            name="address"
                            autocomplete="off"
                            onChange={handleInputChange}
                        />
                        {errors.address && <Error content={errors.address} />} 
                    </div>
                    <div className="checkout-info-item">
                        <label htmlFor="city">City</label>
                        <input 
                            type="text"
                            id="city"
                            value={values.city}
                            name="city"
                            autocomplete="off"
                            onChange={handleInputChange}
                        />
                        {errors.city && <Error content={errors.city} />} 
                    </div>
                    <div className="checkout-info-item">
                        <label htmlFor="postalcode">Postal Code</label>
                        <input 
                            type="text"
                            id="postalcode"
                            value={values.postalcode}
                            name="postalcode"
                            autocomplete="off"
                            onChange={handleInputChange}
                        />
                        {errors.postalcode && <Error content={errors.postalcode} />} 
                    </div>
                    <div className="checkout-info-item">
                        <label htmlFor="country">Country</label>
                        <input 
                            type="text"
                            id="country"
                            value={values.country}
                            name="country"
                            autocomplete="off"
                            onChange={handleInputChange}
                        />
                        {errors.country && <Error content={errors.country} />} 
                    </div>
                </motion.div>}
            </form>
            <div className="checkout-totals">
                <div>{cart.length} items(s)</div>
                <div><span>Sub total:</span><span>{totalPrice()}</span></div>
                <div><span>Delivery fee:</span><span>{values.delivery === 'delivery-store' ? 'FREE' : '3$'}</span></div>
                <hr />
                <div><span>Total:</span><span>{values.delivery === 'delivery-store' ? `${totalPrice()}$` : `${totalPrice()+3}$`}</span></div>
            </div>
            <motion.button 
                className="add-submit-btn" 
                onClick={handleFormSubmit}
                whileHover={{ scale: 1.1, boxShadow: '0 0.2em 0.5em 0.2em rgba(195,192,192,.9)' }}
            >
                Order
            </motion.button>
        </motion.div>
    );
};

export default Checkout;