import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const HotCardManga = ({
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

  const chapterUrl1 = chapterLink.endsWith("/")
    ? chapterLink.slice(0, -1).split("/")
    : chapterLink.split("/");
  const chapterUrl2 = chapterUrl1[chapterUrl1.length - 1].split("-");
  const newChapter = chapterUrl1[chapterUrl1.length - 1];

  const urlToManga = chapterLink.endsWith("/")
    ? chapterLink.slice(0, -1).split("/")
    : chapterLink.split("/");

  const getChapterFromUrl2 = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  useEffect(() => {
    if (titleRef.current) {
      setShowTooltip(
        titleRef.current.offsetWidth < titleRef.current.scrollWidth
      );
    }
  }, [title]);

  return (
    <NavLink
      to={`/${sv}/${
        sv === 4 || sv === 11
          ? `${chapterNumberReadMode === "" ? "chapter" : "novel"}`
          : "chapter"
      }/${path_segment}`}
      className={` border-b h-[auto] mt-3 mx-3 w-[1/7] inline-block pb-2 border-white border-opacity-25 justify-between`}
    >
      {/* <div className="flex text-white w-ful gap-4 justify-start">
        <img src={poster} className="h-[auto] w-[109px] object-cover" />
        <div className="relative h-full max-[486px]:max-w-[290px] max-[360px]:max-w-[250px] max-[333px]:max-w-[200px]">
          <h2
            className="text-white font-bold mb-3 text-xl truncate max-w-full"
            ref={titleRef}
          >
            {title}
          </h2>
        </div>
      </div> */}
      <img
        src={poster}
        className="h-[240px] w-[166px] max-[480px]:h-[150px] max-[480px]:w-[100px]"
      />
    </NavLink>
  );
};

export default HotCardManga;
