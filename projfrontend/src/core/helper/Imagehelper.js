import React from "react";

const Imagehelper = ({ product }) => {
  const imageurl = product
    ? product.image
    : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdERuNbjpKTm-TLA8CNUzaYiaVyjXtroHlWIE2G5QS8H_y9hnm920L9SlqiDAMkYQobW6vsiEb&usqp=CAc`;
  return (
    <div className="rounded border border-success p-2 ">
      <img 
      src={imageurl} 
      style={{ maxHeight:"100%",maxWidth: "100%"}}
      className="mb-3 rounded"
      alt="" 
      />
    </div>
  );
};

export default Imagehelper;
