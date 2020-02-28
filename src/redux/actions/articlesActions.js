import {
  GET_ARTICLES_TO_TAG,
  TAGGING_COMPLETE,
  GET_PRIORITIZED_LIST,
  REMOVE_ARTICLE
} from "./types";
import axios from "axios";

export const getArticlesToTag = (token, num_tag) => async (dispatch) => {
  const api_url = process.env.REACT_APP_API_URL;
  const res = await axios.post(`${api_url}/users/${token}/tag_articles/`, {
    num_tag
  });

  dispatch({
    type: GET_ARTICLES_TO_TAG,
    payload: res.data
  });
};

export const taggingComplete = (token, articles_id, props, tag_more) => async (
  dispatch
) => {
  const api_url = process.env.REACT_APP_API_URL;
  const res = await axios.post(`${api_url}/users/${token}/tagging_complete/`, {
    articles_id: articles_id
  });
  if (!tag_more) {
    const onboarding = axios
      .post(`${api_url}/users/${token}/update_user/`, {
        onboarding_complete: true
      })
      .then((res) => {
        props.history.push("/prioritize-list");
      });
  } else {
    props.history.push("/tag-articles");
  }

  dispatch({
    type: TAGGING_COMPLETE,
    payload: res.data
  });
};

export const getPrioritizedList = (token, props) => async (dispatch) => {
  const api_url = process.env.REACT_APP_API_URL;
  const res = await axios.get(`${api_url}/users/${token}/get_priority_list/`);
  console.log("Prioritized List Received", res);
  if (!res.data.articles.length) {
    props.history.push("/tag-articles");
  }
  dispatch({
    type: GET_PRIORITIZED_LIST,
    payload: res.data
  });
};

export const removeArticle = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_ARTICLE,
    payload: id
  });
};
