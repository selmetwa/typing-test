import './Buttons.css';
import { useState } from 'react';

interface Props  {
  handleGenerateWords: (count:number) => []
}

const Buttons = ({ handleGenerateWords }: Props) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(1);

  return (
    <div className="topSection">
      <div className="buttonsWrapper">
      <p 
        className={activeButtonIndex === 1 ? 'active-button' : ''}
        onClick={() => { handleGenerateWords(10); setActiveButtonIndex(1) }}
      >10</p>
      <p>/</p>
      <p 
      className={activeButtonIndex === 2 ? 'active-button' : ''}
      onClick={() => { handleGenerateWords(25); setActiveButtonIndex(2) }} id="2">25
      </p>
      <p>/</p>
      <p
      className={activeButtonIndex === 3 ? 'active-button' : ''}
      onClick={() => { handleGenerateWords(50); setActiveButtonIndex(3) }} id="2">50</p>
      </div>
    </div>
  )
}

export default Buttons;