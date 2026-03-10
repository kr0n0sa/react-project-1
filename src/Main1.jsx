import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Header from "./Header";
import End from "./End";
import Keyboard from "./Keyboard";
import Word from "./Word";
import WordCreator from "./words";
import PlayAgain from "./playAgain";
const alphabet = "qwertyuiopasdfghjklzxcvbnm";
const initialLetters = alphabet.split("").map((char) => ({
  id: nanoid(),
  value: char,
  isSelected: false,
}));

export default function Main() {
  const [endObj, setEndObj] = useState({});
  const [count, setCount] = useState(0);
  const [word, setWord] = useState({ value: WordCreator(), key: nanoid() });
  const [letters, setLetters] = useState(initialLetters);
  const [tryCount, setTryCount] = useState(0);
  const [initialisator, setInitialisator] = useState(false);

  function guessChecker(guessValue) {
    if (initialisator) return;
    const alreadyGuessed = letters.find(
      (l) => l.value === guessValue,
    ).isSelected;
    if (alreadyGuessed) return;

    setLetters((prev) =>
      prev.map((letter) =>
        letter.value === guessValue ? { ...letter, isSelected: true } : letter,
      ),
    );

    const matchesInClick = [...word.value].filter(
      (char) => char === guessValue,
    ).length;

    if (matchesInClick > 0) {
      setCount((prev) => prev + matchesInClick);
    } else {
      setTryCount((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (count > 0 && count === word.value.length) {
      setEndObj({ didIWin: true });
      setInitialisator(true);
    }

    if (tryCount >= 8) {
      setEndObj({ didIWin: false });
      setInitialisator(true);
    }
  }, [count, tryCount, word.value]); //

  function click() {
    setEndObj({});
    setCount(0);
    setInitialisator(false);
    setLetters(initialLetters);
    setTryCount(0);
    setWord({ value: WordCreator(), key: nanoid() });
  }

  return (
    <main>
      <Header />
      <Word word={word} letters={letters}></Word>
      {initialisator && <End didIWin={endObj.didIWin} word={word.value} />}
      <Keyboard
        onKeyPress={guessChecker}
        didIWin={endObj.didIWin}
        initialLetters={letters}
        word={word.value}
      ></Keyboard>
      <PlayAgain click={click}></PlayAgain>
    </main>
  );
}
