import './Buttons.css';

const Buttons = ({ handleGenerateWords }) => {
  return (
    <div className="buttonsWrapper">
        <p onClick={() => handleGenerateWords(10)}>10 Words</p>
        <p>/</p>
        <p onClick={() => handleGenerateWords(25)}>25 Words</p>
        <p>/</p>
        <p onClick={() => handleGenerateWords(50)}>50 Words</p>
        <p>/</p>
        <p onClick={() => handleGenerateWords(100)}>100 Words</p>
    </div>
  )
}

export default Buttons;