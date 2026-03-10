export default function Word({ word, letters }) {
  // Destructure 'letters'
  return (
    <div className="wordRow">
      {word.value.split("").map((each, index) => {
        // 1. Find the object for this specific letter in the alphabet state
        const letterObj = letters.find((l) => l.value === each);

        // 2. Check if that specific letter has been clicked
        const isRevealed = letterObj ? letterObj.isSelected : false;

        return (
          <div key={index} className="wordContainer">
            {/* 3. Render 'each' directly (no curly braces inside the div) */}
            {isRevealed ? each : ""}
          </div>
        );
      })}
    </div>
  );
}
