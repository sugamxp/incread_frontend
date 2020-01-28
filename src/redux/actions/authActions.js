import { GET_ARTICLES_POCKET, UPDATE_USERNAME } from "./types";
import axios from "axios";

export const getArticlesPocket = (api_url, token) => async (dispatch) => {
  const res = await axios.post(
    `${api_url}/users/${token}/get_latest_articles/`
  );

  dispatch({
    type: GET_ARTICLES_POCKET,
    payload: res.data
  });
};

export const updateUserName = (api_url, token, username) => async (
  dispatch
) => {
  const res = await axios.post(`${api_url}/users/${token}/update_username/`, {
    username: username
  });

  dispatch({
    type: UPDATE_USERNAME,
    payload: res.data.username
  });
};
