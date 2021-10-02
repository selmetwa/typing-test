import React, { useState, useEffect, useRef } from "react";
import useKeyPress from "../hooks/useKeyPress.js";
import { generateWords } from "../util.js";
import './Test.css';

const Test = () => {
  const [words, setWords] = useState([])
  const [wrongWords, setWrongWords] = useState<string[]>([]);
  const [rightWords, setRightWords] = useState<string[]>([])
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [lastKey, setLastKey] = useState(null);

  const inputEl = useRef(null);
  
  const handleGenerateWords = (count: number) => {
    const initialWords = generateWords(count);
    setWords(initialWords)
  }

  useEffect(() => {
    handleGenerateWords(10);
  }, []);


  const stylePreviousWord = (previousWord:Element, color:string) => {
    if (previousWord instanceof HTMLElement) {
      previousWord.style.color = color;
    } else {
      throw new Error(`element not in document`)
    }
  }

  const addToRightWords = (word:string, previousWord:Element) => {
    let newRightWords = [...rightWords];
    newRightWords.push(word)
    setRightWords(newRightWords);
    stylePreviousWord(previousWord, 'green')
  }

  const addToWrongWords = (word:string, previousWord:Element) => {
    let newWrongWords = [...wrongWords];
    newWrongWords.push(word)
    setWrongWords(newWrongWords);
    stylePreviousWord(previousWord, 'red')
  }

  const resetInputField = () => {
    inputEl.current!.value = '';
  }

  useKeyPress((key: any) => {
    setLastKey(key);
  })

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const activeWord = words[activeWordIndex];
    const previousWord = document.querySelector(`.word-${activeWordIndex}`);
    const currentInputIsCorrect = activeWord.indexOf(input.replace(/ /g, '')) > -1;
    if (currentInputIsCorrect) {
      inputEl.current!.style.backgroundColor = 'white';
    } else {
      inputEl.current!.style.backgroundColor = 'red';
    }
    if (input.replace(/ /g, '').length > 0 && input.charAt(input.length - 1) === ' ') {
      resetInputField();
      const inputMatchesWord = input.replace(/ /g, '') === words[activeWordIndex];

      inputMatchesWord ? addToRightWords(activeWord, previousWord) : addToWrongWords(activeWord, previousWord);

      const currentIndex = activeWordIndex;
      let test = document.querySelector(`.word-${currentIndex + 1}`)
      test && test.style ? test.style.color = 'orange' : null;
      setActiveWordIndex(currentIndex + 1);
      if (words[activeWordIndex] === words[words.length-1]) {
        resetInputField()
      }
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
        {words.map((word: string, index: number) => {
          return (
            <p key={index} className={`word word-${index}`}>{word}</p>
          )
        })}
      </div>
      <section style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <div>
          <h1>wrong words</h1>
          {
            wrongWords.map((word) => {
              return (
                <p style={{ color: 'red' }}>{word}</p>
              )
            })
          }
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <h1>right words</h1>
          {
            rightWords.map((word) => {
              return (
                <p style={{ color: 'green' }}>{word}</p>
              )
            })
          }
        </div>
      </section>
      <input onChange={e => handleKeyChange(e)} ref={inputEl} />
    </section>
  )
}

export default Test;