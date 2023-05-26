import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { Data, Info } from 'components/Main/Main';

type FetchData = {
  info: Info;
  results: Data[];
};

type Initial = {
  results: FetchData;
  loading: boolean;
  error: boolean;
  response: string;
};

const initialState: Initial = {
  results: {
    info: {
      count: 826,
      next: 'https://rickandmortyapi.com/api/character/?page=2',
      pages: 42,
      prev: null,
    },
    results: [],
  },
  loading: false,
  error: false,
  response: 'https://rickandmortyapi.com/api/character/?name=',
};

export const fetchData = createAsyncThunk<FetchData, undefined, { rejectValue: string }>(
  'todos/fetchData',
  async function (_, { rejectWithValue }) {
    const result = await fetch(
      `${initialState.response}${
        localStorage.getItem('Term') ? localStorage.getItem('Term') : ''
      }&status=${localStorage.getItem('Id') ? localStorage.getItem('Id') : ''}&page=${
        localStorage.getItem('Page') ? localStorage.getItem('Page') : 1
      }`
    );
    if (!result.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await result.json();
    return data;
  }
);

export const fetchHandleSearchDataChange = createAsyncThunk<
  FetchData,
  string,
  { rejectValue: string }
>('todos/handleSearchTermChange', async function (_, { rejectWithValue }) {
  const result = await fetch(
    `${initialState.response}${
      localStorage.getItem('Term') ? localStorage.getItem('Term') : ''
    }&status=${localStorage.getItem('Id') ? localStorage.getItem('Id') : ''}&page=${
      localStorage.getItem('Page') ? localStorage.getItem('Page') : 1
    }`
  );
  if (!result.ok) {
    return rejectWithValue('Server Error!');
  }
  const data = await result.json();
  return data;
});

export const fetchOnChangePage = createAsyncThunk<FetchData, number, { rejectValue: string }>(
  'todos/handleSearchTermChange',
  async function (_, { rejectWithValue }) {
    const result = await fetch(
      `${initialState.response}${
        localStorage.getItem('Term') ? localStorage.getItem('Term') : ''
      }&status=${localStorage.getItem('Id') ? localStorage.getItem('Id') : ''}&page=${
        localStorage.getItem('Page') ? localStorage.getItem('Page') : 1
      }`
    );
    if (!result.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await result.json();
    return data;
  }
);

export const fetchOnClickCategory = createAsyncThunk<FetchData, string, { rejectValue: string }>(
  'todos/handleSearchTermChange',
  async function (_, { rejectWithValue }) {
    const result = await fetch(
      `${initialState.response}${
        localStorage.getItem('Term') ? localStorage.getItem('Term') : ''
      }&status=${localStorage.getItem('Id') ? localStorage.getItem('Id') : ''}&page=${
        localStorage.getItem('Page') ? localStorage.getItem('Page') : 1
      }`
    );
    if (!result.ok) {
      return rejectWithValue('Server Error!');
    }
    const data = await result.json();
    return data;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        (state.loading = true), (state.error = true);
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchHandleSearchDataChange.pending, (state) => {
        (state.loading = true), (state.error = true);
      })
      .addCase(fetchHandleSearchDataChange.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addMatcher(isError, (state) => {
        state.loading = false;
        state.error = false;
      });
  },
});

export default todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
