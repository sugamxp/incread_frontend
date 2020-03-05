import React, { Component } from "react";
import check from "../../static/check.svg";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { compose } from "redux";
import { taggingComplete } from "../../redux/actions/articlesActions";
import axios from "axios";
import { Link } from "react-router-dom";
class TaggingCompleteComponent extends Component {
  state = {
    onboarding_complete: true,
    untagged_articles: 0,
    percentage: 0,
    num_tag: 0,
    api_url: process.env.REACT_APP_API_URL,
    token: this.props.cookies.get("token")
  };

  async componentDidMount() {
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 0);

    let num_tag = this.props.cookies.get("num_tag");
    if (num_tag) {
      num_tag = parseInt(num_tag) + 7;
    } else {
      num_tag = 7;
    }

    this.setState({ num_tag });

    const { api_url, token } = this.state;
    const res = await axios.get(`${api_url}/users/${token}/`);
    console.log(res);
    const { onboarding_complete, untagged_articles, percentage } = res.data;
    this.setState({
      onboarding_complete,
      untagged_articles,
      percentage
    });
  }

  handleTaggingComplete = (data, e) => {
    const ids = [];
    const [articles, tag_more] = data;
    articles.map((article) => ids.push(article.id));
    this.props.taggingComplete(
      this.props.cookies.get("token"),
      ids,
      this.props,
      tag_more
    );
  };

  render() {
    const articles = this.props.articles;
    const {
      onboarding_complete,
      untagged_articles,
      percentage,
      num_tag
    } = this.state;

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
              {onboarding_complete ? (
                <div>
                  <p className="main-article-title text-black mt-20 text-left">
                    {untagged_articles} ({percentage}%) of the articles haven’t
                    been tagged yet
                  </p>

                  {/* <Link to="/tag-articles"> */}
                  <button
                    onClick={this.handleTaggingComplete.bind(this, [
                      articles,
                      true
                    ])}
                    className="btn-general btn-blue btn-bg mt-60"
                  >
                    Tag{" "}
                    {num_tag <= untagged_articles ? num_tag : untagged_articles}{" "}
                    more
                  </button>
                  {/* </Link> */}

                  <p
                    onClick={this.handleTaggingComplete.bind(this, [
                      articles,
                      false
                    ])}
                    className="text-blue rating-title mt-40"
                  >
                    done for now
                  </p>
                </div>
              ) : (
                <div>
                  <button
                    onClick={this.handleTaggingComplete.bind(this, [
                      articles,
                      false
                    ])}
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
