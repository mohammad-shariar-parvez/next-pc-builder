import { configureStore } from "@reduxjs/toolkit";

import pcBuildSlice from "./pcBuildSlice";

export default configureStore({
	reducer: { pcBuild: pcBuildSlice }

});
