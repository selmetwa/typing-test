import React, { useState, useEffect, createRef } from "react";
import useKeyPress from "../hooks/useKeyPress.js";
import { generateWords } from  "../util.js";
import './Test.css';

const Test = () => {
    const [words, setWords] = useState([])
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [lastKey, setLastKey] = useState(null);

    const handleGenerateWords = (count:number) => {
        const initialWords = generateWords(count);
        setWords(initialWords)
    }

    useEffect(() => {
        handleGenerateWords(10);
    }, []);


    useKeyPress((key:any) => {
        console.log('key: ', key)
        setLastKey(key)
    })

    const handleKeyChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log('e: ', e.target.value);
        const input = e.target.value;
        console.log('lastKey: ', lastKey)
        if (words[activeWordIndex].indexOf(input.replace(/ /g,'')) > -1 ) {
            console.log('match')
            document.querySelector('input').style.background = 'white'
        } else {
            document.querySelector('input').style.background = 'red'
        }
        if (input.replace(/ /g,'').length > 0 && input.charAt(input.length - 1) === ' ') {
            document.querySelector('input').value = '';
            if (input.replace(/ /g,'') === words[activeWordIndex]) {
                let prev = document.querySelector(`.word-${activeWordIndex}`);
                console.log('prev: ', prev)
                prev.style.color = 'green';
            } else {
                let prev = document.querySelector(`.word-${activeWordIndex}`);
                console.log('prev: ', prev)
                prev.style.color = 'red';
            }
            const currentIndex = activeWordIndex;
            let test = document.querySelector(`.word-${currentIndex+1}`)
            test.style.color = 'orange';
            setActiveWordIndex(currentIndex + 1);
        }
    }

    return (
        <section className="wrapper">
            <div className="buttonsWrapper">
                <button onClick={() => handleGenerateWords(10)}>10</button>
                <button onClick={() => handleGenerateWords(25)}>25</button>
                <button onClick={() => handleGenerateWords(50)}>50</button>
                <button onClick={() => handleGenerateWords(100)}>100</button>
            </div>
            <div className="wordsWrapper">
                {words.map((word:string, index:number) => {
                    return (
                        <p key={index} className={`word word-${index}`}>{word}</p>
                    )
                })}
            </div>
            <input onChange={e => handleKeyChange(e)} />
        </section>
    )
}

export default Test;