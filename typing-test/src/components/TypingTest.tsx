import React, { useState, useEffect, useRef } from "react";
import { generateWords } from "../util.js";
import Buttons from "./Buttons.tsx";
import './TypingTest.css';

/**
 * TODO
 * [x] move buttons to separate component
 * [] calculate accuracy
 * [] rename variables and files, remove unused things
 * [] make it look better
 */

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


  const stylePreviousWord = (previousWord: Element, color: string) => {
    if (previousWord instanceof HTMLElement) {
      previousWord.style.color = color;
    } else {
      throw new Error(`element not in document`)
    }
  }

  const addToRightWords = (word: string, previousWord: Element) => {
    let newRightWords = [...rightWords];
    newRightWords.push(word)
    setRightWords(newRightWords);
    stylePreviousWord(previousWord, '#6FC37D')
  }

  const addToWrongWords = (word: string, previousWord: Element) => {
    let newWrongWords = [...wrongWords];
    newWrongWords.push(word)
    setWrongWords(newWrongWords);
    stylePreviousWord(previousWord, '#E85F5C')
  }

  const resetInputField = () => {
    inputEl.current!.value = '';
  }

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const activeWord = words[activeWordIndex];
    const previousWord = document.querySelector(`.word-${activeWordIndex}`);
    const currentInputIsCorrect = activeWord.indexOf(input.replace(/ /g, '')) > -1;
    if (currentInputIsCorrect) {
      inputEl.current!.style.backgroundColor = '#FAFAFA';
    } else {
      inputEl.current!.style.backgroundColor = '#E85F5C';
    }
    if (input.replace(/ /g, '').length > 0 && input.charAt(input.length - 1) === ' ') {
      resetInputField();
      const inputMatchesWord = input.replace(/ /g, '') === words[activeWordIndex];

      inputMatchesWord ? addToRightWords(activeWord, previousWord) : addToWrongWords(activeWord, previousWord);

      const currentIndex = activeWordIndex;
      let test = document.querySelector(`.word-${currentIndex + 1}`)
      test && test.style ? test.style.color = '#258EA6' : null;
      setActiveWordIndex(currentIndex + 1);
      if (words[activeWordIndex] === words[words.length - 1]) {
        resetInputField()
      }
    }
  }

  return (
    <section className="wrapper">
      <Buttons {...{ handleGenerateWords }} />
      <div className="wordsWrapper">
        {words.map((word: string, index: number) => {
          return (
            <p key={index} className={`word word-${index}`}>{word}</p>
          )
        })}
      </div>
      <input onChange={e => handleKeyChange(e)} ref={inputEl} />
    </section>
  )
}

export default Test;