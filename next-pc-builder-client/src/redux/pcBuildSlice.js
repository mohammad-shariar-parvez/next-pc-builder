
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
			console.log(state);
			// state = { ...state, ...action.payload };
			Object.assign(state, action.payload);
		},

		clearPcBuild: (state, action) => {
			console.log("CLEAR");
			Object.assign(state, initialState);
			// state = initialState;

		}

	},
});

export const { addToPcBuild, clearPcBuild } =
	pcBuildSlice.actions;

export default pcBuildSlice.reducer;
