import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IParsData, IUrls } from "../../types/IUrlsProps";
import { AppDispatch } from "../../store";
import { postUrls } from "../../reducers/urlsSlice";
import { baseUrl } from "../../../components/common/constant";

export const sendUrls = createAsyncThunk<
  IParsData[],
  IUrls,
  { dispatch: AppDispatch; rejectWithValue: string }
>(
  "urls/sendUrls",
  async ({ urlFirst, urlSecond, urlThird }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/urls/fetch-metadata`,
        {
          urls: {
            urlFirst,
            urlSecond,
            urlThird,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: IParsData[] = response.data;
      dispatch(postUrls(data));
      console.log("postUrls", data);
      return data;
    } catch (error) {
      return rejectWithValue("Network error or unexpected error occurred");
    }
  }
);
