import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicTrack {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface intialGeneral{
    artist:number,
    album:number,
    genre:number
}

interface Incoming {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface MusicState {
  generalInfo: intialGeneral;
  recentData: number[];
  musicList: MusicTrack[];
  loading: boolean;
  error: string | null;
}

const initialState: MusicState = {
  generalInfo: {
    album:0, 
    artist:0,
    genre:0
  },
  recentData: [],
  musicList: [],
  loading: false,
  error: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    fetchMusicRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMusicSuccess: (state, action: PayloadAction<MusicTrack[]>) => {
      state.loading = false;
      state.musicList = action.payload;
    },
    fetchMusicFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addMusicRequest: (state, action: PayloadAction<Incoming>) => {
      state.loading = true;
      state.error = null;
    },
    addMusicSuccess: (state, action: PayloadAction<MusicTrack>) => {
      state.musicList = [...state.musicList, action.payload];
      console.log(state, "add");
    },
    addMusicFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateMusicRequest: (state, action: PayloadAction<MusicTrack>) => {
      console.log("req");
      state.loading = true;
      state.error = null;
    },
    updateMusicSuccess: (state, action: PayloadAction<MusicTrack>) => {
      const index = state.musicList.findIndex(
        (music) => music._id === action.payload._id
      );
      if (index !== -1) {
        state.musicList[index] = action.payload;
      }
    },
    updateMusicFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMusicRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteMusicSuccess: (state, action: PayloadAction<string>) => {
      const new_data = state.musicList.filter(
        (music) => music._id !== action.payload
      );
      state.musicList = new_data;
    },
    deleteMusicFailure: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<number[]>) => {
      state.loading = false;
      state.recentData = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchAllRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllSuccess: (state, action: PayloadAction<intialGeneral>) => {
      state.loading = false;
      state.generalInfo = action.payload;
    },
    fetchAllFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMusicRequest,
  fetchMusicSuccess,
  fetchMusicFailure,
  addMusicRequest,
  addMusicFailure,
  addMusicSuccess,
  updateMusicRequest,
  updateMusicFailure,
  updateMusicSuccess,
  deleteMusicRequest,
  deleteMusicFailure,
  deleteMusicSuccess,
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess,
  fetchAllFailure,
  fetchAllSuccess, 
  fetchAllRequest,
} = musicSlice.actions;
export default musicSlice.reducer;
