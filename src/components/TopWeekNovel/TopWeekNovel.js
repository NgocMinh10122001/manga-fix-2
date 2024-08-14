import React, { useState } from "react";
import TopWeekNovelCard from "./TopWeekNovelCard";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const TopWeekNovel = () => {
  const TopWeekNovel = useFetch(4);
  const [readMode, setReadMode] = useState(
    useSelector((state) => state.ReadMode.readmode)
  );
  const sv = useSelector((state) => state.server.sv);
  const topWeekNovel = TopWeekNovel.slice(0, 15);
  const navigate = useNavigate();

  console.log("topWeekNovel: ", topWeekNovel);
  return (
    <>
      {/* {readMode === true ? (
        <div className=" mx-[60px]  gap-[20px] max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
          {topWeekNovel.map((item, index) => (
            <TopWeekNovelCard
              key={index}
              poster={item?.image_poster_link_goc}
              title={item?.title_manga}
              rate={item?.rate}
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
        <div className="bg-gray-700 m-5 rounded-lg  p-3 max-[435px]:px-4 max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
          {topWeekNovel.map((item, index) => {
            const path_segment = item?.path_segment_manga
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
                );

            const chapterUrl1 = item.url_chapter.endsWith("/")
              ? item.url_chapter.slice(0, -1).split("/")
              : item.url_chapter.split("/");

            const chapterUrl2 = chapterUrl1[chapterUrl1.length - 1].split("-");
            const newChapter = chapterUrl1[chapterUrl1.length - 1];

            return (
              //   <div>
              //       <div></div>
              //     <TopWeekNovelCard
              //       key={index}
              //       poster={item?.image_poster_link_goc || item?.poster_novel}
              //       title={item?.title_manga || item?.title_novel}
              //       rate={item?.rate || item?.time_update}
              //       update={item.time_release || item?.time_update}
              //       chapter={item.chapter_new || item?.title_chapter}
              //       chapterLink={item.url_chapter || item?.id_chapter}
              //       path_segment={
              //         item?.path_segment_manga
              //           ? item?.path_segment_manga
              //           : item?.url_manga
              //           ? item?.url_manga.replace(
              //               "https://apimanga.mangasocial.online/rmanga/",
              //               ""
              //             )
              //           : item.link_server_novel.replace(
              //               `https://apimanga.mangasocial.online/web/rnovel/${sv}/`,
              //               ""
              //             )
              //       }
              //     />
              //   </div>
              <NavLink
                key={index}
                to={`/${sv}/chapter/${path_segment}`}
                className="flex flex-start text-white hover:!border-b-[1px] gap-2 items-center"
              >
                <div className="bg-green-500 flex-shrink-0 my-3 text-white rounded-full w-10 h-10 flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="text-[1.2em] w-full truncate">
                  <span className="font-bold text-white">{item.author}</span> |
                  <span className="italic"> {item.title_manga}</span>-
                  <button
                    className="text-blue-500  hover:underline focus:outline-none"
                    onClick={() =>
                      navigate(`/${sv}/novel/${path_segment}/${newChapter}`)
                    }
                  >
                    {item?.chapter_new || item.chapter_new}
                  </button>
                </div>
              </NavLink>
            );
          })}
        </div>
      )} */}
      <div className="bg-gray-700 m-5 rounded-lg  p-3 max-[435px]:px-4 max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
        {topWeekNovel.map((item, index) => {
          const path_segment = item?.path_segment_manga
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
              );

          const chapterUrl1 = item.url_chapter.endsWith("/")
            ? item.url_chapter.slice(0, -1).split("/")
            : item.url_chapter.split("/");

          const chapterUrl2 = chapterUrl1[chapterUrl1.length - 1].split("-");
          const newChapter = chapterUrl1[chapterUrl1.length - 1];

          return (
            //   <div>
            //       <div></div>
            //     <TopWeekNovelCard
            //       key={index}
            //       poster={item?.image_poster_link_goc || item?.poster_novel}
            //       title={item?.title_manga || item?.title_novel}
            //       rate={item?.rate || item?.time_update}
            //       update={item.time_release || item?.time_update}
            //       chapter={item.chapter_new || item?.title_chapter}
            //       chapterLink={item.url_chapter || item?.id_chapter}
            //       path_segment={
            //         item?.path_segment_manga
            //           ? item?.path_segment_manga
            //           : item?.url_manga
            //           ? item?.url_manga.replace(
            //               "https://apimanga.mangasocial.online/rmanga/",
            //               ""
            //             )
            //           : item.link_server_novel.replace(
            //               `https://apimanga.mangasocial.online/web/rnovel/${sv}/`,
            //               ""
            //             )
            //       }
            //     />
            //   </div>
            <NavLink
              key={index}
              to={`/${sv}/chapter/${path_segment}`}
              className="flex flex-start text-white hover:!border-b-[1px] gap-2 items-center"
            >
              <div className="bg-green-500 flex-shrink-0 my-3 text-white rounded-full w-10 h-10 flex items-center justify-center">
                {index + 1}
              </div>
              <div className="text-[1.2em] w-full truncate">
                <span className="font-bold text-white">{item.author}</span> |
                <span className="italic"> {item.title_manga}</span>-
                <NavLink
                  className="text-blue-500  hover:underline focus:outline-none"
                  onClick={() =>
                    navigate(`/${sv}/novel/${path_segment}/${newChapter}`)
                  }
                >
                  {item?.chapter_new || item.chapter_new}
                </NavLink>
              </div>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default TopWeekNovel;
