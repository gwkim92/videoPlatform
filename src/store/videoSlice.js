// import { createSlice } from "@reduxjs/toolkit";
// import { uplaoadVideo } from "./thunkFunctions";
// import { toast } from "react-toastify";

// // const initialState = {
// //   userData: {
// //     id: "",
// //     email: "",
// //     name: "",
// //     role: 0,
// //     image: "",
// //   },
// //   isAuth: false,
// //   isLoading: false,
// //   error: "",
// // };

// const videoSlice = createSlice({
//   name: "content",
//   // initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(uplaoadVideo.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(uplaoadVideo.fulfilled, (state) => {
//         state.isLoading = false;
//         // console.log("1");
//         toast.info("회원가입 성공");
//       })
//       .addCase(uplaoadVideo.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//         toast.error(action.payload);
//       });
//   },
// });

// export default videoSlice.reducer;
