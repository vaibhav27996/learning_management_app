import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createTopic, getTopics, deleteTopic, editTopic } from './topicAPI';

const initialState = {
  status: 'idle',
  topics:[],
  selectedTopic:{
    lang_id: '',
    topic_name: '',
    descriptions: '',
    seq_no: '',
    status: '',
  }
  
  
}

export const createTopicAsync = createAsyncThunk(
    'topic/createTopicAsync',
    async (topic) => {
      try {
        const data = await createTopic(topic);
        // console.log(data)
        return data; // This will be the `fulfilled` action payload
      } catch (err) {
        throw err; // This will be the `rejected` action payload
      }
    }
  );

export const getTopicAsync = createAsyncThunk(
    'topic/getTopicAsync',
    async () => {
      try {
        console.log("Slicebefore")
        const data = await getTopics();
        console.log("Slice",data)
        return data; // This will be the `fulfilled` action payload
      } catch (err) {
        throw err; // This will be the `rejected` action payload
      }
    }
  );

export const deleteTopicAsync = createAsyncThunk(
    'topic/deleteTopicAsync',
    async (id) => {
      try {
        // console.log("languageSlicebefore")
        const data = await deleteTopic(id);
        // console.log("languageSlice after",)
        return data; // This will be the `fulfilled` action payload
      } catch (err) {
        throw err; // This will be the `rejected` action payload
      }
    }
  );

export const editTopicAsync = createAsyncThunk(
    'topic/editTopicAsync',
    async ({values, id}) => {
        console.log(id, values, "in slice")
      try {
        // console.log("languageSlicebefore")
        const data = await editTopic(id, values);
        // console.log("languageSlice after",)
        return data; // This will be the `fulfilled` action payload
      } catch (err) {
        throw err; // This will be the `rejected` action payload
      }
    }
  );





export const TopicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    getTopic:(state, action) => {
      console.log("action payload", action.payload)
     let selected = state.topics.filter((topic)=>topic._id === action.payload)
     state.selectedTopic.lang_id = selected[0]?.languageData[0]?._id
     state.selectedTopic.topic_name = selected[0]?.name
     state.selectedTopic.descriptions = selected[0]?.descriptions
     state.selectedTopic.seq_no = selected[0]?.seq_no
     state.selectedTopic.status = selected[0]?.status
     

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopicAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getTopicAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.topics = action.payload
      })
      .addCase(createTopicAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createTopicAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        console.log(action.payload)
      })
      .addCase(deleteTopicAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteTopicAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        
      })
      .addCase(editTopicAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editTopicAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      


        
      })
  },
})

export const { getTopic } = TopicSlice.actions

export const TopicStatus = (state) => state.topic.status
export const fetchedTopics = (state) => state.topic.topics
export const selectedTopic = (state) => state.topic.selectedTopic



export default TopicSlice.reducer
