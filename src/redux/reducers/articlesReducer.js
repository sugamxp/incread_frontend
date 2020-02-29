import {
  GET_ARTICLES_TO_TAG,
  TAGGING_COMPLETE,
  GET_PRIORITIZED_LIST,
  REMOVE_ARTICLES
} from "../actions/types";

const initialState = {
  articles_to_tag: [],
  prioritized_list: [],
  username: "",
  untagged_articles: "",
  onboarding: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES_TO_TAG:
      return {
        ...state,
        articles_to_tag:
          state.articles_to_tag.length !== 0
            ? state.articles_to_tag
            : action.payload
      };

    case TAGGING_COMPLETE:
      return {
        ...state
      };

    case GET_PRIORITIZED_LIST:
      return {
        ...state,
        prioritized_list:
          state.prioritized_list.length !== 0
            ? state.prioritized_list
            : action.payload.articles,
        username: action.payload.username,
        untagged_articles: action.payload.untagged_articles
      };

    //Empty the complete state
    case REMOVE_ARTICLES:
      return {
        ...state,
        prioritized_list: []
      };
    default:
      return state;
  }
}
