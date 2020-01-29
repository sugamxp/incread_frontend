import { GET_ARTICLES_TO_TAG, TAGGING_COMPLETE } from "./types";
import axios from "axios";

export const getArticlesToTag = (token) => async (dispatch) => {
  const api_url = process.env.REACT_APP_API_URL;
  const res = await axios.get(`${api_url}/users/${token}/tag_articles/`);

  dispatch({
    type: GET_ARTICLES_TO_TAG,
    payload: res.data
  });
};

export const taggingComplete = (token, articles_id) => async (dispatch) => {
  const api_url = process.env.REACT_APP_API_URL;
  const res = await axios.post(`${api_url}/users/${token}/tagging_complete/`, {
    articles_id: articles_id
  });

  dispatch({
    type: TAGGING_COMPLETE,
    payload: res.data
  });
};
