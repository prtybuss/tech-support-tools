import { configureStore } from "@reduxjs/toolkit";

import tagsReducer from "./slices/tagsSlice";
import taggsReducer from "./slices/tag";
import filesReducer from "./slices/files";
import ticketsReducer from "./slices/ticketSlice";
import messagesReducer from "./slices/messagesSlice";
import sessionReducer from "./slices/sessionSlice";
import loaderReducer from "./slices/loaderSlice";
import tagListReducer from "./slices/tagListSlice";
import officeReducer from "./slices/officeSlice";

const store = configureStore({
	reducer: {
		session: sessionReducer,
		tickets: ticketsReducer,
		messages: messagesReducer,
		tags: tagsReducer,
		files: filesReducer,
		preloaded: loaderReducer,
		tagList: tagListReducer,
		taggs: taggsReducer,
		office: officeReducer,
	}
});

export default store;
