import React from "react";

const StatCardComponent = ({ stat }) => {
  return (
    <div className="row row-pb-16">
      <div className="col-1 position-relative">
        <div className="rating-icon-2"></div>
      </div>
      <div className="col pl-10">
        <p className="rating-title text-gray">{stat}</p>
      </div>
    </div>
  );
};

export default StatCardComponent;
