import { GET_ARTICLES_TO_TAG, TAGGING_COMPLETE } from "../actions/types";

const initialState = {
  articles_to_tag: []
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
    default:
      return state;
  }
}
