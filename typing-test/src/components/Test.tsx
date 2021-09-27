import React, { useState, useEffect } from "react";
import useKeyPress from "../hooks/useKeyPress.js";
import { generateWords } from  "../util.js";
import './Test.css';

const Test = () => {
    const [words, setWords] = useState([])
    const [activeWordIndex, setActiveWordIndex] = useState(0);

    const handleGenerateWords = (count:number) => {
        const initialWords = generateWords(count);
        setWords(initialWords)
    }

    useEffect(() => {
        handleGenerateWords(10);
    }, []);

    const handleKeyChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log('e: ', e.target.value);
        const input = e.target.value;
        if (input.replace(/ /g,'').length > 0 && input.charAt(input.length - 1) === ' ') {
            alert('space alert')
            const currentIndex = activeWordIndex;
            setActiveWordIndex(currentIndex + 1);
        }
    }

    return (
        <section className="wrapper">
            <button onClick={() => handleGenerateWords(25)}>25</button>
            <p>{words[activeWordIndex]}</p>
            <input onChange={e => handleKeyChange(e)} />
            <div className="wordsWrapper">
                {words.map((word:string, index:number) => (
                    <p key={index} className="word">{word}</p>
                ))}
            </div>
        </section>
    )
}

export default Test;