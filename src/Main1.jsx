import { useState, useEffect } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "walk into Mordor",
    image: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);
  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  function handleClick() {
    const newUrl = allMemes[Math.floor(Math.random() * allMemes.length)].url;
    setMeme({ ...meme, image: newUrl });
  }
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);
  return (
    <main>
      <div className="form">
        <label>
          {" "}
          top text
          <input
            type="text"
            placeholder={meme.topText}
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          {" "}
          bottom Text
          <input
            onChange={handleChange}
            type="text"
            placeholder={meme.bottomText}
            name="bottomText"
          />
        </label>
        <button onClick={handleClick}> Get a new meme image</button>
      </div>
      <div className="meme">
        <img src={meme.image} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
