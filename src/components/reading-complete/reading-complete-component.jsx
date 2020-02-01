import React, { Component } from "react";
import reading_complete from "../../static/reading_complete.svg";

export default class ReadingCompleteComponent extends Component {
  render() {
    return (
      <section id="page-7" className="ht-100">
        <div className="illus-page-7">
          <img src={reading_complete} alt="" />
        </div>
        <div className="container-fluid">
          <div className="main-container-2 border-bottom-grey">
            <div className="user-stats">
              <p className="user-title text-black">Aditya's</p>
              <p className="rating-title text-dark-gray mt-10">
                Reading Stats for Today
              </p>
            </div>
            <div className="user-stats-content mt-20 clearfix">
              <div className="float-left mr-20">
                <p className="user-stats-content-inner text-green">21</p>
                <p className="rating-content text-dark-gray">Articles</p>
              </div>
              <div className="float-left mr-20">
                <p className="user-stats-content-inner text-green">19</p>
                <p className="rating-content text-dark-gray">Minutes</p>
              </div>
            </div>
          </div>
          <div className="border-stats"></div>
          <div className="text-center mt-20">
            <button className="btn-general btn-blue btn-bg">Read More</button>
            <p className="mt-40 done text-blue">Tag 7 new articles</p>
          </div>
        </div>
      </section>
    );
  }
}
