import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { generateWords } from "../util.js";
import Buttons from "./Buttons.tsx";
import './TypingTest.css';

/**
 * TODO
 * [x] move buttons to separate component
 * [x] rename variables and files, remove unused things
 * [x] calculate accuracy
 * [] make it look better
 */

const Test = () => {
  const [words, setWords] = useState([])
  const [wrongWords, setWrongWords] = useState<string[]>([]);
  const [rightWords, setRightWords] = useState<string[]>([])
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const inputEl = useRef(null);

  const handleGenerateWords = (count: number) => {
    const initialWords = generateWords(count);
    setWords(initialWords);

  }

  useLayoutEffect(() => {
    handleGenerateWords(10);
  }, []);


  useEffect(() => {
    if (rightWords.length + wrongWords.length === words.length) {
      calculate();
      resetInputField()
    }
  }, [rightWords, wrongWords]);

  const calculate = () => {
    let acc = (rightWords.length / words.length) * 100;
    console.log('acc: ', acc);
    console.log('rightWords: ', rightWords);
    console.log('wrongWords: ', wrongWords);
  }

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
    stylePreviousWord(previousWord, '#6FC37D');
  }

  const addToWrongWords = (word: string, previousWord: Element) => {
    let newWrongWords = [...wrongWords];
    newWrongWords.push(word)
    setWrongWords(newWrongWords);
    console.log('newWrongWords: ', newWrongWords);
    stylePreviousWord(previousWord, '#E85F5C');
  }

  const resetInputField = () => {
    inputEl.current!.value = '';
    inputEl.current!.style.backgroundColor = '#FAFAFA';
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