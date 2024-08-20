import { RootStore } from "../src/redux/store";
import { postUrls } from "../src/redux/reducers/urlsSlice";
import urlsSlice from "../src/redux/reducers/urlsSlice";
import { IParsData } from "../src/redux/types/IUrlsProps";
import { configureStore } from "@reduxjs/toolkit";

describe("Redux Store - urlsSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { urls: urlsSlice } });
  });

  test("should add new data to metaData on postUrls action", () => {
    const mockData: IParsData = {
      url: "https://example.com",
      title: "Example Title",
      description: "Example Description",
      image: "example-image.png",
    };

    store.dispatch(postUrls([mockData]));

    const updatedState = store.getState() as RootStore;

    expect(updatedState.urls.metaData).toContainEqual(mockData);
  });

  test("should handle multiple postUrls actions", () => {
    const mockData1: IParsData = {
      url: "https://example1.com",
      title: "Title 1",
      description: "Description 1",
      image: "image1.png",
    };

    const mockData2: IParsData = {
      url: "https://example2.com",
      title: "Title 2",
      description: "Description 2",
      image: "image2.png",
    };

    store.dispatch(postUrls([mockData1]));
    store.dispatch(postUrls([mockData2]));

    const updatedState = store.getState() as RootStore;

    expect(updatedState.urls.metaData).toEqual([mockData1, mockData2]);
  });
});
