import React from "react";

const PostCard = ({ title, category, author, rate, cover, price }) => {
  return (
    <div className="w-[300px] p-2 bg-zinc-100 shadow-sm flex flex-col justify-center">
      <div>
        <img src={cover} />
      </div>
      <div>{title}</div>
      <div>{category}</div>
      <div>{author}</div>
      <div>{price}</div>
      <div>{rate}</div>
    </div>
  );
};

export default PostCard;
