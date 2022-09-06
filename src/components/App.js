import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Categories from './Categories';
import BookList from './BookList';
import BookDetails from './BookDetails';
import BookEdit from './BookEdit';
import BookAdd from './BookAdd';
import BooksCategory from './BooksCategory';
import BookSearch from './BookSearch';
import Checkout from './Checkout';
import Cart from './Cart';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';

const App = () => {
    return (
        <CartProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    <div style={{display: 'grid', gridTemplateColumns: '20% 80%'}}>
                        <Categories />
                        <Route path="/" exact component={BookList} />
                        <Route path="/books/show/:id" exact component={BookDetails} />
                        <Route path="/books/edit/:id" exact component={BookEdit} />
                        <Route path="/books/new" exact component={BookAdd} />
                        <Route path="/books/category/:category" exact component={BooksCategory} />
                        <Route path="/books/search/:field/:term" exact component={BookSearch} />
                        <Route path="/:userId/cart" exact component={Cart} />
                        <Route path="/:userId/checkout" exact component={Checkout} />
                    </div>
                </BrowserRouter>
            </AuthProvider>
        </CartProvider>
    );
};

export default App;