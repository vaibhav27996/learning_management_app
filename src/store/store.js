import { configureStore } from '@reduxjs/toolkit'
import sidebarSliceReducer from './slice'
import LanguageSlice from 'src/views/language/LanguageSlice'
import TopicSlice from 'src/views/topic/TopicSlice'
import SubscriptionSlice from 'src/views/subscription/SubscriptionSlice'

export const store = configureStore({
  reducer: {
    slice:sidebarSliceReducer,
    language:LanguageSlice,
    topic:TopicSlice,
    subscription:SubscriptionSlice,
  },
})
