import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import reading_complete from "../../static/reading_complete.svg";
import axios from "axios";
import { removeArticles } from "../../redux/actions/articlesActions";

class ReadingCompleteComponent extends Component {
  state = {
    username: "",
    number_articles_read: 0,
    total_time_read: 0,
    untagged_cnt: 0
  };

  componentDidMount() {
    const api_url = process.env.REACT_APP_API_URL;
    const token = this.props.cookies.get("token");
    this.props.removeArticles();
    axios.post(`${api_url}/users/${token}/get_completed_stats/`).then((res) => {
      const {
        username,
        number_articles_read,
        total_time_read,
        untagged_cnt
      } = res.data;
      console.log(res.data);

      this.setState({
        username,
        number_articles_read,
        total_time_read,
        untagged_cnt
      });
    });
  }

  onReadMoreClick = (e) => {
    this.props.history.push("/prioritize-list");
  };

  onTagArticlesClick = (e) => {
    this.props.history.push("/tag-articles");
  };

  render() {
    const {
      username,
      number_articles_read,
      total_time_read,
      untagged_cnt
    } = this.state;
    const num_tag = parseInt(this.props.cookies.get("num_tag")) + 7;

    return (
      <section className="ht-100">
        <div className="illus-page-7">
          <img src={reading_complete} alt="" />
        </div>
        <div className="container-fluid">
          <div className="main-container-2 border-bottom-grey">
            <div className="user-stats">
              <p className="user-title text-black">{username}'s</p>
              <p className="rating-title text-dark-gray mt-10">
                Reading Stats for Today
              </p>
            </div>
            <div className="user-stats-content mt-20 clearfix">
              <div className="float-left mr-20">
                <p className="user-stats-content-inner text-green">
                  {number_articles_read}
                </p>
                <p className="rating-content text-dark-gray">Articles</p>
              </div>
              <div className="float-left mr-20">
                <p className="user-stats-content-inner text-green">
                  {total_time_read}
                </p>
                <p className="rating-content text-dark-gray">Minutes</p>
              </div>
            </div>
          </div>
          <div className="border-stats"></div>
          <div className="text-center mt-20">
            <button
              onClick={this.onReadMoreClick}
              className="btn-general btn-blue btn-bg"
            >
              Read More
            </button>
            <p
              onClick={this.onTagArticlesClick}
              className="mt-40 done text-blue"
            >
              Tag {num_tag <= untagged_cnt ? num_tag : untagged_cnt} new
              articles
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default compose(
  connect(null, {
    removeArticles
  }),
  withCookies,
  withRouter
)(ReadingCompleteComponent);
