import React from "react";

function Details(props) {
  const getFeaturings = () => {
    if(props.song.featurings.length) {
      return (
        <h4 className="details-featuring">
        featuring {props.song.featurings.map((artist) => {return artist.attributes.name}).join(",")}
      </h4>
      );
    }
  };

  return (
    <div className="my-player--details">
      <div className="details-img">
        <img src={props.song.img_src} alt="" />
      </div>
      <h3 className="details-title">{props.song.title}</h3>
      <h4 className="details-artist">
        {props.song.artist.name}
      </h4>
      {getFeaturings()}
    </div>
  );
}

export default Details;
