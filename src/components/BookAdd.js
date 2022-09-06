import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Error from './Error';

import '../styles/BookAdd.css';

import { checksum } from 'isbn-validation';
import { storage, firestore } from '../firebase';
import { motion } from 'framer-motion';

const options = [
    {
        label: 'Biography',
        value: 'biography'
    },
    {
        label: 'Classics',
        value: 'classics'
    },
    {
        label: 'Crime & Thrillers',
        value: 'crime-thrillers'
    },
    {
        label: 'Fantasy',
        value: 'fantasy'
    },
    {
        label: 'Fiction',
        value: 'fiction'
    },
    {
        label: 'Horror',
        value: 'horror'
    },
    {
        label: 'Science Fiction',
        value: 'science-fiction'
    }
];

const types = ['image/png', 'image/jpeg'];

const BookAdd = () => {
    const initialFieldValues = {
        title: '',
        author: '',
        isbn: '',
        category: options[0],
        file: null,
        price: 0,
        description: ''
    };

    const initialErrors = {
        title: '',
        author: '',
        isbn: '',
        file: '',
        price: '',
        description: ''
    };

    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState(initialErrors);
    // const [url, setUrl] = useState('');

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
    }

    const setSelectedOption = (newOption) => {
        setValues({
            ...values,
            category: newOption
        });
    }

    const handleFileUpload = (event) => {
        let selected = event.target.files[0];

        if(selected && types.includes(selected.type)) {
            setValues({
                ...values,
                file: selected
            });
            setErrors({
                ...errors,
                file: ''
            });
        }         
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        let isValid = true;
        
        if(!values.title) {
            setErrors(prevErrors => ({
                ...prevErrors,
                title: 'Please enter a title.'
            }));
            isValid = false;
        }
        if(!values.author) {
            setErrors(prevErrors => ({
                ...prevErrors,
                author: 'Please enter an author.'
            }));
            isValid = false;
        }
        if(!checksum(values.isbn)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                isbn: 'Please enter a valid ISBN.'
            }));
            isValid = false;
        }
        if(!values.file || !types.includes(values.file.type)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                file: 'Please select an image file (PNG or JPEG).'
            }));
            isValid = false;
        }
        if(!values.price) {
            setErrors(prevErrors => ({
                ...prevErrors,
                price: 'Please enter a price.'
            }));
            isValid = false;
        }
        if(!values.description) {
            setErrors(prevErrors => ({
                ...prevErrors,
                description: 'Please enter a description.'
            }));
            isValid = false;
        }
        if(isValid) {
            setValues(initialFieldValues);
            setErrors(initialErrors);

            const storageRef = storage.ref(values.file.name);

            storageRef.put(values.file).on('state_changed', (snap) => {
                return;
            }, (err) => {
                return;
            }, async () => {
                const url = await storageRef.getDownloadURL();
                // setUrl(url);
                firestore.collection('books').add({
                    title: values.title,
                    author: values.author,
                    isbn: values.isbn,
                    category: values.category,
                    file: url,
                    price: values.price,
                    description: values.description
                }).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            });
        }
    }   


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
        >
            <form className="book-add" onSubmit={onFormSubmit}>
                <div className={`book-add-field ${errors.title ? 'error' : ''}`} >
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title"
                        value={values.title} 
                        autocomplete="off"
                        onChange={handleInputChange}
                    />
                    {errors.title && <Error content={errors.title} />}
                </div>
                <div className={`book-add-field ${errors.author ? 'error' : ''}`} >
                    <label htmlFor="author">Author(s)</label>
                    <input 
                        type="text" 
                        id="author" 
                        name="author"
                        value={values.author}
                        autocomplete="off"
                        onChange={handleInputChange}
                    />
                    {errors.author && <Error content={errors.author} />}
                </div>
                <div className={`book-add-field ${errors.isbn ? 'error' : ''}`} >
                    <label htmlFor="isbn">ISBN</label>
                    <input 
                        type="text" 
                        id="isbn" 
                        name="isbn"
                        value={values.isbn}
                        autocomplete="off"
                        onChange={handleInputChange}
                    />
                    {errors.isbn && <Error content={errors.isbn} />}
                </div>
                <div id="bookadd-dropdown" className="book-add-field">
                    <div id="dropdown-container">
                        <Dropdown 
                                label='Category'
                                options={options}
                                selected={values.category} 
                                onSelectedChange={setSelectedOption} 
                        /> 
                    </div>
                </div>
                <div className={`book-add-field ${errors.price ? 'error' : ''}`} >
                    <label htmlFor="price">Price</label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price"
                        step="0.5"
                        value={`${values.price === 0 ? '' : values.price}`}
                        onChange={handleInputChange}
                    />
                    {errors.price && <Error content={errors.price} />}
                </div>
                <div className="book-add-field">
                    <label htmlFor="cover">
                        <input 
                            type="file" 
                            id="cover"
                            onChange={handleFileUpload}
                        />
                        <span><b>+</b>Upload Cover Photo</span>
                    </label>
                    {errors.file && <Error content={errors.file} />}
                </div>
                <div className={`book-add-field ${errors.description ? 'error' : ''}`} >
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={values.description}
                        autocomplete="off"
                        onChange={handleInputChange}
                        rows="6" 
                        cols="50"
                    />
                    {errors.description && <Error content={errors.description} />}
                </div>
            </form> 
            <motion.button 
                className="add-submit-btn" 
                onClick={onFormSubmit}
                whileHover={{ scale: 1.1, boxShadow: '0 0.2em 0.5em 0.2em rgba(195,192,192,.9)' }}
            >
                Add Book
            </motion.button> 
        </motion.div>         
    );
};

export default BookAdd;