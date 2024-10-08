export interface IInitialState {
  metaData: IParsData[] | [];
}

export interface IUrls {
  urlFirst: string;
  urlSecond: string;
  urlThird: string;
  secretToken?: string;
}

export interface IParsData {
  url: string;
  title: string;
  description: string;
  image: string;
}
