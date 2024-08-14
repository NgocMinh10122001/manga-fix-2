import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const LatestCardNovel = ({
  poster,
  title,
  rate,
  update,
  chapter,
  path_segment,
  chapterLink,
  url_manga,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mangaChapters, setMangaChapters] = useState();
  const titleRef = useRef(null);
  const sv = useSelector((state) => state.server.sv);
  const readmode = useSelector((state) => state.ReadMode.readmode);
  const [pathName, setPathName] = useState("");
  const chapterNumberReadMode = chapterLink ? chapterLink : "";

  const getChapterFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const truncatedTitle = (title, length) => {
    return title.length > length ? title.slice(0, length) + "....." : title;
  };

  const chapterUrl1 = chapterLink.endsWith("/")
    ? chapterLink.slice(0, -1).split("/")
    : chapterLink.split("/");
  const chapterUrl2 = chapterUrl1[chapterUrl1.length - 1].split("-");
  const newChapter = chapterUrl1[chapterUrl1.length - 1];
  console.log("chapterlink: ", chapterLink);

  const getChapterFromUrl2 = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  return (
    <>
      <NavLink
        // to={`/${sv}/${
        //   sv === 4 || sv === 11
        //     ? `${chapterNumberReadMode === "" ? "chapter" : "novel"}`
        //     : "chapter"
        // }/${path_segment}`}
        to={`/${sv}/chapter/${path_segment}`}
        className="w-full border-b pb-2 border-white border-opacity-25 flex justify-between  hover:border-b2 hover:text-white transition-all duration-300"
      >
        <div className="flex text-white w-ful gap-4 justify-start">
          <img
            src={poster}
            data-src={poster}
            data-original={poster}
            className="h-[auto] w-[109px] object-cover"
          />
          <div className="relative h-full max-[486px]:max-w-[290px] max-[846px]:max-w-[700px] min-[761px]:max-w-[730px] min-[800px]:max-w-[750px] min-w[1000px]:max-w[900px] max-[761px]:max-w-[600px] max-[683px]:max-w-[300px] max-[360px]:max-w-[250px] max-[333px]:max-w-[200px]">
            <h2
              className="text-white font-bold  mb-3 text-xl truncate"
              ref={titleRef}
            >
              {truncatedTitle(title, 20)}
              {/* {title} */}
            </h2>
            <ul className="p-0 m-0 mt-2 ">
              <li className="my-2 text-lg hover:underline rounded-lg cursor-pointer">
                <NavLink
                  to={`/${sv}/${
                    sv === 4 || sv === 11
                      ? `${chapterNumberReadMode === "" ? "chapter" : "novel"}`
                      : "chapter"
                  }/${path_segment}/${newChapter}`}
                >
                  Chapter: {chapterUrl2[chapterUrl2.length - 1]}
                </NavLink>
              </li>
            </ul>
            <p className="hidden  max-[600px]:inline-block mt-4 text-sm whitespace-nowrap text-white bg-gray-900  p-2 rounded-lg">
              Update: {update}
            </p>
          </div>
        </div>
        <div className="max-[600px]:hidden flex-shrink-0 flex flex-col">
          <div className="mt-auto">
            <p className="text-sm inline-block text-white bg-gray-900 p-2 rounded-lg">
              Update: {update}
            </p>
          </div>
        </div>
      </NavLink>
    </>
    // <NavLink
    //   to={`/${sv}/${
    //     sv === 4 || sv === 11
    //       ? `${chapterNumberReadMode === "" ? "chapter" : "novel"}`
    //       : "chapter"
    //   }/${path_segment}`}
    //   className="w-full border-b pb-2 border-white border-opacity-25 flex justify-between  hover:border-b2 hover:text-white transition-all duration-300"
    // >
    //   <div className="flex text-white w-ful gap-4 justify-start">
    //     <img
    //       src={poster}
    //       data-src={poster}
    //       data-original={poster}
    //       className="h-[auto] w-[109px] object-cover"
    //     />
    //     <div className="relative h-full max-[486px]:max-w-[290px] max-[846px]:max-w-[700px] min-[761px]:max-w-[730px] min-[800px]:max-w-[750px] min-w[1000px]:max-w[900px] max-[761px]:max-w-[600px] max-[683px]:max-w-[300px] max-[360px]:max-w-[250px] max-[333px]:max-w-[200px]">
    //       <h2
    //         className="text-white font-bold mb-3 text-xl truncate max-w-full"
    //         ref={titleRef}
    //       >
    //         {/* {truncatedTitle} */}
    //         {title}
    //       </h2>
    //       <ul className="p-0 m-0 mt-2 ">
    //         <li className="my-2 text-lg hover:underline rounded-lg cursor-pointer">
    //           <NavLink
    //             to={`/${sv}/${
    //               sv === 4 || sv === 11
    //                 ? `${chapterNumberReadMode === "" ? "chapter" : "novel"}`
    //                 : "chapter"
    //             }/${path_segment}/${newChapter}`}
    //           >
    //             Chapter: {chapterUrl2[chapterUrl2.length - 1]}
    //           </NavLink>
    //         </li>
    //       </ul>
    //       <p className="hidden  max-[600px]:block mt-4 text-sm whitespace-nowrap text-white bg-gray-900  p-2 rounded-lg">
    //         Update: {update}
    //       </p>
    //     </div>
    //   </div>
    //   <div className="max-[600px]:hidden flex-shrink-0 flex flex-col">
    //     <div className="mt-auto">
    //       <p className="text-sm inline-block text-white bg-gray-900 p-2 rounded-lg">
    //         Update: {update}
    //       </p>
    //     </div>
    //   </div>
    // </NavLink>
  );
};

export default LatestCardNovel;
