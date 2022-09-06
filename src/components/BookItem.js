import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { firestore } from '../firebase';
import { motion } from 'framer-motion';

import Modal from './Modal';

import '../styles/BookItem.css';

const BookItem = ({ data }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const { currentUser } = useAuth();
    const { setCart } = useContext(CartContext);

    let history = useHistory();

    const handleClick = () => {
        history.push(`/books/show/${data.id}`);
    }

    const handleDelete = () => {
        firestore.collection('books').doc(data.id).delete().then(() => {
            history.push('/');
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const addToCart = () => {
        const bookProduct = {
            title: data.title,
            author: data.author,
            cover: data.file,
            price: data.price,
            quantity: 1
        };
        setCart(currentState => [...currentState, bookProduct]);
    }

    return (
        <motion.div 
            className="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
        >
            <div className="card-container">
                <div className="card-img-container">
                    <img src={data.file} alt={data.title} onClick={handleClick} />
                    { currentUser && 
                    <div 
                        className="card-add-btn" 
                        onClick={addToCart}
                    >
                        Add to cart
                        <i className="fas fa-shopping-cart" />
                    </div>
                    }
                </div>                
                <div className="card-content">
                    <div className="card-field card-title" onClick={handleClick}>
                        {data.title}
                    </div>
                    <div className="card-field card-author">
                        {data.author}
                    </div>
                    <div className="card-field card-price">
                        {data.price}<i>$</i>
                    </div>
                    { currentUser && currentUser.email === 'kirekovacheski@gmail.com' && 
                    <div className="card-field card-buttons">
                        <motion.div 
                            className="remove-btn" 
                            onClick={() => setModalOpen(true)}
                            whileHover={{ scale: 1.1 }}
                        >
                            Remove
                            <i className="fas fa-trash" />
                        </motion.div>
                        <motion.div 
                            className="edit-btn" 
                            onClick={() => history.push(`/books/edit/${data.id}`)}
                            whileHover={{ scale: 1.05 }}
                        >
                            Edit
                            <i className="fas fa-pencil-alt"/>
                        </motion.div>
                    </div>
                    }
                </div>
            </div>
            { modalOpen && <Modal>
                <div className="modal-container" onClick={() => setModalOpen(false)}>
                    <motion.div 
                        className="modal-content modal-delete" 
                        onClick={(event) => event.stopPropagation()}
                        initial={{ y: '-100vh' }}
                        animate={{ y: 0 }}
                        transition={{ type: 'spring', stiffness: 80 }}
                    >
                        <div>Are you sure you want to delete this book?</div>
                        <div className="modal-buttons">
                            <motion.div 
                                className="confirm-btn" 
                                onClick={handleDelete}
                                whileHover={{ scale: 1.1 }}
                            >
                                Yes
                            </motion.div>
                            <motion.div 
                                className="abort-btn" 
                                onClick={() => setModalOpen(false)}
                                whileHover={{ scale: 1.1 }}
                            >
                                Cancel
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Modal> }
        </motion.div>
    );
};

export default BookItem;