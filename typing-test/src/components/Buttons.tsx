import './Buttons.css';

const Buttons = ({ handleGenerateWords, accuracy }) => {
  return (
    <div className="buttonsWrapper">
        <p onClick={() => handleGenerateWords(10)}>10</p>
        <p>/</p>
        <p onClick={() => handleGenerateWords(25)}>25</p>
        <p>/</p>
        <p onClick={() => handleGenerateWords(50)}>50</p>
        <p>/</p>
        <p onClick={() => handleGenerateWords(100)}>100</p>
        {accuracy && (<p>Accuracy: {accuracy}%</p>)}
    </div>
  )
}

export default Buttons;