import './Buttons.css';

const Buttons = ({ handleGenerateWords, accuracy, wpm }) => {
  return (
    <div className="topSection">
      <div className="buttonsWrapper">
      <p onClick={() => handleGenerateWords(10)}>10</p>
      <p>/</p>
      <p onClick={() => handleGenerateWords(25)}>25</p>
      <p>/</p>
      <p onClick={() => handleGenerateWords(50)}>50</p>
      <p>/</p>
      <p onClick={() => handleGenerateWords(100)}>100</p>
      </div>
      <div className="resultsWrapper">
        {accuracy && (<p>Accuracy: {accuracy}%</p>)}
        {accuracy && (<p>WPM: {wpm}</p>)}
      </div>
    </div>
  )
}

export default Buttons;