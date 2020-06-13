import React from "react";
import "./App.css";
import { Editor } from "./Editor";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={"https://codemirror.net/6/style/logo.svg"} className="App-logo" alt="logo" />
                <a className="App-link" href="https://codemirror.net/6/" target="_blank" rel="noopener noreferrer">
                    CodeMirror.next
                </a>
            </header>
            <main className={"App-body"}>
                <Editor />
            </main>
        </div>
    );
}

export default App;
