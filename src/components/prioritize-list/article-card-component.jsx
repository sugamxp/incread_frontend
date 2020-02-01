import React from "react";
import article_img from "../../static/article_img.jpg";

export const ArticleCardComponent = (props) => {
  // console.log();
  const { title, publisher, ttr, top_image_url, onClick, ...rest } = props;
  return (
    <div onClick={onClick} className="row ptb-20 position-relative">
      <div className="col-9 pr-16">
        <p className="rating-title text-black">{title}</p>
        <div className="mt-10 rating-content text-gray">
          {publisher}
          {ttr ? <span className="ml-10">{ttr} min</span> : null}
        </div>
      </div>
      <div className="col-3">
        {top_image_url ? (
          <img
            src={top_image_url}
            style={{ width: "20vw", height: "7vh" }}
            alt={article_img}
            className="float-right"
          />
        ) : (
          <img
            src={article_img}
            style={{ width: "20vw", height: "7vh" }}
            alt=""
            className="float-right"
          />
        )}
      </div>
      {/* <p className="text-yellow mt-20 done" id="done1">
        Mark as Done
      </p>
      <div className="green-overlay">
        <p className="green-overlay-content">
          <i className="fa fa-check mr-10"></i>Done
        </p>
      </div> */}
    </div>
  );
};
