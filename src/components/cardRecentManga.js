import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const CardRecentManga = ({
  poster,
  title,
  rate,
  update,
  chapter,
  path_segment,
  chapterLink,
  categories,
}) => {
  const sv = useSelector((state) => state.server.sv);
  const readmode = useSelector((state) => state.ReadMode.readmode);
  const chapterNumberReadMode = chapterLink ? chapterLink : "";
  // console.log("check link", chapterNumberReadMode);
  // console.log("chapter",chapterLink);
  const getChapterFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const getChapterFromUrl2 = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };
  const truncateTile = (title, maxLength) => {
    if (title.length > maxLength) {
      return `${title.slice(0, maxLength)}......`;
    }
    return title;
  };

  // console.log("check link", chapterNumberReadMode);
  return (
    <NavLink
      to={`/${sv}/chapter/${path_segment}`}
      className="w-50% border-b pb-2 hover:border-b2 border-white flex gap-2 "
    >
      <img
        className="h-[190px] w-[120px] object-cover transition-transform duration-500 group-hover:scale-110 rounded-[12px]"
        src={poster}
        alt=""
      />
      <div className="text-[#FFFFFF] flex flex-col gap-2">
        <div className="mt-2 max-[435px]:mt-1 max-[435px]:w-full ">
          <p className="text-[#FFFFFF] lg:text-[16px] max-[435px]:w-full whitespace-nowrap truncate 2xl:text-[18px] leading-1  font-semibold overflow-hidden   max-[435px]:leading-[1.75rem]">
            {truncateTile(title, 16)}
          </p>
        </div>
        {/* {rate && (
          <div className="flex items-center gap-[12px] max-[435px]:gap-2">
            <img
              className="w-5 h-5 max-[435px]:w-4 max-[435px]:h-4"
              src="/images/star.png"
              alt=""
            />
            <div className="text-[20px] max-[435px]:text-[13px]">
              <span className="">{rate}</span>
              <span className="">/5</span>
            </div>
          </div>
        )} */}
        <p className="font-semibold truncate w-[70%]">
          Categories: {truncateTile(categories, 20)}
        </p>
        <p className="text-[#cccbcb] font-sm">Last Update: {update}</p>
        <NavLink
          // to={`
          // /${
          //   readmode
          //     ? getChapterFromUrl2(chapterNumberReadMode)
          //     : getChapterFromUrl(chapterNumberReadMode)
          // }`}
          // to={`/${sv}/${
          //   sv === 4 || sv === 11 ? "novel" : "chapter"
          // }/${path_segment}/${getChapterFromUrl(chapterNumberReadMode)}`}
          to={`/${sv}/${
            sv === 4 || sv === 11
              ? `${chapterNumberReadMode === "" ? "chapter" : "novel"}`
              : "chapter"
          }/${path_segment}/${
            getChapterFromUrl(chapterNumberReadMode) === "None"
              ? ""
              : chapterNumberReadMode.includes("web")
              ? getChapterFromUrl2(chapterNumberReadMode)
              : getChapterFromUrl(chapterNumberReadMode)
          }`}
        >
          <p className="lg:text-[12px] text-white 2xl:text-[18px] max-[435px]:text-[13px] font-semibold  max-[435px]:mt-0">
            {chapter}
          </p>
        </NavLink>
      </div>
      {/* <div className=" cursor-pointer">
        <div className="rounded-xl group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
          <div className="w-full h-[auto] max-[435px]:h-[160px]"></div>
        </div>

        <div className="text-[#FFFFFF]">
          <div className="mt-2 max-[435px]:mt-1 max-[435px]:w-full ">
            <p className="text-[#FFFFFF] lg:text-[16px] max-[435px]:w-full whitespace-nowrap truncate 2xl:text-[18px] leading-1  font-semibold overflow-hidden   max-[435px]:leading-[1.75rem]">
              {truncateTile(title, 16)}
            </p>
            <NavLink
              // to={`
              // /${
              //   readmode
              //     ? getChapterFromUrl2(chapterNumberReadMode)
              //     : getChapterFromUrl(chapterNumberReadMode)
              // }`}
              // to={`/${sv}/${
              //   sv === 4 || sv === 11 ? "novel" : "chapter"
              // }/${path_segment}/${getChapterFromUrl(chapterNumberReadMode)}`}
              to={`/${sv}/${
                sv === 4 || sv === 11
                  ? `${chapterNumberReadMode === "" ? "chapter" : "novel"}`
                  : "chapter"
              }/${path_segment}/${
                getChapterFromUrl(chapterNumberReadMode) === "None"
                  ? ""
                  : chapterNumberReadMode.includes("web")
                  ? getChapterFromUrl2(chapterNumberReadMode)
                  : getChapterFromUrl(chapterNumberReadMode)
              }`}
            >
              <p className="lg:text-[12px] 2xl:text-[18px] max-[435px]:text-[13px]  font-semibold  max-[435px]:mt-0">
                {chapter}
              </p>
            </NavLink>
          </div>
          {rate && (
            <div className="flex items-center gap-[12px] max-[435px]:gap-2">
              <img
                className="w-5 h-5 max-[435px]:w-4 max-[435px]:h-4"
                src="/images/star.png"
                alt=""
              />
              <div className="text-[20px] max-[435px]:text-[13px]">
                <span className="">{rate}</span>
                <span className="">/5</span>
              </div>
            </div>
          )}

          {update && (
            <div className=" max-[435px]:w-full bg-[#363636] w-max rounded-[20px] mt-3 max-[435px]:mt-1 max-[435px]:py-[0px] max-[435px]:px-[0px]">
              <p className="max-[435px]:w-full max-[435px]:truncate max-[435px]:text-center text-sm whitespace-nowrap text-white bg-gray-900  p-1 px-2 rounded-lg leading-8 font-semibold">
                Update: {update}
              </p>
            </div>
          )}
        </div>
      </div> */}
    </NavLink>
  );
};

export default CardRecentManga;
