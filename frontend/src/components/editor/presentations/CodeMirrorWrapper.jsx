/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {
  EditorView,
  keymap,
} from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
// import '@codemirror/autocomplete';
// import { LanguageSupport } from '@neo4j-cypher/react-codemirror'; // Example, adjust as needed
// cypher support seams to be broken with neo4j-cypher 0.4.6, so using basic sql support for now

import { sql } from '@codemirror/lang-sql';
import './CodeMirror.scss';
import PropTypes from 'prop-types';

function CodeMirrorWrapper({
  value, onChange, commandHistory, onClick,
}) {
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(commandHistory.length);
  const codeMirrorRef = useRef();

  // Attach click handler to the editor DOM node
  React.useEffect(() => {
    if (typeof onClick === 'function' && codeMirrorRef.current) {
      const editorDOM = codeMirrorRef.current.editor?.contentDOM;
      if (editorDOM) {
        editorDOM.addEventListener('click', onClick);
        return () => editorDOM.removeEventListener('click', onClick);
      }
    }
    return undefined;
  }, [onClick]);

  // Define custom keymaps
  const customKeymap = [
    {
      key: 'Shift-Enter',
      run: () => { onChange(''); setCommandHistoryIndex(-1); return true; },
    },
    {
      key: 'Ctrl-Enter',
      run: () => { onChange(''); setCommandHistoryIndex(-1); return true; },
    },
    {
      key: 'Ctrl-Up',
      run: () => {
        if (commandHistory.length === 0) return true;
        if (commandHistoryIndex === -1) {
          const currentIdx = commandHistory.length - 1;
          onChange(commandHistory[currentIdx]);
          setCommandHistoryIndex(currentIdx);
          return true;
        }
        if (commandHistoryIndex === 0) {
          onChange(commandHistory[0]);
          setCommandHistoryIndex(0);
          return true;
        }
        onChange(commandHistory[commandHistoryIndex - 1]);
        setCommandHistoryIndex(commandHistoryIndex - 1);
        return true;
      },
    },
    {
      key: 'Ctrl-Down',
      run: () => {
        if (commandHistory.length === 0) return true;
        if (commandHistoryIndex === -1) {
          onChange('');
          return true;
        }
        if (commandHistoryIndex === (commandHistory.length - 1)) {
          onChange('');
          setCommandHistoryIndex(-1);
          return true;
        }
        onChange(commandHistory[commandHistoryIndex + 1]);
        setCommandHistoryIndex(commandHistoryIndex + 1);
        return true;
      },
    },
  ];

  return (
    <CodeMirror
      id="editor"
      ref={codeMirrorRef}
      value={value}
      height="auto"
      theme={oneDark}
      extensions={[
        sql(),
        keymap.of(customKeymap),
        EditorView.lineWrapping,
      ]}
      placeholder="Create a query..."
      onChange={(val) => onChange(val)}
      basicSetup={{
        lineNumbers: true,
        tabSize: 4,
      }}
    />
  );
  /* stale code with more complex resizing logic
      onChange={(editor) => {
        onChange(editor.getValue());
        const lineCount = editor.lineCount();
        let draggedHeight;
        let height;
        if (lineCount <= 1) {
          editor.setOption('lineNumberFormatter', () => '$');
        } else {
          editor.setOption('lineNumberFormatter', (number) => number);
          draggedHeight = document.getElementById('codeMirrorEditor').style.height;
          if (draggedHeight) {
            [height] = draggedHeight.split('px');
            if (height < (58 + 21 * lineCount)) {
              document.getElementById('codeMirrorEditor').style.height = null;
            }
          }
        }
        return true;
      }}
    />
  );
  */
}

CodeMirrorWrapper.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  commandHistory: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};

CodeMirrorWrapper.defaultProps = {
  onClick: undefined,
};

export default CodeMirrorWrapper;
