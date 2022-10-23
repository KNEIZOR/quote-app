import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [quotes, setQuotes] = useState({});
    const colors = [
        "#16a085",
        "#27ae60",
        "#2c3e50",
        "#f39c12",
        "#e74c3c",
        "#9b59b6",
        "#FB6964",
        "#342224",
        "#472E32",
        "#BDBB99",
        "#77B1A9",
        "#73A857",
    ];

    const body = useRef();
    const text = useRef();
    const author = useRef();
    const newQuoteBtn = useRef();
    const vkBtn = useRef();
    const githubBtn = useRef();

    function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    useEffect(() => {
        fetchQuotes();
        randomColor();
    }, []);

    function randomColor() {
        let color = random(0, colors.length - 1);
        body.current.style.background = colors[color];
        text.current.style.color = colors[color];
        author.current.style.color = colors[color];
        newQuoteBtn.current.style.background = colors[color];
        vkBtn.current.style.background = colors[color];
        githubBtn.current.style.background = colors[color];
    }

    async function fetchQuotes() {
        const response = await fetch(`https://favqs.com/api/qotd`);
        const json = await response.json();
        return setQuotes(json);
    }

    return (
        <div className="App">
            <div className="body" ref={body}>
                <div className="quote__wrapper">
                    <div className="quote">
                        <div className="quote-text">
                            <p className="text" ref={text}>
                                <i className="fa-sharp fa-solid fa-quote-left"></i>{" "}
                                {quotes.quote?.body}{" "}
                                <i className="fa-solid fa-quote-right"></i>
                            </p>
                        </div>
                        <div className="quote-author">
                            <p className="author" ref={author}>
                                - {quotes.quote?.author}
                            </p>
                        </div>
                        <div className="buttons">
                            <div className="left-btn">
                                <a
                                    href="https://vk.com/kneizor"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    ref={vkBtn}
                                >
                                    <i className="fa-brands fa-vk"></i>
                                </a>
                                <a
                                    href="https://github.com/KNEIZOR"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    ref={githubBtn}
                                >
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </div>
                            <div className="right-btn">
                                <button
                                    ref={newQuoteBtn}
                                    onClick={() => {
                                        fetchQuotes();
                                        randomColor();
                                    }}
                                >
                                    New quote
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
