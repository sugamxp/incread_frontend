import {
  GET_ARTICLES_TO_TAG,
  TAGGING_COMPLETE,
  GET_PRIORITIZED_LIST,
  REMOVE_ARTICLE
} from "../actions/types";

const initialState = {
  articles_to_tag: [],
  prioritized_list: [],
  onboarding: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES_TO_TAG:
      return {
        ...state,
        articles_to_tag: action.payload
      };

    case TAGGING_COMPLETE:
      return {
        ...state
      };

    case GET_PRIORITIZED_LIST:
      return {
        ...state,
        prioritized_list: action.payload
      };

    case REMOVE_ARTICLE:
      return {
        ...state
      };
    default:
      return state;
  }
}
