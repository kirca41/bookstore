import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logo from '../images/logo.png';
import '../styles/Header.css';
import '../styles/Modal.css';

import Dropdown from './Dropdown';
import Modal from './Modal';
import Error from './Error';
import { useAuth } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { motion } from 'framer-motion';

const options = [
    {
        label: 'Title',
        value: 'title'
    },
    {
        label: 'Author',
        value: 'author'
    },
    {
        label: 'ISBN',
        value: 'isbn'
    }
];

const initialUserInfo = {
    email: '',
    password1: '',
    password2: ''
};

const initalErrors = {
    register: '',
    signIn: '',
    signOut: ''
}

const Header = () => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalStates, setModalStates] = useState({
        signIn: false,
        register: false
    });
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [errors, setErrors] = useState(initalErrors);

    const { signUp, signIn, signOut, currentUser } = useAuth();
    const { cart, setCart } = useContext(CartContext);

    let history = useHistory();

    useEffect(() => {
        setUserInfo(initialUserInfo);
    }, [modalStates.signIn]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        history.push(`/books/search/${selectedOption.value}/${searchTerm}`);
    }

    const handleSignUp = async (event) => {
        event.preventDefault();

        if(userInfo.password1 !== userInfo.password2) {
            return setErrors({ ...errors, register: 'Password do not match'});
        }
        try {
            await signUp(userInfo.email, userInfo.password1);
            setModalStates({ ...modalStates, register: false});
            setErrors(initalErrors);
        } catch {
            setErrors({ ...errors, register: 'Failed to create an account. Check your email or passwords.'});
        }
    }

    const handleSignOut = async () => {
        try{
            await signOut();
            setCart([]);
        } catch {
            setErrors({ ...errors, signOut: 'Failed to sign out'});
        }
    }

    const handleSignIn = async (event) => {
        event.preventDefault();

        try {
            await signIn(userInfo.email, userInfo.password1);
            setModalStates({ ...modalStates, signIn: false});
            setErrors(initalErrors);
        } catch {
            setErrors({ ...errors, signIn: 'Failed to sign in'});
            return;
        }
    }

    return (
            <div className="header-container">
                <Link to="/" >
                    <img src={logo} alt="Logo" className="logo" />
                </Link>     
                <form className="search-book" onSubmit={handleSearch} >      
                    <i className="fas fa-search" onClick={handleSearch} />
                    <input 
                        type="text" 
                        value={searchTerm}
                        placeholder={`Enter ${selectedOption.label}...`} 
                        onChange={handleInputChange}
                    />
                    <div id="header-dropdown">
                        <Dropdown 
                            label='Search By'
                            options={options}
                            selected={selectedOption} 
                            onSelectedChange={setSelectedOption} 
                        />    
                    </div>               
                </form> 
                {currentUser && 
                    <Link to={`/${currentUser.uid}/cart`} className="header-item header-cart">
                        <i className="fas fa-shopping-cart" />
                        <div className="cart-dot">{cart.length}</div>
                    </Link> 
                }
                {currentUser && currentUser.email === 'kirekovacheski@gmail.com' &&  
                    <Link 
                        to="/books/new" 
                        className="header-item"
                    >
                        Add a book
                    </Link>
                }
                {!currentUser &&
                    <div className="header-item" onClick={() => setModalStates({ ...modalStates, signIn: true})}>
                        Sign in
                    </div>
                }
                {currentUser && 
                    <div className="header-item" onClick={handleSignOut}>
                        Sign out
                    </div>
                }
                {modalStates.signIn && 
                    <Modal>
                        <div className="modal-container" onClick={() => setModalStates({ ...modalStates, signIn: false})}>
                            <motion.div 
                                className="modal-content" 
                                onClick={(event) => event.stopPropagation()}
                                initial={{ y: '-100vh', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 70 }}
                            >
                                <div className="modal-header">
                                    SIGN IN
                                </div>
                                <form className="modal-form" onSubmit={handleSignIn}>
                                    <div className="modal-input-wrapper icon-email">
                                        <input 
                                            type="text" 
                                            placeholder="Your Email"
                                            value={userInfo.email}
                                            onChange={(event) => setUserInfo({ ...userInfo, email: event.target.value })}
                                        />
                                    </div>
                                    <div className="modal-input-wrapper icon-lock">
                                        <input 
                                            type="password" 
                                            placeholder="Your Password"
                                            value={userInfo.password1}
                                            onChange={(event) => setUserInfo({ ...userInfo, password1: event.target.value })}
                                        />
                                    </div>
                                    <div className="modal-wrapper">
                                        <motion.button 
                                            className="btn btn-primary" 
                                            onClick={handleSignIn}
                                            whileHover={{ scale: 1.05, boxShadow: '0 0.2em 0.5em 0.2em rgba(195,192,192,.9)'}}
                                        >
                                            Sign in
                                        </motion.button>
                                        { errors.signIn && <Error content={errors.signIn} /> }
                                    </div>
                                    <div className="modal-wrapper">
                                        <span>Not registered yet?</span>
                                        <br />
                                        <motion.button 
                                            className="btn btn-primary btn-register" 
                                            onClick={() => {
                                                setModalStates({ signIn: false, register: true });
                                                setErrors({ ...errors, signIn: ''});
                                            }}
                                            whileHover={{ scale: 1.05, boxShadow: '0 0.2em 0.5em 0.2em rgba(195,192,192,.9)'}}
                                        >
                                            Register
                                        </motion.button>
                                    </div>
                                </form>
                                    <motion.span 
                                        className="modal-close" 
                                        onClick={() => {
                                        setModalStates({ ...modalStates, signIn: false });
                                        setErrors({ ...errors, signIn: '', signUp: ''});
                                        }}
                                        whileHover={{ scale: 1.3, color: 'rgba(74, 74, 74, 0.8)' }}
                                    >
                                        X
                                    </motion.span>
                            </motion.div>
                        </div>
                    </Modal>
                }
                {modalStates.register && 
                    <Modal>
                        <div className="modal-container" onClick={() => setModalStates({ ...modalStates, register: false})}>
                            <motion.div 
                                className="modal-content" 
                                onClick={(event) => event.stopPropagation()}
                                initial={{ x: '-100vw', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 50 }}
                            >
                                <div className="modal-header">
                                    REGISTER
                                </div>
                                <form className="modal-form" onSubmit={handleSignUp}>
                                    <div className="modal-input-wrapper icon-email">
                                        <input 
                                            type="text" 
                                            placeholder="Your Email"
                                            value={userInfo.email}
                                            onChange={(event) => setUserInfo({ ...userInfo, email: event.target.value })}
                                        />
                                    </div>
                                    <div className="modal-input-wrapper icon-lock">
                                        <input 
                                            type="password" 
                                            placeholder="Your Password"
                                            value={userInfo.password1}
                                            onChange={(event) => setUserInfo({ ...userInfo, password1: event.target.value })}
                                        />
                                    </div>
                                    <div className="modal-input-wrapper icon-lock">
                                        <input 
                                            type="password" 
                                            placeholder="Confirm Password"
                                            value={userInfo.password2}
                                            onChange={(event) => setUserInfo({ ...userInfo, password2: event.target.value })}
                                        />
                                    </div>
                                    <div className="modal-wrapper">
                                        <motion.button 
                                            className="btn btn-primary" 
                                            onClick={handleSignUp}
                                            whileHover={{ scale: 1.05, boxShadow: '0 0.2em 0.5em 0.2em rgba(195,192,192,.9)'}}
                                        >
                                            Register
                                        </motion.button>
                                        { errors.register && <Error content={errors.register} />} 
                                    </div>
                                    </form>
                                    <motion.span 
                                        className="modal-close" 
                                        onClick={() => {
                                        setModalStates({ ...modalStates, register: false });
                                        setErrors({ ...errors, signIn: '', signUp: ''});
                                        }}
                                        whileHover={{ scale: 1.3, color: 'rgba(74, 74, 74, 0.8)' }}
                                    >
                                        X
                                    </motion.span>
                            </motion.div>
                        </div>
                    </Modal>
                }
            </div>
    ); 
};  

export default Header;