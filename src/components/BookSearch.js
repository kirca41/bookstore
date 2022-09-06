import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import { firestore } from '../firebase';

import errorImage from '../images/Bookshelf.png';

const BookSearch = (props) => {
    const [books, setBooks] = useState([]);
    // const [selectedOption, setSelectedOption] = useState(options[0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            
            const unsubscribe = firestore.collection('books').where(props.match.params.field, '==', props.match.params.term).onSnapshot((snap) => {
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
            { loading ? 
            <div className="loader-wrapper"><div className="lds-dual-ring"></div></div>
            : books.length ?
            renderBooks
            :
            <div className="search-error">
                <img src={errorImage} alt="Bookshelf" />
                <div>
                    <span>Your search terms did not match any of our records :/</span>
                    <br />
                    <span>Please enter another term</span>
                </div>
            </div>
            }
        </div>
    );
};

export default BookSearch;