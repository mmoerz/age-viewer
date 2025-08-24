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

/*
 * Modern React-Redux container using hooks
 */

import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Editor from '../presentations/Editor';
import {
  addFrame,
  trimFrame,
  removeFrame,
} from '../../../features/frame/FrameSlice';
import { addAlert } from '../../../features/alert/AlertSlice';
import { getConnectionStatus } from '../../../features/database/DatabaseSlice';
import { executeCypherQuery } from '../../../features/cypher/CypherSlice';
import {
  addCommandHistory,
  addCommandFavorites,
  setCommand,
} from '../../../features/editor/EditorSlice';
import { toggleMenu } from '../../../features/menu/MenuSlice';
import { getMetaData } from '../../../features/database/MetadataSlice';
import { setLabel } from '../../../features/layout/LayoutSlice';

function EditorContainer() {
  // Select state from Redux store
  const dispatch = useDispatch();

  // Select state from Redux store
  const alertList = useSelector((state) => state.alerts);
  const database = useSelector((state) => state.database); // removed default initialization
  const command = useSelector((state) => state.editor.command);
  const update = useSelector((state) => state.editor.updateClause);
  const isActive = useSelector((state) => state.navigator.isActive);
  const activeRequests = useSelector((state) => state.cypher.activeRequests);
  const isLabel = useSelector((state) => state.layout.isLabel);

  // Wrap actions in useCallback for stable references
  const actions = {
    setCommand: useCallback((cmd) => dispatch(setCommand(cmd)), [dispatch]),
    addFrame: useCallback((frame) => dispatch(addFrame(frame)), [dispatch]),
    trimFrame: useCallback((frame) => dispatch(trimFrame(frame)), [dispatch]),
    removeFrame: useCallback((frame) => dispatch(removeFrame(frame)), [dispatch]),
    addAlert: useCallback((alert) => dispatch(addAlert(alert)), [dispatch]),
    getConnectionStatus: useCallback(() => dispatch(getConnectionStatus()), [dispatch]),
    executeCypherQuery: useCallback(
      (query) => dispatch(executeCypherQuery(query)),
      [dispatch],
    ),
    addCommandHistory: useCallback((cmd) => dispatch(addCommandHistory(cmd)), [dispatch]),
    addCommandFavorites: useCallback((cmd) => dispatch(addCommandFavorites(cmd)), [dispatch]),
    toggleMenu: useCallback(() => dispatch(toggleMenu()), [dispatch]),
    getMetaData: useCallback(() => dispatch(getMetaData()), [dispatch]),
    setLabel: useCallback((label) => dispatch(setLabel(label)), [dispatch]),
  };

  return (
    <Editor
      alertList={alertList}
      database={database}
      command={command}
      update={update}
      isActive={isActive}
      activeRequests={activeRequests}
      isLabel={isLabel}
      setCommand={actions.setCommand}
      addFrame={actions.addFrame}
      trimFrame={actions.trimFrame}
      removeFrame={actions.removeFrame}
      addAlert={actions.addAlert}
      getConnectionStatus={actions.getConnectionStatus}
      executeCypherQuery={actions.executeCypherQuery}
      addCommandHistory={actions.addCommandHistory}
      addCommandFavorites={actions.addCommandFavorites}
      toggleMenu={actions.toggleMenu}
      getMetaData={actions.getMetaData}
      setLabel={actions.setLabel}
    />
  );
}

export default EditorContainer;
