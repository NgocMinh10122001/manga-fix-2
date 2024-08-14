import React from "react";
import { Link, NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
const Comments = () => {
  const cmt = useFetch(12);
  // console.log(cmt);
  const sv = useSelector((state) => state.server.sv);
  const extractNovelId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };
  return (
    <div>
      <div className="comments max-[600px]:!m-0 max-[600px]:px-4 max-[600px]:pb-4 max-[600px]:!gap-6 max-[600px]:!flex max-[600px]:!flex-col">
        {cmt?.map((item, index) => (
          <div key={index}>
            <div className="item-comments max-[600px]:!m-0 max-[600px]:!flex max-[600px]:!flex-col max-[600px]:!items-start">
              <div className="left-comment max-[600px]:flex max-[600px]:flex-col max-[600px]:gap-2">
                <div className="topic-comic max-[600px]:!gap-0">
                  <div className="wrap-mask  max-[600px]:!bg-transparent max-[600px]:!p-0 max-[600px]:!object-contain max-[600px]:flex max-[600px]:items-center max-[600px]:!w-0 max-[600px]:!h-0">
                    <img
                      className="mask max-[600px]:!object-contain max-[600px]:!w-[32px] max-[600px]:!h-[32px]"
                      src="/images/Mask group.svg"
                    ></img>
                  </div>
                  <p className="name-topic max-[600px]:!text-lg ">
                    {item.title_manga}
                  </p>
                </div>
                <div className="viewer max-[600px]:flex max-[600px]:items-center max-[600px]:!mt-0">
                  <img
                    className="ellips rounded-full max-[600px]:!w-[32px] max-[600px]:!h-[32px]"
                    src={item.avatar_user}
                  ></img>
                  <p className="name-user max-[600px]:!text-lg max-[600px]:overflow-hidden max-[600px]:!w-[200px]">
                    {item.name_user}
                  </p>
                  {/* <p className="add-cmt max-[600px]:!text-lg">
                  Has add a comment
                </p> */}
                  {/* <div className="right-comment hidden max-[600px]:block max-[600px]:!gap-3 max-[600px]:!mr-0">
                    <div className="number flex items-center ">
                      <p className="title-number max-[600px]:!text-lg">
                        Comment
                      </p>
                      <p className="number-cm max-[600px]:!text-lg">
                        {item.count_comment}
                      </p>
                    </div>
                    <div className="number flex items-center ">
                      <p className="title-number max-[600px]:!text-lg">
                        Discuss
                      </p>
                      <p className="number-cm max-[600px]:!text-lg">
                        {item.count_reply_comment}
                      </p>
                    </div>
                  </div> */}
                </div>
                <div className="coment-user max-[600px]:!mt-0 max-[600px]:flex max-[600px]:items-center">
                  <img
                    className="bxs-chat"
                    src="/images/bxs_chat.svg max-[600px]:!w-[32px] max-[600px]:!h-[32px]"
                  ></img>
                  <p className="mess-chat max-[600px]:!text-lg max-[600px]:overflow-hidden">
                    {item.content}
                  </p>
                  <img className="ri-book" src="/images/ri_book-fill.svg"></img>
                  <NavLink
                    className="comic-name max-[600px]:!text-lg max-[600px]:overflow-hidden"
                    to={`/${sv}/chapter/${extractNovelId(item.url_manga)}
                  `}
                  >
                    {item.title_manga}
                  </NavLink>
                </div>
              </div>
              <div className="right-comment max-[600px]:hidden">
                <div className="number">
                  <p className="title-number max-[600px]:!text-lg">Comment</p>
                  <p className="number-cm max-[600px]:!text-lg">
                    {item.count_comment}
                  </p>
                </div>
                <div className="number">
                  <p className="title-number max-[600px]:!text-lg">Discuss</p>
                  <p className="number-cm max-[600px]:!text-lg">
                    {item.count_reply_comment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
