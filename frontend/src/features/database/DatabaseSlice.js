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

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

class DatabaseError extends Error {
  constructor(name, message, statusText) {
    super(message);
    this.name = name;
    this.statusText = statusText;
  }
}

export const connectToDatabase = createAsyncThunk(
  'database/connectToDatabase',
  async (formData) => {
    try {
      const response = await fetch('/api/v1/db/connect', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) return await response.json();
      throw response;
    } catch (error) {
      const errorJson = await error.json();
      throw new DatabaseError(
        'Failed to create Connection Information',
        `[${errorJson.severity}]:(${errorJson.code}) ${errorJson.message}`,
        error.statusText,
      );
    }
  },
);

export const disconnectToDatabase = createAsyncThunk(
  'database/disconnectToDatabase',
  async () => {
    await fetch('/api/v1/db/disconnect');
  },
);

export const getConnectionStatus = createAsyncThunk(
  'database/getConnectionStatus',
  async () => {
    try {
      const response = await fetch('/api/v1/db');
      if (response.ok) return await response.json();
      throw response;
    } catch (error) {
      const errorJson = await error.json();
      throw new DatabaseError(
        'Failed to Retrieve Connection Information',
        `[${errorJson.severity}]:(${errorJson.code}) ${errorJson.message}`,
        error.statusText,
      );
    }
  },
);

const initialState = {
  host: 'localhost', // default host
  port: 5432, // default port for AgensGraph
  user: '',
  password: '',
  database: '',
  graph: '',
  status: 'init',
};

const DatabaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    changeGraph: (state, action) => {
      state.graph = action.payload.graphName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectToDatabase.fulfilled, (state, action) => {
        Object.assign(state, {
          ...action.payload,
          status: 'connected',
        });
      })
      .addCase(connectToDatabase.rejected, (state) => {
        Object.assign(state, { ...initialState, status: 'disconnected' });
      })
      .addCase(disconnectToDatabase.fulfilled, (state) => {
        Object.assign(state, { ...initialState, status: 'disconnected' });
      })
      .addCase(getConnectionStatus.fulfilled, (state, action) => {
        Object.assign(state, {
          ...action.payload,
          status: 'connected',
        });
      })
      .addCase(getConnectionStatus.rejected, (state) => {
        Object.assign(state, { ...initialState, status: 'disconnected' });
      });
  },
});

export const { changeGraph } = DatabaseSlice.actions;
export default DatabaseSlice.reducer;
