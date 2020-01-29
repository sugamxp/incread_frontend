import React from "react";
import check from "../../static/check.svg";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { compose } from "redux";
import { taggingComplete } from "../../redux/actions/articlesActions";

const handleTaggingComplete = ([articles, props], e) => {
  const ids = [];
  articles.map((article) => ids.push(article.id));
  console.log(ids);
  props.taggingComplete(props.cookies.get("token"), ids);
  props.history.replace("/prioritize-list");
};

const TaggingCompleteComponent = (props) => {
  let onboarding = props.location.state.onboarding;
  //   let onboarding = falses;
  console.log(props);
  const { articles } = props;
  return (
    <section>
      <div className="container-fluid">
        <div className="main-container">
          <div className="tagging text-center">
            <img src={check} style={{ height: "8vh" }} alt="" />
            <p className="mt-20 text-black main-title-content">
              Thanks for tagging
            </p>
            <p className="main-article-title text-black text-left">
              Your inputs are used to generate the prioritized reading list for
              you
            </p>
            {onboarding ? (
              <div>
                <button
                  onClick={handleTaggingComplete.bind(this, [articles, props])}
                  className="btn-general btn-blue btn-bg mt-60"
                >
                  Continue
                </button>
              </div>
            ) : (
              <div>
                <p className="main-article-title text-black mt-20 text-left">
                  348 (72%) of the articles haven’t been tagged yet
                </p>
                <button className="btn-general btn-blue btn-bg mt-60">
                  Tag 7 more
                </button>
                <p className="text-blue rating-title mt-40">done for now</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  articles: state.articles.articles_to_tag
});

export default compose(
  connect(mapStateToProps, { taggingComplete }),
  withRouter,
  withCookies
)(TaggingCompleteComponent);
