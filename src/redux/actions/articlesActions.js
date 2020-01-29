import {
  GET_ARTICLES_TO_TAG,
  TAGGING_COMPLETE,
  GET_PRIORITIZED_LIST
} from "./types";
import axios from "axios";

export const getArticlesToTag = (token) => async (dispatch) => {
  const api_url = process.env.REACT_APP_API_URL;
  const res = await axios.get(`${api_url}/users/${token}/tag_articles/`);

  dispatch({
    type: GET_ARTICLES_TO_TAG,
    payload: res.data
  });
};

export const taggingComplete = (token, articles_id, props) => async (
  dispatch
) => {
  const api_url = process.env.REACT_APP_API_URL;
  const res = await axios.post(`${api_url}/users/${token}/tagging_complete/`, {
    articles_id: articles_id
  });

  const onboarding = axios
    .post(`${api_url}/users/${token}/update_user/`, {
      onboarding_complete: true
    })
    .then((res) => {
      props.history.push("/prioritize-list");
    });

  dispatch({
    type: TAGGING_COMPLETE,
    payload: res.data
  });
};

export const getPrioritizedList = (token) => async (dispatch) => {
  const api_url = process.env.REACT_APP_API_URL;
  const res = await axios.get(`${api_url}/users/${token}/get_priority_list/`);

  dispatch({
    type: GET_PRIORITIZED_LIST,
    payload: res.data
  });
};
