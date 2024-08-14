import React, { useEffect, useState } from "react";
import CardManga from "../../components/cardManga";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";

const Page_NewRelease = () => {
  const sv = useSelector((state) => state.server.sv);
  const [readMode, setReadMode] = useState(
    useSelector((state) => state.ReadMode.readmode)
  );
  const newRelease = useFetch(0);
  const getChapterFromUrl2 = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };
  const getChapterFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div className="bg-black px-[60px] pb-[60px]">
      <h2 className="max-[480px]:!text-2xl  text-5xl max-[738px]:text-[34px] max-[480px]:relative text-white font-semibold">
        New Released Comic
      </h2>
      {/* <div className="grid max-[768px]:grid-cols-3 md:grid-cols-6 2xl:grid-cols-7  gap-[20px]  max-[435px]:px-4 max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
        {newRelease &&
          newRelease.length > 0 &&
          newRelease.map((item, index) => (
            <CardManga
              key={index}
              poster={item?.image_poster_link_goc || ""}
              title={item?.title_manga || ""}
              rate={item?.rate || ""}
              update={item.time_release || ""}
              chapterLink={item.url_chapter || ""}
              path_segment={
                item?.url_chapter
                  ? getChapterFromUrl(item?.id_manga || item?.url_manga)
                  : getChapterFromUrl2(item.link_server_novel)
              }
            />
          ))}
      </div> */}
      {readMode ? (
        <div className="grid max-[768px]:grid-cols-3 md:grid-cols-6 2xl:grid-cols-7  gap-[20px]  max-[435px]:px-4 max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
          {newRelease &&
            newRelease.length > 0 &&
            newRelease.map((item, index) => (
              <CardManga
                key={index}
                poster={item?.image_poster_link_goc || item?.poster_novel}
                title={item?.title_manga || item?.title_novel}
                rate={item?.rate || item?.time_update}
                update={item.time_release || item?.time_update}
                chapter={item.chapter_new || item?.title_chapter}
                chapterLink={item.url_chapter || item?.id_chapter}
                path_segment={
                  item?.url_chapter
                    ? getChapterFromUrl(item?.id_manga || item?.url_manga)
                    : getChapterFromUrl2(item.link_server_novel)
                }
              />
            ))}
        </div>
      ) : (
        <div className="grid max-[768px]:grid-cols-3 md:grid-cols-6 2xl:grid-cols-7  gap-[20px]  max-[435px]:px-4 max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
          {newRelease &&
            newRelease.length > 0 &&
            newRelease.map((item, index) => (
              <CardManga
                key={index}
                poster={item?.image_poster_link_goc}
                title={item?.title_manga}
                rate={item?.rate}
                update={item.time_release}
                chapter={item.chapter_new || item.chaper_new}
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
      )}
    </div>
  );
};

export default Page_NewRelease;
