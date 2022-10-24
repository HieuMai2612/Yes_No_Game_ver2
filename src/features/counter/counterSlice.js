import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  getPlayer: [],
  // idPlayer: 1,
  // indexPlayer: 0,
  questions: [],
  playerCount: 2,
  roundList: [],
  answer: "",
  resultsApi: [],
  results: [],
  getAllResults: {}
};


export const getAnswer = createAsyncThunk("answer/getAnswer", async () => {
  const res = await axios("https://yesno.wtf/api");
  return res.data;
});


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    reloadLocal: (state, action) => {
      state.getPlayer = [];
      state.idPlayer = 1;
      state.indexPlayer = 0;
      state.questions = [];
      state.playerCount = 2;
      state.roundList = [];
      state.answer = "";
      state.resultsApi = [];
      state.results = [];
      state.getAllResults = {}
    },
    saveName1: (state, action) => {
      state.name1 = action.payload;
    },
    saveName2: (state, action) => {
      state.name2 = action.payload;
    },
    getPlayerName: (state, action) => {
      state.getPlayer.push(action.payload);
    },
    incrementIdPlayer: (state, action) => {
      state.indexPlayer += 1;
    },
    saveRoundList: (state, action) => {
      const data = action.payload.map((item) => item + 1);
      state.roundList = data;
    },

    saveResult: (state, action) => {
      state.results = [...state.results, ...action.payload];
    },
    saveResultApi: (state, action) => {
      state.resultsApi.push(action.payload);
    },

    saveAllResult: (state, action) => {
      const data = action.payload
      if (!state.getAllResults[data.player]) {
        state.getAllResults[data.player] = {
          idPlayer: "",
          round: "",
          namePlayer: "",
          score: 0,
          answerPlayer: [],
          answerApi: [],
          createdAt: [],
        };
      }

      state.getAllResults[data.player].idPlayer = data.id;
      state.getAllResults[data.player].namePlayer = data.player;
      state.getAllResults[data.player].round = data.round;
      state.getAllResults[data.player].answerPlayer.push(data.answer);
      state.getAllResults[data.player].answerApi.push(data.result);
      if (data.answer === data.result) {
        state.getAllResults[data.player].score =
          state.getAllResults[data.player].score + 1;
      }
      state.getAllResults[data.player].createdAt.push(data.date);
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(getAnswer.fulfilled, (state, action) => {
        state.questions = (action.payload);
      });
  },
});

export const {
  saveName1,
  saveName2,
  getPlayerName,
  incrementIdPlayer,
  saveRoundList,
  saveResult,
  saveResultApi,
  saveAllResult,
  reloadLocal
} = counterSlice.actions;


export const questions = (state) => state.counter.counter.questions;
export const name1 = (state) => state.counter.counter.name1;
export const name2 = (state) => state.counter.counter.name2;
export const getPlayer = (state) => state.counter.counter.getPlayer;
export const idPlayer = (state) => state.counter.counter.idPlayer;
export const roundList = (state) => state.counter.counter.roundList;
// export const indexPlayer = (state) => state.counter.counter.indexPlayer;
export const results = (state) => state.counter.counter.results;
export const resultsApi = (state) => state.counter.counter.resultsApi;
export const createdAt = (state) => state.counter.counter.createdAt;
export const getAllResults = (state) => state.counter.counter.getAllResults;

export default counterSlice.reducer;
