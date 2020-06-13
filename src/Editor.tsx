import "./Editor.css";
import { EditorView } from "@codemirror/next/view";
import { EditorState } from "@codemirror/next/state";
import { lineNumbers } from "@codemirror/next/gutter";
import { specialChars } from "@codemirror/next/special-chars";
import { history, historyKeymap } from "@codemirror/next/history/src/history";
import { foldGutter, foldKeymap } from "@codemirror/next/fold";
import { multipleSelections } from "@codemirror/next/multiple-selections";
import { bracketMatching } from "@codemirror/next/matchbrackets";
import { closeBrackets } from "@codemirror/next/closebrackets";
import { autocomplete, startCompletion } from "@codemirror/next/autocomplete";
import { keymap } from "@codemirror/next/keymap";
import { defaultKeymap, indentSelection } from "@codemirror/next/commands";
import { searchKeymap } from "@codemirror/next/search";
import { commentKeymap } from "@codemirror/next/comment";
import { gotoLine } from "@codemirror/next/goto-line";
import React, { createRef, useCallback, useEffect, useState } from "react";

export const Editor = () => {
    const ref = createRef<HTMLDivElement>();
    const [editor, setEditor] = useState();
    const onClick = useCallback(() => {
        console.log(editor);
    }, [editor]);
    useEffect(() => {
        if (ref.current && !editor) {
            const editorView = new EditorView({
                state: EditorState.create({
                    doc: "",
                    extensions: [
                        lineNumbers(),
                        specialChars(),
                        history(),
                        foldGutter(),
                        multipleSelections(),
                        bracketMatching(),
                        closeBrackets,
                        autocomplete(),
                        keymap([
                            ...defaultKeymap,
                            ...searchKeymap,
                            ...historyKeymap,
                            ...foldKeymap,
                            ...commentKeymap,
                            //...lintKeymap,
                            { key: "Alt-g", run: gotoLine },
                            { key: "Shift-Tab", run: indentSelection },
                            { key: "Mod-Space", run: startCompletion },
                        ]),
                    ],
                }),
            });
            setEditor(editorView);
            ref.current.append(editorView.dom);
        }
        return () => {
            console.log("dispose");
        };
    }, [ref, editor]);
    return (
        <div className={"Editor"}>
            <div className={"EditorWrapper"} ref={ref} />
            <button onClick={onClick}>Click</button>
        </div>
    );
};
