import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { generateWords, currentTime } from "../util.js";
import Buttons from "./Buttons.tsx";
import './TypingTest.css';

const Test = () => {
  const [words, setWords] = useState([])
  const [wrongWords, setWrongWords] = useState<string[]>([]);
  const [rightWords, setRightWords] = useState<string[]>([])
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [testIsDone, setTestIsDone] = useState(false);
  const [wordCount, setWordCount] = useState(10);
  const [accuracy, setAccuracy] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);

  const inputEl = useRef(null);

  useEffect(() => {
    const initialWords = generateWords(wordCount);
    setWords(initialWords);
  }, [wordCount])

  const handleGenerateWords = (count: number) => {
    setActiveWordIndex(0);
    setWordCount(count)
  }

  useLayoutEffect(() => {
    handleGenerateWords(10);
  }, []);


  const resetTest = () => {
    setTestIsDone(false);
    setWrongWords([])
    setRightWords([])
    setActiveWordIndex(0);
    setStartTime(null);
    setWpm(null);
    setAccuracy(null)
    handleGenerateWords(wordCount)
  }

  useEffect(() => {
    if (rightWords.length + wrongWords.length === words.length && words.length >= 10) {
      const endTime = currentTime();
      calculate(startTime, endTime);
      resetInputField()
      setTestIsDone(true);
      Array.from(document.querySelectorAll('.word')).forEach((word) => {
        word.style.color = 'black';
      })
    }
  }, [rightWords, wrongWords]);

  const calculate = (startTime: number, endTime: number) => {
    let acc = (rightWords.length / words.length) * 100;
    setAccuracy(acc);
    const durationInMinutes = (endTime - startTime) / 60000.0;
    const wpm = ((words.length + 1) / durationInMinutes).toFixed(2);
    setWpm(wpm);
    console.log('wpm: ', wpm)
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
    stylePreviousWord(previousWord, '#E85F5C');
  }

  const resetInputField = () => {
    inputEl.current!.value = '';
    inputEl.current!.style.backgroundColor = '#FAFAFA';
  }

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(currentTime())
    }
    console.log('e.target.value: ', e.target.value)
    const input = e.target.value;
    const activeWord = words[activeWordIndex];
    const previousWord = document.querySelector(`.word-${activeWordIndex}`);
    const currentInputIsCorrect = activeWord.indexOf(input.replace(/ /g, '')) > -1;
    if (currentInputIsCorrect) {
      inputEl.current!.style.backgroundColor = '#FAFAFA';
    } else {
      inputEl.current!.style.backgroundColor = '#DC9596';
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
    <section className="page-wrapper">
      <div className="test-wrapper">
        {words[activeWordIndex] ? (
          <h1>{words[activeWordIndex]}</h1>
        )
        : (
          <div className="wpmAndAcc">
            <h3><span>words per minite</span> {wpm}</h3>
            <h3><span>accuracy</span> {accuracy}%</h3>
          </div>
        )
      }
        <section className="wrapper">
          <Buttons {...{ handleGenerateWords, accuracy, wpm }} />
          <div className="wordsWrapper">
            {words.map((word: string, index: number) => {
              return (
                <p key={index} className={`word word-${index}`}>{word}</p>
              )
            })}
          </div>
          <div className="inputWrapper">
          <input onChange={e => handleKeyChange(e)} ref={inputEl} disabled={testIsDone} />
          {testIsDone && (
            <button onClick={() => resetTest()}>redo</button>
          )}
          </div>
        </section>
      </div>
    </section>
  )
}

export default Test;