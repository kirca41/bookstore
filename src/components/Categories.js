import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import '../styles/Categories.css';

const Categories = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="categories">
            <div className="categories-header">
                Categories
                { !open && <i className="fas fa-plus" onClick={() => setOpen(!open)} /> }
                { open && <i className="fas fa-minus" onClick={() => setOpen(!open)} /> }
            </div>
            <div className={`categories-container ${!open ? 'categories-hide' : ''}`} >
                <motion.div 
                    className="categories-item"
                    whileHover={{ scale: 1.1, originX: 0 }}
                >
                    <Link 
                        to="/books/category/biography" 
                        className="categories-item" 
                        onClick={() => setOpen(false)}
                    >
                        Biography
                    </Link>
                </motion.div>
                <motion.div 
                    className="categories-item"
                    whileHover={{ scale: 1.1, originX: 0 }}
                >
                    <Link 
                        to="/books/category/classics"  
                        onClick={() => setOpen(false)}
                        >
                        Classics
                    </Link>
                </motion.div>
                <motion.div 
                    className="categories-item"
                    whileHover={{ scale: 1.1, originX: 0 }}
                >
                    <Link 
                        to="/books/category/crime-thrillers" 
                        className="categories-item" 
                        onClick={() => setOpen(false)}
                    >
                        Crime &amp; Thrillers 
                    </Link>
                </motion.div>
                <motion.div 
                    className="categories-item"
                    whileHover={{ scale: 1.1, originX: 0 }}
                >
                    <Link 
                        to="/books/category/fantasy" 
                        className="categories-item" 
                        onClick={() => setOpen(false)}
                    >
                        Fantasy
                    </Link>
                </motion.div>
                <motion.div 
                    className="categories-item"
                    whileHover={{ scale: 1.1, originX: 0 }}    
                >
                    <Link 
                        to="/books/category/fiction" 
                        className="categories-item" 
                        onClick={() => setOpen(false)}
                    >
                        Fiction
                    </Link>
                </motion.div>
                <motion.div 
                    className="categories-item"
                    whileHover={{ scale: 1.1, originX: 0 }}
                >
                    <Link 
                        to="/books/category/horror" 
                        className="categories-item" 
                        onClick={() => setOpen(false)}
                    >
                        Horror
                    </Link>
                </motion.div>
                <motion.div 
                    className="categories-item"
                    whileHover={{ scale: 1.1, originX: 0 }}
                > 
                    <Link 
                        to="/books/category/science-fiction" 
                        className="categories-item" 
                        onClick={() => setOpen(false)}
                    >
                        Science Fiction
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Categories;