import './Buttons.css';
import { useState } from 'react';

const Buttons = ({ handleGenerateWords }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(1);

  return (
    <div className="topSection">
      <div className="buttonsWrapper">
      <p 
        className={activeButtonIndex === 1 ? 'active-button' : null}
        onClick={() => { handleGenerateWords(10); setActiveButtonIndex(1) }}
      >10</p>
      <p>/</p>
      <p 
      className={activeButtonIndex === 2 ? 'active-button' : null}
      onClick={() => { handleGenerateWords(25); setActiveButtonIndex(2) }} id="2">25</p>
      <p>/</p>
      <p
      className={activeButtonIndex === 3 ? 'active-button' : null}
      onClick={() => { handleGenerateWords(50); setActiveButtonIndex(3) }} id="2">50</p>
      </div>
    </div>
  )
}

export default Buttons;