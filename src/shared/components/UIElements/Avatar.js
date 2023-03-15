import React from "react";
const Avatar = (props) => {
  return (
    // <div className={`avatar ${props.className}`} style={props.style}>
    //   <img
    //     src={props.image}
    //     alt={props.alt}
    //     style={{ width: props.width, height: props.width }}
    //   />
    // </div>
    <div className="avatar">
      <div className="w-20 rounded-full">
        <img src={props.image} />
      </div>
    </div>
  );
};

export default Avatar;
