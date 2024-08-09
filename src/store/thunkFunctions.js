import { createAsyncThunk } from "@reduxjs/toolkit";
import axionInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      const response = await axionInstance.post(`/users/register`, body);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    console.log("thunkFuntion loginUser Data Check");
    try {
      const response = await axionInstance.post(`/users/login`, body);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (thunkAPI) => {
    try {
      console.log("11");
      const response = await axionInstance.post(`/users/logout`);
      console.log("get response", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const authUser = createAsyncThunk("user/authUser", async (thunkAPI) => {
  try {
    console.log("11");
    const response = await axionInstance.get(`/users/auth`);
    console.log("get response", response);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data || error.message);
  }
});

// export const uplaoadVideo = createAsyncThunk(
//   "content/uplaoadVideo",
//   async (body, thunkAPI) => {
//     console.log("thunkFuntion video Data Check");
//     try {
//       const response = await axionInstance.post(`/contents/videos`, body);
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.response.data || error.message);
//     }
//   }
// );
