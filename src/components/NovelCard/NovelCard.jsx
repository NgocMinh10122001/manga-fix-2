import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NovelCard = ({ chapter, title, poster, des, slug, chapterLink,chapterName }) => {
  // console.log("check link", chapterLink);
  const sv = useSelector((state) => state.server.sv);
  const readmode = useSelector((state) => state.ReadMode.readmode);
  const user_id = sessionStorage.getItem("user_id");
  const chapterNumber = chapter?.replace(
    `http://apimanga.mangasocial.online/rmanga/${slug}/`,
    ""
  );
  const chapterNumberReadMode = chapterLink
  // console.log("chapter",chapterLink);
   const getChapterFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
   };
   const getChapterFromUrl2 = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };
  // console.log("check slug", chapterLink)

  const truncatedDes = des.length > 50 ? `${des.slice(0, 50)}...` : des;
  return (
    <>
      <NavLink
        to={`/${sv}/novel2/${slug}/${getChapterFromUrl(chapterNumberReadMode)}`}
      >
        <div className=" flex md:flex-row items-center gap-4 md:gap-[80px] my-3  cursor-pointer py-4 md:py-8 px-2 md:px-12 transition-all duration-200">
          {/* chapter info */}
          <div className="flex items-center gap-4 md:gap-12 w-full md:w-auto">
            <img
              src={poster}
              alt=""
              className="h-24 md:h-[150px] w-24 md:w-[150px] object-cover rounded-xl"
            />
            <div>
              <div className="text-base md:text-xl py-1 md:py-2 font-semibold whitespace-nowrap leading-5 md:leading-7 text-white">
                <span className="underline decoration-1 whitespace-nowrap">
                  {` ${chapterName} `}
                </span>
              </div>
              <div className="text-sm md:text-base font-medium leading-5 md:leading-6 text-gray-400">
                12/07/2023
              </div>
            </div>
          </div>
          <div className="flex md:flex-row ps-8 items-start md:items-center justify-between w-full md:gap-0">
            <div className="text-xl block text-center max-[480px]:hidden md:text-2  xl leading-5 md:leading-6 font-medium text-gray-300 w-full md:w-3/4 ">
              {truncatedDes}
            </div>
            {user_id ? (
              <div className="text-sm md:text-2xl leading-5 md:leading-6 font-semibold text-[#ff9f66] w-full md:w-1/4 text-right">
                Read
              </div>
            ) : (
              <div className="text-sm md:text-2xl leading-5 md:leading-6 font-semibold text-[#ff9f66] w-full md:w-1/4 text-right">
                Login
              </div>
            )}
          </div>
        </div>
        <div className="text-xl hidden max-[480px]:block md:text-base leading-5 md:leading-6 font-medium text-gray-300 w-full">
          {truncatedDes}
        </div>
      </NavLink>
    </>
  );
};

export default NovelCard;