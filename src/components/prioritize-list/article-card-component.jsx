import React from "react";
import article_img from "../../static/article_img.jpg";

export const ArticleCardComponent = (props) => {
  // console.log();
  const {
    id,
    title,
    publisher,
    ttr,
    top_image_url,
    onArticleClick,
    read_status_incread,
    onDoneClick,
    ...rest
  } = props;
  return (
    <div className="row ptb-20 position-relative">
      <div onClick={onArticleClick} className="col-9 pr-16">
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
      {read_status_incread ? (
        <div>
          <p onClick={onDoneClick} className="text-yellow mt-20 done" id={id}>
            Mark as Done
          </p>
          <div
            id={`green-overlay${id}`}
            className="green-overlay animated fadeIn"
          >
            <p className="green-overlay-content">
              <i className="fa fa-check mr-10"></i>
              Done
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
