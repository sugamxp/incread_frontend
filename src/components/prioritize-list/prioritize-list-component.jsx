import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { getPrioritizedList } from "../../redux/actions/articlesActions";
import { ArticleCardComponent } from "./article-card-component";

class PrioritizeListComponent extends Component {
  componentDidMount() {
    const token = this.props.cookies.get("token");
    this.props.getPrioritizedList(token);
  }
  render() {
    const {
      articles,
      username,
      untagged_articles
    } = this.props.prioritized_list;

    if (articles) {
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
                  <button className="btn-general btn-white btn-white-sm user-button-position float-right">
                    + {untagged_articles} New
                  </button>
                </div>
              </div>
            </div>
            <div className="user-reading-list mt-20">
              {articles[0].map((article, i) => {
                return <ArticleCardComponent key={i} {...article} />;
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
  withCookies
)(PrioritizeListComponent);
