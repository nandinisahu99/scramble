import { useEffect,useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [wordText, setWordText] = useState('');
  const [hintText, setHintText] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [inputValue, setInputValue] = useState('');
  let correctWord, timer;

  const words=[
    {
      //id: 1,
      word: "addition",
      hint: "The process of adding numbers"
    },
    {
      //id: 2,
      word: "meeting",
      hint: "Event in which people come together"
    },
    {
      //id: 3,
      word: "number",
      hint: "Math symbol used for counting"
    },
    {
      //id: 4,
      word: "exchange",
      hint: "The act of trading"
    },
    {
      //id: 5,
      word: "garden",
      hint: "Space for planting flower and plant"
    }
  ];
  
  useEffect(() => {
    initGame();
  }, []);

  const initTimer = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (maxTime > 0) {
        maxTime--;
        return setTimeLeft(maxTime);
      }
      alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
      initGame();
    }, 1000);
  };

  const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    setWordText(wordArray.join(""));
    setHintText(randomObj.hint);
    correctWord = randomObj.word.toLowerCase();
    setInputValue("");
    // setAttribute("maxlength", correctWord.length);
  };

  const checkWord = () => {
    let userWord = inputValue.toLowerCase();
    console.log(userWord);
    if (!userWord) return alert("Please enter the word to check!");
    if (userWord !== correctWord)
      return alert(`Oops! ${userWord} is not a correct word`);
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
  };

  return (
    <div className="container">
      <h2>Word Scramble</h2>
      <div className="content">
        <p className="word">{wordText}</p>
        <div className="details">
          <p className="hint">Hint: <span>{hintText}</span></p>
          <p className="time">Time Left: <span><b>{timeLeft}</b>s</span></p>
        </div>
        <input
          type="text"
          spellCheck={false} 
          placeholder="Enter a valid word"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // maxLength={correctWord.length}
        />
        <div className="buttons">
          <button className="refresh-word" onClick={initGame}>Refresh Word</button>
          <button className="check-word" onClick={checkWord}>Check Word</button>
        </div>
      </div>
    </div>
  );
};

export default App
