import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createLanguage, deleteLanguage, editLanguage, getLanguage } from './languageAPI'

const initialState = {
  status: 'idle',
  languages: [],
}

export const createLanguageAsync = createAsyncThunk('language/createLanguageAsync',async (language) => {
    try {
      console.log("s",language)
      const data = await createLanguage(language);
      return data; 
    } catch (err) {
      throw err; 
    }
  }
);

export const getLanguagesAsync = createAsyncThunk('language/getLanguageAsync', async () => {
  try {
    const data = await getLanguage();
    return data;
  } catch (err) {
    throw err;
  }
  }
);

export const deleteLanguageAsync = createAsyncThunk('language/deleteLanguageAsync',async (id) => {
    try {
      const data = await deleteLanguage(id);
      return data; // This will be the `fulfilled` action payload
    } catch (err) {
      throw err; // This will be the `rejected` action payload
    }
  }
);

export const editLanguageAsync = createAsyncThunk('language/editLanguageAsync',async ({ values, id }) => {
   
    try {
    
      const data = await editLanguage(id, values);
      
      return data;
    } catch (err) {
      throw err; 
    }
  }
);





export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getLanguagesAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getLanguagesAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.languages = action.payload
      })
      .addCase(createLanguageAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createLanguageAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      })
      .addCase(deleteLanguageAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteLanguageAsync.fulfilled, (state, action) => {
        state.status = 'idle'

      })
      .addCase(editLanguageAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editLanguageAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      })
  },
})

export const { } = languageSlice.actions

export const languageStatus = (state) => state.language.status
export const fetchedLanguages = (state) => state.language.languages



export default languageSlice.reducer
