import React, { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import Loading from "../Loading/Loading";
import LatestCardManga from "./LatestCardManga";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import CardManga from "../cardManga";

const LatestManga = () => {
  const [rangePagination, setRangePagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageForOtherButton, setCurrentPageForOtherButton] = useState(1);
  const [mangasPerPage] = useState(4);
  const [loading, setLoading] = useState(false);

  const [readMode, setReadMode] = useState(
    useSelector((state) => state.ReadMode.readmode)
  );
  const [newRelease, setNewRelease] = useState();
  const sv = useSelector((state) => state.server.sv);
  const id_user = () => {
    if (sessionStorage.getItem("user_id") == null) {
      return 0;
    } else return sessionStorage.getItem("user_id");
  };

  // console.log("check detail", newRelease);
  const getChapterFromUrl2 = (url) => {
    if (url) {
      const parts = url.split("/");
      return parts[parts.length - 2];
    }
  };
  const getChapterFromUrl = (url) => {
    if (url) {
      console.log("aaaaaaaaaaaaaaa", url);
      const parts = url.split("/");
      return parts[parts.length - 2];
    }
  };

  const handlePageClick = (pageNumber) => {
    let clickPageNumber = pageNumber;
    if (pageNumber == 0) {
      clickPageNumber = 1;
    }
    if (pageNumber >= newRelease.page_info[1].total_page - 4) {
      setRangePagination(true);
      setCurrentPageForOtherButton(clickPageNumber);
      setCurrentPage(clickPageNumber);
      return "";
    }
    setRangePagination(false);
    setCurrentPage(clickPageNumber);
  };
  useEffect(() => {
    // const getData = async () => {
    //   setLoading(true);
    //   const response = await axios.get(
    //     `https://apimanga.mangasocial.online/${sv}/manga/lastest_manga/${currentPage}`
    //   );
    //   setNewRelease(response.data);
    //   console.log("pageeeee", response.data);

    //   setLoading(false);
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "smooth",
    //   });
    //   console.log("newRelease:sss ", newRelease);
    //   return response.data;
    // };
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://apimanga.mangasocial.online/${sv}/manga/lastest_manga/${currentPage}`
        );
        setNewRelease(response.data);
        console.log("pageeeee", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    getData();
  }, [currentPage, sv]);

  return (
    // <></>
    <>
      {readMode === false ? (
        loading ? (
          <Loading
            type={"spin"}
            color={"#FF9F66"}
            height={300}
            width={300}
            text="Loading..."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 mx-10">
            {newRelease &&
              newRelease["list_manga"].map((item, index) => (
                <LatestCardManga
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
        )
      ) : loading ? (
        <Loading
          type={"spin"}
          color={"#FF9F66"}
          height={300}
          width={300}
          text="Loading..."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 mx-10">
          {newRelease &&
            newRelease["list_manga"].map((item, index) => (
              <LatestCardManga
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
      <div className="flex items-center justify-center max-[416px]:px-5 max-[416px]:flex-start flex-wrap grid-flow-row mt-5  ">
        <button
          onClick={() => handlePageClick(1)}
          className="text-white px-3 py-1 max-[480px]:!px-1 max-[480px]:text-sm flex gap-0 bg-gray-800 hover:bg-gray-600 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
        >
          <FaAngleDoubleLeft size={24} />
        </button>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className="text-white px-3 py-1 flex gap-0 max-[480px]:!px-1 max-[480px]:text-sm bg-gray-800 hover:bg-gray-600 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
        >
          <FaArrowLeft size={24} />
        </button>
        <button
          onClick={() =>
            handlePageClick(
              rangePagination
                ? (newRelease && newRelease.page_info[1].total_page) - 4
                : currentPage
            )
          }
          className={
            `text-white px-3 py-1 max-[480px]:!px-1 border max-[480px]:text-sm border-gray-600 ${
              rangePagination == false
                ? "bg-gray-600"
                : `${
                    currentPage ==
                    (newRelease && newRelease.page_info[1].total_page) - 4
                      ? "bg-gray-600"
                      : "bg-gray-800"
                  }`
            } rounded-md transition-colors duration-200 ease-in-out ` +
            `${
              currentPage ==
              (newRelease && newRelease.page_info[1].total_page) - 4
                ? "bg-gray-600"
                : ""
            }`
          }
        >
          {rangePagination
            ? (newRelease && newRelease.page_info[1].total_page) - 4
            : currentPage}
        </button>

        <button
          onClick={() =>
            handlePageClick(
              rangePagination
                ? (newRelease && newRelease.page_info[1].total_page) - 3
                : currentPage + 1
            )
          }
          className={
            `${
              currentPage ==
              (newRelease && newRelease.page_info[1].total_page) - 3
                ? "bg-gray-600"
                : " bg-gray-800"
            }` +
            " text-white px-3 py-1 max-[480px]:!px-1 max-[480px]:text-sm border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
          }
        >
          {rangePagination
            ? (newRelease && newRelease.page_info[1].total_page) - 3
            : currentPage + 1}
        </button>

        <button
          onClick={() =>
            handlePageClick(
              rangePagination
                ? (newRelease && newRelease.page_info[1].total_page) - 2
                : currentPage + 2
            )
          }
          className={
            `${
              currentPage ==
              (newRelease && newRelease.page_info[1].total_page) - 2
                ? "bg-gray-600"
                : " bg-gray-800"
            }` +
            " text-white px-3 py-1 max-[480px]:!px-1 max-[480px]:text-sm border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
          }
        >
          {rangePagination
            ? (newRelease && newRelease.page_info[1].total_page) - 2
            : currentPage + 2}
        </button>

        <button
          onClick={() =>
            handlePageClick(
              rangePagination
                ? (newRelease && newRelease.page_info[1].total_page) - 1
                : currentPage + 3
            )
          }
          className={
            `${
              currentPage ==
              (newRelease && newRelease.page_info[1].total_page) - 1
                ? "bg-gray-600"
                : " bg-gray-800"
            }` +
            " text-white px-3 py-1 max-[480px]:!px-1 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
          }
        >
          {rangePagination
            ? (newRelease && newRelease.page_info[1].total_page) - 1
            : currentPage + 3}
        </button>
        <button
          disabled
          className="text-white px-2 py-1 max-[480px]:!px-1 max-[480px]:text-sm bg-gray-400 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out opacity-50 cursor-not-allowed"
        >
          ...
        </button>
        <button
          onClick={() =>
            handlePageClick(newRelease && newRelease.page_info[1].total_page)
          }
          className="text-white px-3 max-[480px]:!px-1 py-1 max-[480px]:text-sm bg-gray-800 hover:bg-gray-600 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
        >
          {newRelease && newRelease.page_info[1].total_page}
        </button>
        <button
          onClick={() => handlePageClick(newRelease.page_info[1].total_page)}
          className="text-white px-3 py-1 max-[480px]:!px-1 max-[480px]:text-sm bg-gray-800 hover:bg-gray-600 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
        >
          <FaAngleDoubleRight size={24} />
        </button>
      </div>
    </>
  );
};

export default LatestManga;
