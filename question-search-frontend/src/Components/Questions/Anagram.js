import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Context } from '../Context/Context';
import styles from './Anagram.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const debounce = (func, delay) => {
    let debounceTimer;
    return function(...args) {
        const context = this;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

const Anagram = () => {
    const { selected } = useContext(Context);
    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [displayedQuestionId, setDisplayedQuestionId] = useState(null);
    const questionsPerPage = 8;
    const maxVisibleButtons = 5;

    const fetchingData = async (page = 1, searchQuery = '') => {
        try {
            const response = await fetch(`https://question-based-search-backend.onrender.com/api/${selected}?page=${page}&limit=${questionsPerPage}&search=${searchQuery}`);
            const data = await response.json();
            setQuestions(data.data);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const item = e.target.value;
        setSearch(item);
        debouncedFetchData(item);
    };

    const debouncedFetchData = useCallback(
        debounce((query) => {
            setCurrentPage(1);
            fetchingData(1, query);
        }, 300),
        []
    );

    useEffect(() => {
        fetchingData(currentPage, search);
    }, [selected, currentPage]);

    const toggleDisplay = (id) => {
        setDisplayedQuestionId((prev) => (prev === id ? null : id));
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    return (
        <div>
            <div className={styles.search_container}>
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={handleChange}
                    className={styles.search}
                />
            </div>
            <div className={styles.grid_container}>
                {questions.map((question) => (
                    <div key={question._id} className={styles.question_container}>
                        <p><span className={styles.question}>Anagram Type</span> : <span className={styles.type}>{question.anagramType}</span></p>
                        <p><span className={styles.question}>Question</span> : {question.title}</p>
                        <div>
                            {question.blocks.map((option, index) => (
                                <div key={option._id}>
                                    <li>{option.text}</li>
                                </div>
                            ))}
                        </div>
                        {displayedQuestionId === question._id ? (
                            <div>
                                <p>Answer : {question.solution} <FontAwesomeIcon onClick={() => toggleDisplay(question._id)} icon={faCaretUp}/></p>
                            </div>
                            ) : (
                                <div >
                                    <p>Show answer <FontAwesomeIcon onClick={() => toggleDisplay(question._id)} icon={faCaretDown} /></p>
                                </div>
                            )}
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                    <button
                        key={startPage + index}
                        onClick={() => setCurrentPage(startPage + index)}
                        className={currentPage === startPage + index ? styles.active : ''}
                    >
                        {startPage + index}
                    </button>
                ))}
                <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};


export default Anagram;
