import React, { useContext } from 'react'
import { Context } from '../Context/Context'

import '../Styles/Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
    const list = ["Anagram", "Read Along", "Content Only", "MCQ"];
    const { setSelected } = useContext(Context);

    const handleClick = (item) => {
        switch (item) {
            case "Anagram":
                setSelected("anagrams");
                break;
            case "Read Along":
                setSelected("read_along");
                break;
            case "Content Only":
                setSelected("content_only");
                break;
            case "MCQ":
                setSelected("mcqs");
                break;
            default:
                setSelected("anagrams");
        }
    };

    return (
        <div>
            <div className='home-container'>
                <div className='container border'>
                    <div className='header'>
                        <div className='title-container'>
                            <p>question's hub</p>
                        </div>
                        <hr className='divider' />
                        <div className='questions'>
                            <div className='content'>
                                {list.map((item, index) => {
                                    return (
                                        <Link
                                            to={`/${item.toLowerCase().replace(" ", "_")}`}
                                            key={index}
                                            onClick={() => handleClick(item)} // Move the click handler here
                                        >
                                            <p>{item}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
