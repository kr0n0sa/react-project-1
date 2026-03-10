export default function End(props) {
  return (
    <div className={props.didIWin ? "Won" : "Lost"}>
      <p id="result">{props.didIWin ? "You win. Congrats." : "Game Over"}</p>
      <p id="message">
        {
          <>
            <div className="no-shawarma">
              looks like someone wont be getting a shawarma this evening.
            </div>
            <div className="reveal-word">
              Also, the correct answer was: <strong>{props.word}</strong>
            </div>
          </>
        }
      </p>
    </div>
  );
}
