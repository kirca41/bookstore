import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import Dropdown from './Dropdown';
import { firestore } from '../firebase';

const options = [
    {
        label: 'Title A-Z',
        value: 'title-asc',
        order: 'asc',
        term: 'title'
    },
    {
        label: 'Title Z-A',
        value: 'title-desc',
        order: 'desc',
        term: 'title'
    },
    {
        label: 'Price Low-High',
        value: 'price-asc',
        order: 'asc',
        term: 'price'
    },
    {
        label: 'Price High-Low',
        value: 'price-desc',
        order: 'desc',
        term: 'price'
    }
];

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            let unsubscribe;
            if(selectedOption.order === 'asc') {
                unsubscribe = firestore.collection('books').orderBy(selectedOption.term).onSnapshot((snap) => {
                    let books = [];
                    snap.forEach(doc => {
                        books.push({...doc.data(), id: doc.id});
                    });
                    setBooks(books);
                    setLoading(false);
                });
            }
            else {
                unsubscribe = firestore.collection('books').orderBy(selectedOption.term, 'desc').onSnapshot((snap) => {
                    let books = [];
                    snap.forEach(doc => {
                        books.push({...doc.data(), id: doc.id});
                    });
                    setBooks(books);
                    setLoading(false);
                });
            }            

            return () => unsubscribe();
    }, [selectedOption]);

    const renderBooks = books.map((book) => {
        return <BookItem data={book} key={book.id} />
    });
   
    return (
        <div className="book-list">
            <div className="book-list-dropdown">
                <Dropdown 
                    label='Sort by'
                    options={options}
                    selected={selectedOption} 
                    onSelectedChange={setSelectedOption} 
                />
            </div>
            { loading ? 
            <div className="loader-wrapper"><div className="lds-dual-ring"></div></div>
            : renderBooks}
        </div>
    );
    
};

export default BookList;