import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import { getArticlesToTag } from "../../redux/actions/articlesActions";
import { compose } from "redux";
import { connect } from "react-redux";
class TagArticlesComponent extends Component {
  state = {
    cnt: 0,
    progress_bar_width: 0,
    token: this.props.cookies.get("token")
  };
  componentDidMount() {
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 0);

    let num_tag = 7;
    if (!this.props.cookies.get("num_tag")) {
      this.props.cookies.set("num_tag", num_tag, {
        expires: midnight
      });
    } else {
      num_tag = this.props.cookies.get("num_tag");

      this.props.cookies.set("num_tag", parseInt(num_tag) + 7, {
        expires: midnight
      });

      num_tag = parseInt(num_tag) + 7;
    }

    this.props.getArticlesToTag(this.state.token, num_tag);
  }

  handlePrioritySubmission = (data, e) => {
    e.preventDefault();
    let [priority, article] = data;
    const cnt = this.state.cnt;
    const max_cnt = this.props.articles.length;
    console.log(cnt, max_cnt);
    const api_url = process.env.REACT_APP_API_URL;

    axios
      .post(`${api_url}/users/userArticle/${article.id}/set_priority/`, {
        priority: priority
      })
      .then((res) => {
        // console.log(res);

        if (cnt === max_cnt - 1) {
          this.props.history.push("/tagging-complete", { onboarding: true });
        } else {
          this.setState({
            cnt: cnt + 1,
            progress_bar_width: this.state.progress_bar_width + 100 / max_cnt
          });
        }
      });
  };
  render() {
    console.log(this.state.cnt);
    const { articles } = this.props;
    if (articles.length !== 0) {
      const article = articles[this.state.cnt];
      return (
        <section className="position-relative bg-gray">
          <div className="container-fluid bg-gray">
            <div className="main-article pb-70">
              <div className="main-container bg-gray">
                <p className="main-article-title text-black">{article.title}</p>
                <div className="text-14-gray ptb-8">
                  by <span>{article.publisher}</span>
                  <span className="plr-20">{article.time_to_read} min</span>
                </div>
                <p className="main-article-content text-dark-gray ptb-20">
                  {article.excerpt.substring(0, 100)} ...
                </p>
              </div>
            </div>
          </div>
          <div className="container-fluid container-rounded main-rating-outer">
            <div className="main-rating">
              <div className="main-container pt-40 pb-40">
                <p className="main-article-title text-black">
                  By reading this article, you expect to grow your actionable
                  knowledge
                </p>
                <div className="point-rating ptb-40">
                  <div className="d-flex flex-row">
                    <div className="rating-icons mr-20">
                      <div className="d-flex flex-column justify-content-between">
                        {[5, 4, 3, 2, 1].map((priority, i) => (
                          <div
                            key={i}
                            onClick={this.handlePrioritySubmission.bind(this, [
                              priority,
                              article
                            ])}
                            className="rating-icon"
                          >
                            <div className="rating-marks text-gray">
                              {priority}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rating-contents flex-grow-1 d-flex flex-column justify-content-between">
                      <div className="signi">
                        <p className="rating-title text-black">Significantly</p>
                        <p className="rating-content text-black">
                          Learning which you can apply soon
                        </p>
                        <p className="rating-subcontent text-gray">
                          How-tos, Solutions to current problems
                        </p>
                      </div>
                      <div className="mod">
                        <p className="rating-title text-black">Moderately</p>
                        <p className="rating-content text-black">
                          Learning which you’ll apply later
                        </p>
                        <p className="rating-subcontent text-gray">
                          Cases, Situations you expect to be in someday
                        </p>
                      </div>
                      <div className="marg">
                        <p className="rating-title text-black">Marginally</p>
                        <p className="rating-content text-black">
                          Learning which you might never apply
                        </p>
                        <p className="rating-subcontent text-gray">
                          News, Things that won’t impact your life
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="progress progress-position" style={{ height: "4px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${this.state.progress_bar_width}%`
              }}
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </section>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles.articles_to_tag
});

export default compose(
  withCookies,
  withRouter,
  connect(mapStateToProps, { getArticlesToTag })
)(TagArticlesComponent);
