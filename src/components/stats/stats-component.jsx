import React, { Component } from "react";
import pocket_logo from "../../static/pocket.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { withCookies } from "react-cookie";
import { SemipolarLoading } from "react-loadingg";
import StatCardComponent from "./stat-card-component";
import { compose } from "redux";
import { connect } from "react-redux";

class StatsComponent extends Component {
  state = {
    username: "",
    token: this.props.cookies.get("token"),
    no_of_articles: 0,
    unique_publishers: 0,
    publishers_names: [],
    publishers_cnt: [],
    ttr: 0,
    get_stats: 0
  };

  shuffle = (arr) => {
    let ctr = arr.length,
      temp,
      index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arr[ctr];
      arr[ctr] = arr[index];
      arr[index] = temp;
    }
    return arr;
  };

  componentDidUpdate(prevProps) {
    if (this.state.username !== this.props.username && this.props.username) {
      this.setState({
        username: this.props.username
      });
    }
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${this.state.token}/stats/`)
      .then((res) => {
        const {
          username,
          no_of_articles,
          unique_publishers,
          publisher_names,
          publishers_cnt,
          ttr
        } = res.data;
        this.setState({
          username,
          no_of_articles,
          unique_publishers,
          publisher_names,
          publishers_cnt,
          ttr: ttr,
          get_stats: 1
        });

        console.log(this.state.publisher_names);
      });
  }

  render() {
    console.log(this.props.username);

    if (!this.state.get_stats) {
      return <SemipolarLoading />;
    }

    const {
      username,
      no_of_articles,
      unique_publishers,
      publisher_names,
      publishers_cnt,
      ttr
    } = this.state;

    const years_to_read = (ttr / (60 * 365)).toFixed(2);
    const [pub1, pub2] = publisher_names;
    const [cnt1, cnt2] = publishers_cnt.map((x) =>
      Math.round((x * 100) / unique_publishers)
    );

    let stats = [
      `It’ll take you ${years_to_read} years to complete your reading list if you read for an hour every day`,
      `${cnt1} % of your reading list is from ${pub1} followed by ${cnt2} % from ${pub2}`,
      `Reading ${no_of_articles} articles is equivalent to researching for ${
        no_of_articles > 2000
          ? "" + Math.round(no_of_articles / 834) + " PHDs"
          : "" + Math.round(no_of_articles / 166) + " Books"
      } `
    ];
    stats = this.shuffle(stats);
    console.log(this.props);

    return (
      <section>
        <div className="container-fluid">
          <div className="main-container-2">
            <div className="user-pocket">
              <h1 className="user-title text-black">
                {username}
                <span className="float-right">
                  <img
                    src={pocket_logo}
                    style={{ height: "3vh", position: "relative", top: "-1vh" }}
                    alt=""
                  />
                </span>
              </h1>
              <p className="rating-title text-dark-gray mt-10">
                your Pocket consists of
              </p>
            </div>
            <div className="user-info">
              <div className="row">
                <div className="col">
                  <p className="text-green number-info">{no_of_articles}</p>
                  <p className="main-title-content text-black articles">
                    Articles
                  </p>
                </div>
                <div className="col">
                  <p className="text-green number-info">{unique_publishers}</p>
                  <p className="main-title-content text-black articles">
                    Publications
                  </p>
                </div>
              </div>
            </div>
            <div className="extra-info mt-60">
              {stats.map((stat, i) => (
                <StatCardComponent key={i} stat={stat} />
              ))}
            </div>
            <div className="text-center mt-40">
              <Link to="/tag-articles" style={{ color: "#fff" }}>
                <button className="btn-general btn-blue btn-bg">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.username
});
export default compose(
  connect(mapStateToProps, null),
  withCookies
)(StatsComponent);
