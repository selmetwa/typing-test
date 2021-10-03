import './Buttons.css';
import { useState } from 'react';

const Buttons = ({ handleGenerateWords }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  return (
    <div className="topSection">
      <div className="buttonsWrapper">
      <p onClick={() => handleGenerateWords(10)} id="1">10</p>
      <p>/</p>
      <p onClick={() => handleGenerateWords(25)} id="2">25</p>
      <p>/</p>
      <p onClick={() => handleGenerateWords(50)} id="2">50</p>
      </div>
    </div>
  )
}

export default Buttons;