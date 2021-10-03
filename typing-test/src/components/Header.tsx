import './Header.css';

interface Props {
  activeWord: string,
  wpm: number | null,
  accuracy: number | null
}

const Header = ({ activeWord, wpm, accuracy }: Props) => (
  <section>
    {activeWord ? (
      <h1>{activeWord}</h1>
    )
      : (
        <div className="wpmAndAcc">
          <h3><span>wpm</span> {wpm}</h3>
          <h3><span>accuracy</span> {accuracy}%</h3>
        </div>
      )
    }
  </section>
)

export default Header;