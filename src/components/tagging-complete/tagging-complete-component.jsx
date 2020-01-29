import React, { Component } from "react";
import check from "../../static/check.svg";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { compose } from "redux";
import { taggingComplete } from "../../redux/actions/articlesActions";
import axios from "axios";

class TaggingCompleteComponent extends Component {
  state = {
    onboarding_complete: true,
    api_url: process.env.REACT_APP_API_URL,
    token: this.props.cookies.get("token")
  };

  async componentDidMount() {
    const { api_url, token } = this.state;
    const res = await axios.get(`${api_url}/users/${token}/`);
    this.setState({
      onboarding_complete: res.data.onboarding_complete
    });
  }

  handleTaggingComplete = (articles, e) => {
    const ids = [];
    articles.map((article) => ids.push(article.id));
    this.props.taggingComplete(
      this.props.cookies.get("token"),
      ids,
      this.props
    );
  };

  render() {
    const articles = this.props.articles;
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
                Your inputs are used to generate the prioritized reading list
                for you
              </p>
              {this.state.onboarding_complete ? (
                <div>
                  <p className="main-article-title text-black mt-20 text-left">
                    348 (72%) of the articles haven’t been tagged yet
                  </p>
                  <button className="btn-general btn-blue btn-bg mt-60">
                    Tag 7 more
                  </button>
                  <p className="text-blue rating-title mt-40">done for now</p>
                </div>
              ) : (
                <div>
                  <button
                    onClick={this.handleTaggingComplete.bind(this, articles)}
                    className="btn-general btn-blue btn-bg mt-60"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles.articles_to_tag
});

export default compose(
  connect(mapStateToProps, { taggingComplete }),
  withRouter,
  withCookies
)(TaggingCompleteComponent);
