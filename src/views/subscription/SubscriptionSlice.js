import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createSubscription, deleteSubscription, getSubscriptions, editSubscription } from './subscriptionAPI';

const initialState = {
  status: 'idle',
  subscriptions:[],
  selectedSubscription:{
    name: '',
    duration: null ,
    type:'',
    amount: '',
    startDate: null,
    endDate: null,
  }
  
  
}

export const createSubscriptionAsync = createAsyncThunk(
    'subscription/createSubscriptionAsync',
    async (Subscription) => {
      try {
        const data = await createSubscription(Subscription);
        // console.log(data)
        return data; // This will be the `fulfilled` action payload
      } catch (err) {
        throw err; // This will be the `rejected` action payload
      }
    }
  );

export const getSubscriptionAsync = createAsyncThunk(
    'subscription/getSubscriptionAsync',
    async () => {
      try {
        const data = await getSubscriptions();
        console.log("SuscriptonSlice",data)
        return data; // This will be the `fulfilled` action payload
      } catch (err) {
        throw err; // This will be the `rejected` action payload
      }
    }
  );

export const deleteSubscriptionAsync = createAsyncThunk(
    'subscription/deleteSubscriptionAsync',
    async (id) => {
      try {
        const data = await deleteSubscription(id);
        return data; // This will be the `fulfilled` action payload
      } catch (err) {
        throw err; // This will be the `rejected` action payload
      }
    }
  );

export const editSubscriptionAsync = createAsyncThunk(
    'subscription/editSubscriptionAsync',
    async ({values, id}) => {
        console.log(id, values, "in slice")
      try {
        
        const data = await editSubscription(id, values);
        return data; // This will be the `fulfilled` action payload
      } catch (err) {
        throw err; // This will be the `rejected` action payload
      }
    }
  );





export const SubscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    // getSubscription:(state, action) => {
    //   console.log("action payload", action.payload)
    //  let selected = state.subscriptions.filter((topic)=>topic._id === action.payload)
    //  state.selectedSubscription.lang_id = selected[0]?.languageData[0]?._id
    //  state.selectedSubscription.topic_name = selected[0]?.name
    //  state.selectedSubscription.descriptions = selected[0]?.descriptions
    //  state.selectedSubscription.seq_no = selected[0]?.seq_no
    //  state.selectedSubscription.status = selected[0]?.status
     

    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getSubscriptionAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.subscriptions = action.payload
      })
      .addCase(createSubscriptionAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createSubscriptionAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        console.log(action.payload)
      })
      .addCase(deleteSubscriptionAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteSubscriptionAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        
      })
      .addCase(editSubscriptionAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editSubscriptionAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      


        
      })
  },
})

// export const {  } = SubscriptionSlice.actions 

export const subscriptionStatus = (state) => state.subscription.status
export const fetchedSubscriptions = (state) => state.subscription.subscriptions
export const selectedSubscription = (state) => state.subscription.selectedSubscription



export default SubscriptionSlice.reducer
