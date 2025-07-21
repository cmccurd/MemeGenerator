import { useState, useEffect } from "react";

export default function Main() {
    const [memeInfo, setMemeInfo] = useState({
        topText: 'One does not simply',
        bottomText: 'Walk into Mordor',
        imageUrl: 'http://i.imgflip.com/1bij.jpg'
    });

    const [memes, setMemes] = useState([]);

    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.imgflip.com/get_memes');
                const {data} = await response.json();
                setMemes(data.memes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    function handleChange(event) {
        const {value, name} = event.currentTarget;
        // console.log(value)
        setMemeInfo(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }

    function handleClick() {
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        const event = {currentTarget: {value: randomMeme.url, name: 'imageUrl'}};
        handleChange(event);
    }


    
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button
                    onClick={handleClick}
                >Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeInfo.imageUrl} />
                <span className="top">{memeInfo.topText}</span>
                <span className="bottom">{memeInfo.bottomText}</span>
            </div>
        </main>
    )
}