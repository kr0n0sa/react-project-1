export default function Keyboard({
  initialLetters,
  onKeyPress,
  didIWin,
  word,
}) {
  return (
    <div className="keyboard-container" disabled={didIWin}>
      {initialLetters.map((each) => (
        <button
          key={each.id}
          // If selected AND word does NOT include value, add "wrong" class
          className={`keyboardKey 
    ${each.isSelected ? "clicked" : ""} 
    ${each.isSelected && !word.includes(each.value) ? "wrong" : ""}
  `}
          onClick={() => onKeyPress(each.value)}
          disabled={each.isSelected || didIWin} // Disable if already clicked OR if game is over
        >
          {each.value}
        </button>
      ))}
    </div>
  );
}
