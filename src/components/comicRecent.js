import React, { useState } from "react";
import CardManga from "./cardManga";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import CardRecentManga from "./cardRecentManga";

const ComicRecent = () => {
  const comicRecent = useFetch(1);
  const [visibleCount, setVisibleCount] = useState(8);
  const [readMode, setReadMode] = useState(
    useSelector((state) => state.ReadMode.readmode)
  );
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };
  const sv = useSelector((state) => state.server.sv);
  // console.log(comicRecent);
  const firstFiveItem = comicRecent.slice(0, 8);
  console.log("sssssssssssssddddddđ", firstFiveItem);
  return (
    <>
      {readMode === false ? (
        <div className="grid grid-cols-2  max-[480px]:grid-cols-1 mx-[60px]  gap-[20px] max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
          {comicRecent.slice(0, visibleCount).map((item, index) => (
            <CardRecentManga
              key={index}
              poster={item?.image_poster_link_goc}
              title={item?.title_manga}
              rate={item?.rate}
              categories={item?.categories}
              update={item.time_release}
              chapter={item.chapter_new || item?.chaper_new}
              chapterLink={item.url_chapter}
              path_segment={
                item?.path_segment_manga
                  ? item?.path_segment_manga
                  : (item?.url_manga && sv === 4) ||
                    sv === 9 ||
                    sv === 11 ||
                    sv === 12
                  ? item?.url_manga.replace(
                      "https://apimanga.mangasocial.online/rnovel/",
                      ""
                    )
                  : item?.url_manga.replace(
                      "https://apimanga.mangasocial.online/rmanga/",
                      ""
                    )
              }
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2  gap-[20px] px-[60px] max-[435px]:px-4 max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
          {comicRecent
            .slice(0, visibleCount)
            .comicRecent.slice(0, visibleCount)
            .map((item, index) => (
              <CardRecentManga
                key={index}
                poster={item?.image_poster_link_goc || item?.poster_novel}
                title={item?.title_manga || item?.title_novel}
                rate={item?.rate || item?.time_update}
                update={item.time_release || item?.time_update}
                chapter={item.chapter_new || item?.title_chapter}
                chapterLink={item.url_chapter || item?.id_chapter}
                path_segment={
                  item?.path_segment_manga
                    ? item?.path_segment_manga
                    : item?.url_manga
                    ? item?.url_manga.replace(
                        "https://apimanga.mangasocial.online/rmanga/",
                        ""
                      )
                    : item.link_server_novel.replace(
                        `https://apimanga.mangasocial.online/web/rnovel/${sv}/`,
                        ""
                      )
                }
              />
            ))}
        </div>
      )}
      <div className="text-center font-semibold text-xl pb-[100px]">
        {visibleCount < comicRecent.length && (
          <button
            onClick={handleShowMore}
            className=" text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg px-4 py-2 mt-4 transition-all duration-300"
          >
            More
          </button>
        )}
      </div>
    </>
  );
};

export default ComicRecent;
