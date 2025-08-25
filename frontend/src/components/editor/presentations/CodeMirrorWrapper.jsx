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

import React from 'react';
// import React, { useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
// import { kimbie } from '@uiw/codemirror-theme-kimbie';
// import {
//   EditorView,
//   keymap,
// } from '@codemirror/view';
// import { LanguageSupport } from '@neo4j-cypher/react-codemirror'; // Example, adjust as needed
// cypher support seams to be broken with neo4j-cypher 0.4.6, so using basic sql support for now

// import { sql } from '@codemirror/lang-sql';
import './CodeMirror.scss';
import PropTypes from 'prop-types';

function CodeMirrorWrapper({
  value, onChange, commandHistory, // onClick,
}) {
  // const [commandHistoryIndex, setCommandHistoryIndex] = useState(commandHistory.length);
  // const codeMirrorRef = useRef();

  // Attach click handler to the editor DOM node
  /*
  React.useEffect(() => {
    // old codemirror api v5
    // if (typeof onClick === 'function' && codeMirrorRef.current) {
    //  const editorDOM = codeMirrorRef.current.editor?.contentDOM;
    //  if (editorDOM) {
    //    editorDOM.addEventListener('click', onClick);
    //    return () => editorDOM.removeEventListener('click', onClick);
    //  }
    // }
    if (typeof onClick === 'function' && editorRef.current?.view) {
      // updated to new codemirror api v6
      const dom = editorRef.current.view.dom;
      dom.addEventListener('click', onClick);
      return () => dom.removeEventListener('click', onClick);
    }
    return undefined;
  }, [onClick]);
*/
  // Define custom keymaps
  /* const customKeymap = [
    {
      key: 'Shift-Enter',
      run: () => {
        onChange('');
        setCommandHistoryIndex(commandHistory.length);
        return true;
      },
    },
    {
      key: 'Ctrl-Enter',
      run: () => {
        onChange('');
        setCommandHistoryIndex(commandHistory.length);
        return true;
      },
    },
    {
      key: 'Ctrl-Up',
      run: () => {
        if (!commandHistory || commandHistory.length === 0) return true;

        let newIndex = commandHistoryIndex;
        if (commandHistoryIndex <= 0) {
          newIndex = commandHistory.length - 1; // wrap to last
        } else {
          newIndex = commandHistoryIndex - 1;
        }

        onChange(commandHistory[newIndex] || '');
        setCommandHistoryIndex(newIndex);
        return true;
      },
    },
    {
      key: 'Ctrl-Down',
      run: () => {
        if (!commandHistory || commandHistory.length === 0) return true;

        let newIndex = commandHistoryIndex;
        if (commandHistoryIndex === commandHistory.length - 1 || commandHistoryIndex === -1) {
          newIndex = -1; // reset to empty
        } else {
          newIndex = commandHistoryIndex + 1;
        }

        onChange(newIndex === -1 ? '' : commandHistory[newIndex]);
        setCommandHistoryIndex(newIndex);
        return true;
      },
    },
  ];
  */

  // eslint-disable-next-line no-unused-vars
  const onChangeI = React.useCallback((val, _viewUpdate) => {
    console.log('val:', val);
  }, []);

  console.log('Rendering CodeMirrorWrapper');
  console.log('commandHistory:', commandHistory);
  // console.log('commandHistoryIndex:', commandHistoryIndex);
  console.log('value:', value);
  // console.log('kimbie:', kimbie);
  console.log('onChange:', onChange);
  // console.log('onClick:', onClick);

  // yeah hardcoded for debugging
  return (
    <CodeMirror
      value=""
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={() => {}}
    />
  );

  /*
  return (
    <CodeMirror
      id="editor"
      ref={codeMirrorRef}
      value={value}
      height="auto"
      theme={kimbie}
      extensions={[
        sql(),
        keymap.of(customKeymap),
        EditorView.lineWrapping,
      ]}
      placeholder="Create a query..."
      onChange={(onchValue, viewUpdate) => onChange(onchValue, viewUpdate)}
      basicSetup={{
        lineNumbers: true,
        tabSize: 4,
      }}
    />
  );
  */
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
  // onClick: PropTypes.func,
};

// CodeMirrorWrapper.defaultProps = {
//   onClick: undefined,
// };

export default CodeMirrorWrapper;
