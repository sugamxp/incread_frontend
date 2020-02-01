import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { getPrioritizedList } from "../../redux/actions/articlesActions";
import { ArticleCardComponent } from "./article-card-component";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
class PrioritizeListComponent extends Component {
  componentDidMount() {
    const token = this.props.cookies.get("token");
    this.props.getPrioritizedList(token);
  }

  navigateToArticle = ([url, id], e) => {
    const saved_articles = JSON.parse(localStorage.getItem("articles"))[0];
    const result = saved_articles.map((article, i) => {
      if (article.id === id) {
        article.read_status_incread = true;
      }
      return article;
    });
    localStorage.setItem("articles", JSON.stringify([result]));
    window.open(url, "_self");
  };

  onDoneClick = (id, e) => {
    const api_url = process.env.REACT_APP_API_URL;
    const token = this.props.cookies.get("token");

    const saved_articles = JSON.parse(localStorage.getItem("articles"))[0];
    const result = saved_articles.filter((article) => article.id !== id);

    axios
      .post(`${api_url}/users/userArticle/${id}/article_read_status/`)
      .then((res) => {
        console.log(res);

        localStorage.setItem("articles", JSON.stringify([result]));
        this.forceUpdate();
      });
  };
  render() {
    const saved_articles = JSON.parse(localStorage.getItem("articles"));
    const { username, untagged_articles } = this.props.prioritized_list;

    console.log();

    if (!saved_articles) {
      var { articles } = this.props.prioritized_list;
    } else if (!saved_articles[0].length) {
      localStorage.removeItem("articles");
      this.props.history.push("/reading-complete");
    } else {
      articles = saved_articles;
    }
    if (articles) {
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
              {articles[0].map((article, i) => {
                return (
                  <ArticleCardComponent
                    key={i}
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
  prioritized_list: state.articles.prioritized_list
});
export default compose(
  connect(mapStateToProps, { getPrioritizedList }),
  withCookies,
  withRouter
)(PrioritizeListComponent);
