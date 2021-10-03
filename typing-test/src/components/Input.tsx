import './Input.css';

interface Props {
  testIsDone: boolean,
  handleKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  resetTest: () => void
}

const Input = ({handleKeyChange, testIsDone, resetTest}: Props) => (
  <div className="inputWrapper">
  <input onChange={e => handleKeyChange(e)} disabled={testIsDone} />
    {testIsDone && (
      <button onClick={() => resetTest()}>redo</button>
    )}
  </div>
)

export default Input;