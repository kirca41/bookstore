import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import Dropdown from './Dropdown';
import { firestore } from '../firebase';
import { motion } from 'framer-motion';

import errorImage from '../images/Bookshelf.png';

// const options = [
//     {
//         label: 'Title A-Z',
//         value: 'title-asc',
//         order: 'asc',
//         term: 'title'
//     },
//     {
//         label: 'Title Z-A',
//         value: 'title-desc',
//         order: 'desc',
//         term: 'title'
//     },
//     {
//         label: 'Price Low-High',
//         value: 'price-asc',
//         order: 'asc',
//         term: 'price'
//     },
//     {
//         label: 'Price High-Low',
//         value: 'price-desc',
//         order: 'desc',
//         term: 'price'
//     }
// ];

const BooksCategory = (props) => {
    const [books, setBooks] = useState([]);
    // const [selectedOption, setSelectedOption] = useState(options[0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            
            const unsubscribe = firestore.collection('books').where('category.value', '==', props.match.params.category).onSnapshot((snap) => {
                    let books = [];
                    snap.forEach(doc => {
                        books.push({...doc.data(), id: doc.id});
                    });
                    setBooks(books);
                    setLoading(false);
                });
            
            return () => unsubscribe();
    }, [props]);

    const renderBooks = books.map((book) => {
        return <BookItem data={book} key={book.id} />
    });
   
    return (
        <div className="book-list">
            {/* <div className="book-list-dropdown">
                <Dropdown 
                    label='Filter by'
                    options={options}
                    selected={selectedOption} 
                    onSelectedChange={setSelectedOption} 
                />
            </div> */}
            {/* { loading ? 
            <div className="loader-wrapper"><div className="lds-dual-ring"></div></div>
            : renderBooks} */}
            { loading ? 
            <div className="loader-wrapper"><div className="lds-dual-ring"></div></div>
            : books.length ?
            renderBooks
            :
            <motion.div 
                className="search-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <img src={errorImage} alt="Bookshelf" />
                <div>
                    <span>No books of the selected category are in stock at the moment :/</span>
                    <br />
                    <span>Please select another category</span>
                </div>
            </motion.div>
            }
        </div>
    );
    
};

export default BooksCategory;