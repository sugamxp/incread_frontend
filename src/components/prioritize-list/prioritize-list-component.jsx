import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { getPrioritizedList } from "../../redux/actions/articlesActions";

import { ArticleCardComponent } from "./article-card-component";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { getArticlesPocket } from "../../redux/actions/authActions";

class PrioritizeListComponent extends Component {
  componentDidMount() {
    const api_url = process.env.REACT_APP_API_URL;
    const token = this.props.cookies.get("token");
    this.props.getPrioritizedList(token, this.props);
    this.props.getArticlesPocket(api_url, token);
  }

  navigateToArticle = ([url, id], e) => {
    const saved_articles = JSON.parse(localStorage.getItem("articles"));
    const result = saved_articles.map((article, i) => {
      if (article.id === id) {
        article.read_status_incread = true;
      }
      return article;
    });
    localStorage.setItem("articles", JSON.stringify(result));
    this.forceUpdate();
    window.open(url);
  };

  onDoneClick = (id, e) => {
    const api_url = process.env.REACT_APP_API_URL;
    const saved_articles = JSON.parse(localStorage.getItem("articles"));
    const result = saved_articles.filter((article) => article.id !== id);

    axios
      .post(`${api_url}/users/userArticle/${id}/article_read_status/`)
      .then((res) => {
        localStorage.setItem("articles", JSON.stringify(result));
        $(`#${id}`).removeClass("text-yellow");
        $(`#${id}`).addClass("text-green");
        $(`#${id}`).html('<i class="fa fa-check mr-10"></i>Done');

        setTimeout(() => {
          $(`#green-overlay${id}`).fadeIn("slow");
        }, 750);
        setTimeout(() => {
          if (result.length === 0) {
            localStorage.removeItem("articles");
            this.props.history.push("/reading-complete");
          } else {
            this.forceUpdate();
          }
        }, 2000);
      });
  };

  render() {
    const saved_articles = JSON.parse(localStorage.getItem("articles"));
    const username = this.props.username;
    const untagged_articles = this.props.untagged_articles;

    if (!saved_articles) {
      var articles = this.props.prioritized_list;
    } else if (!saved_articles.length) {
      console.log("!saved_articles.length");
      console.log(saved_articles);

      localStorage.removeItem("articles");
      this.props.history.push("/reading-complete");
    } else {
      articles = saved_articles;
    }
    if (articles.length) {
      console.log("Articles Render", articles);

      if (!saved_articles) {
        localStorage.setItem("articles", JSON.stringify(articles));
      }
      return (
        <section>
          <div className="main-container-2">
            <div className="user-reading">
              <div className="row">
                <div className="col">
                  <p className="user-title text-black">{username}'s</p>
                  <p className="rating-title text-dark-gray mt-10">
                    Prioritised Reading List
                  </p>
                </div>
                <div className="col position-relative">
                  <Link to="/tag-articles">
                    <button className="btn-general btn-white btn-white-sm user-button-position float-right">
                      + {untagged_articles} New
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="user-reading-list mt-20">
              {articles.map((article, i) => {
                return (
                  <ArticleCardComponent
                    key={article.id}
                    {...article}
                    onArticleClick={this.navigateToArticle.bind(this, [
                      article.url,
                      article.id
                    ])}
                    onDoneClick={this.onDoneClick.bind(this, article.id)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      );
    } else {
      return <div></div>;
    }
  }
}
const mapStateToProps = (state) => ({
  prioritized_list: state.articles.prioritized_list,
  username: state.articles.username,
  untagged_articles: state.articles.untagged_articles
});
export default compose(
  connect(mapStateToProps, {
    getPrioritizedList,
    getArticlesPocket
  }),
  withCookies,
  withRouter
)(PrioritizeListComponent);
