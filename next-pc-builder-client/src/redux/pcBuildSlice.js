
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	CPU: null,
	Motherboard: null,
	RAM: null,
	PowerSupplyUnit: null,
	StorageDevice: null,
	Monitor: null

};

const pcBuildSlice = createSlice({
	name: "pcBuild",
	initialState,
	reducers: {
		addToPcBuild: (state, action) => {
			console.log("ACTION US", action.payload);
			console.log("ACTION output", { ...state, ...action.payload });
			// state = { ...state, ...action.payload };
			Object.assign(state, action.payload);
		},

	},
});

export const { addToPcBuild } =
	pcBuildSlice.actions;

export default pcBuildSlice.reducer;
