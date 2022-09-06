import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { firestore } from '../firebase';
import { motion } from 'framer-motion';

import Modal from './Modal';

import '../styles/BookDetails.css';

const BookDetails = (props) => {
    const [book, setBook] = useState(null);
    const [bookId, setBookId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const { currentUser } = useAuth();
    const { cart, setCart } = useContext(CartContext);

    let history = useHistory();

    useEffect(() => {
        firestore.collection('books').doc(props.match.params.id).get().then((doc) => {
            setBook(doc.data()); 
            setBookId(doc.id);
            setLoading(false);
        }                       
        ).catch((err) => 
            console.log(err)
        );
    }, [props]);

    const handleDelete = () => {
        firestore.collection('books').doc(bookId).delete().then(() => {
            history.push('/');
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const addToCart = () => {
        const bookProduct = {
            title: book.title,
            author: book.author,
            cover: book.file,
            price: book.price,
            quantity: quantity
        };
        setCart(currentState => [...currentState, bookProduct]);
    }

    return (
        <div className="book-details">
            {loading ? 
                <div className="loader-wrapper"><div className="lds-dual-ring"></div></div> 
                :
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <div className="book-details-header">
                        <span>{book.title}</span>, <i>{book.author}</i>
                        <div>
                            {book.category.label}
                        </div>
                    </div>
                    <div className="book-details-content">
                        <div>
                            <img src={book.file} alt={book.title} />
                        </div>
                        <div className="book-details-info">
                            <div>
                                {book.description}
                            </div>
                            <div>
                                <ul className="book-details-ul">
                                    <li><span>ISBN:</span> {book.isbn}</li>
                                    <li><span>Price:</span> {book.price}<i>$</i></li>
                                </ul>
                            </div>
                            {currentUser && 
                            <div className="quantity">
                                <div>
                                    Quantity: 
                                    <input 
                                        className="quantity-input"
                                        type="number" 
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>                                
                                <motion.button 
                                    onClick={addToCart}
                                    whileHover={{ scale: 1.2, boxShadow: '0 0.2em 0.5em 0.2em rgba(195,192,192,.9)' }}
                                >
                                    Add to cart
                                </motion.button>
                            </div>
                            }
                            <div>
                                <motion.button 
                                    className="back-btn" 
                                    onClick={() => history.goBack()}
                                    whileHover={{ scale: 1.1, boxShadow: '0 0.1em 0.2em 0.1em rgba(195,192,192,.9)' }}
                                >
                                    Back to list
                                </motion.button>
                            </div>
                            { currentUser && currentUser.email === 'kirekovacheski@gmail.com' && 
                            <div>
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
                                    onClick={() => history.push(`/books/edit/${bookId}`)}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Edit
                                    <i className="fas fa-pencil-alt"/>
                                </motion.div>
                            </div>}
                        </div>
                    </div>
                </motion.div>
            }
            { modalOpen && <Modal>
                <div 
                    className="modal-container" 
                    onClick={() => setModalOpen(false)}
                >
                    <motion.div 
                        className="modal-content modal-delete" 
                        onClick={(event) => event.stopPropagation()}
                        initial={{ y: '-100vh', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 70 }}
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
        </div>
    );
};

export default BookDetails;