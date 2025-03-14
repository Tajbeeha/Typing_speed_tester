import React, { useState, useEffect } from "react";
import "./Test_styles.css";

const paragraphs = [
  "One day, a mighty lion was sleeping in the jungle when a little mouse accidentally ran across his paw. The lion woke up and caught the mouse, ready to eat it. The mouse pleaded, \"Please, let me go, and someday I’ll repay your kindness.\" The lion laughed but decided to let the mouse go. A few days later, the lion got caught in a hunter’s net. The mouse heard his roar, ran to him, and chewed through the ropes to free him. The lion was grateful and realized even small creatures can make a big difference.",
  "A clever monkey and a crocodile became friends. One day, the crocodile’s wife demanded the monkey’s heart to eat. The crocodile invited the monkey for a ride on his back, planning to drown him. But the clever monkey tricked the crocodile, saying he had left his heart on a tree, and escaped. This story teaches that intelligence can often overcome brute strength.",
  "If your child is old enough, it might be helpful to discuss a story in-depth after they finish reading it. Stories have power, and they can prove to be teachable moments. Moral stories such as the popular thirsty crow story or the greedy dog story in English can teach our kids important life lessons. These discussions also offer an opportunity for you to bond with your kids.",
  "Short moral stories for kids are the best way to teach valuable life lessons to kids. It is a fun and easy way through which children can understand complex concepts. Short stories work well as they’re just long enough for your child to concentrate.",
  "There once was a boy who grew bored while watching over the village sheep. He wanted to make things more exciting. So, he yelled out that he saw a wolf chasing the sheep. All the villagers came running to drive the wolf away. However, they saw no wolf. The boy was amused, but the villagers were not. They told him not to do it again. Shortly after, he repeated this antic. The villagers came running again, only to find that he was lying. Later that day, the boy really sees a wolf sneaking amongst the flock. "
];

const TypingSpeedTester = () => {
  const [text, setText] = useState(paragraphs[0]);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [currentPage, setCurrentPage] = useState(0);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        
      }, 1000);
    } else if (timeLeft === 0) {
      calculateResults();
      setIsRunning(false);
      setShowResults(true);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    updateWPM();
  }, [userInput, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    setUserInput("");
    setTimeLeft(60);
    setMistakes(0);
    setWPM(0);
    setAccuracy(100);
    setTypedCharacters(0);
    setShowResults(false);
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    setUserInput(inputText);
    setTypedCharacters(inputText.length);

    let errorCount = 0;
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] !== text[i]) {
        errorCount++;
      }
    }
    setMistakes(errorCount);
  };

  const updateWPM = () => {
    if (typedCharacters > 0 && timeLeft < 60) {
      const wordsTyped = typedCharacters / 5;
      const timeElapsed = 60 - timeLeft;
      setWPM(Math.round((wordsTyped / (timeElapsed / 60))));
    }
  };

  const calculateResults = () => {
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const timeElapsed = 60; 
    const calculatedWPM = timeElapsed > 0 ? Math.round((wordsTyped / (timeElapsed / 60))) : 0;
    const calculatedAccuracy = text.length > 0 ? Math.round(((text.length - mistakes) / text.length) * 100) : 0;

    setWPM(calculatedWPM);
    setAccuracy(calculatedAccuracy);
  };


  const handleComplete = () => {
    setIsRunning(false);
    calculateResults();
    setShowResults(true);
  };


  const handleRestart = () => {
    setUserInput("");
    setTimeLeft(60);
    setMistakes(0);
    setWPM(0);
    setAccuracy(100);
    setTypedCharacters(0);
    setIsRunning(false);
    setShowResults(false);
  };


  const handleNextParagraph = () => {
    const nextIndex = (currentPage + 1) % paragraphs.length;
    setCurrentPage(nextIndex);
    setText(paragraphs[nextIndex]);
    handleRestart();
  };


  return (
    <div className="typing-container">
      <h2>Typing Speed Tester</h2>
      <p className="text-display">
      {text.split("").map((char, index) => {
          let color = "";
          if (userInput[index]) {
            color = userInput[index] === char ? "correct" : "incorrect";
          }
          return (
            <span key={index} className={color}>
              {char}
            </span>
          );
        })}
      </p>

      <textarea
        placeholder="Start typing here..."
        value={userInput}
        onChange={handleChange}
        disabled={!isRunning}
      ></textarea>

      <div className="stats">
        <p>Time Left: {timeLeft}s</p>
        <p>Mistakes: {mistakes}</p>
        <p>WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>

      <div className="buttons">
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handleComplete} disabled={!isRunning}>Complete</button>
        <button onClick={handleRestart}>Restart</button>
        <button onClick={handleNextParagraph}>Next Paragraph</button>
      </div>

      {showResults && (
        <div className="results-container">
          <h3>Test Completed!</h3>
          <p>Your typing speed: {wpm} WPM</p>
          <p>Accuracy: {accuracy}%</p>
        </div>
      )}

    </div>
  );
};

export default TypingSpeedTester;
