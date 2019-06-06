import React from 'react';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/group_index.css';

const Loading = ({ percent }) => {
  let component = document.getElementsByClassName('filled-beer')[0];
  if (component) {
    component.setAttribute("style", `height: ${100 - percent}px`);
  }

  return (
    <div className="loading-screen-beer">
      <div className="beer-mug">

      </div>
      <div className="fill-cover">

      </div>
      <div className="filled-beer">

      </div>
      <h2 className="percent-loading">
        {Math.round(percent)}%
      </h2>
    </div>
  )
};

export default Loading;