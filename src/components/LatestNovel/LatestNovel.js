import React, { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import Loading from "../Loading/Loading";
import LatestCardNovel from "./LatestCardNovel";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import CardManga from "../cardManga";

const LatestNovel = () => {
  const [rangePagination, setRangePagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageForOtherButton, setCurrentPageForOtherButton] = useState(1);
  const [mangasPerPage] = useState(4);
  const [loading, setLoading] = useState(false);

  const [readMode, setReadMode] = useState(
    useSelector((state) => state.ReadMode.readmode)
  );
  const [listNovel, setListNovel] = useState();
  const sv = useSelector((state) => state.server.sv);
  const id_user = () => {
    if (sessionStorage.getItem("user_id") == null) {
      return 0;
    } else return sessionStorage.getItem("user_id");
  };

  // console.log("check detail", listNovel);
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
    if (pageNumber >= listNovel.page_info[1].total_page - 4) {
      setRangePagination(true);
      setCurrentPageForOtherButton(clickPageNumber);
      setCurrentPage(clickPageNumber);
      return "";
    }
    setRangePagination(false);
    setCurrentPage(clickPageNumber);
  };

  console.log("sssssssssssss", listNovel);

  // useEffect(() => {
  //   const getData = async () => {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `https://apimanga.mangasocial.online/4/novel/lastest_manga/${currentPage}`
  //     );
  //     setListNovel(response.data);
  //     console.log("pageeeee", response.data);

  //     setLoading(false);
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });

  //     return response.data;
  //   };
  //   getData();
  // }, [currentPage, sv]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://apimanga.mangasocial.online/4/novel/lastest_manga/${currentPage}`
        );
        setListNovel(response.data);
        console.log("pageeeee", response.data);

        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getData();
  }, [currentPage, sv]);

  return (
    // <></>
    <>
      <div className="grid grid-cols-2 max-[500px]:grid-cols-1 gap-4 mx-10">
        {loading ? (
          <div className="col-span-2 flex justify-center items-center">
            <Loading
              type={"spin"}
              color={"#FF9F66"}
              height={300}
              width={300}
              text="Loading..."
            />
          </div>
        ) : (
          listNovel &&
          listNovel.list_manga.map((item, index) => (
            <LatestCardNovel
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
          ))
        )}
      </div>
      <div className="flex mt-5 justify-center">
        <button
          onClick={() => handlePageClick(1)}
          className="text-white px-3 py-1 flex gap-0 bg-gray-800 hover:bg-gray-600 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
        >
          <FaAngleDoubleLeft size={24} />
        </button>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className="text-white px-3 py-1 flex gap-0 bg-gray-800 hover:bg-gray-600 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
        >
          <FaArrowLeft size={24} />
        </button>
        <button
          onClick={() =>
            handlePageClick(
              rangePagination
                ? (listNovel && listNovel.page_info[1].total_page) - 4
                : currentPage
            )
          }
          className={
            `text-white px-3 py-1  border border-gray-600 ${
              rangePagination == false
                ? "bg-gray-600"
                : `${
                    currentPage ==
                    (listNovel && listNovel.page_info[1].total_page) - 4
                      ? "bg-gray-600"
                      : "bg-gray-800"
                  }`
            } rounded-md transition-colors duration-200 ease-in-out ` +
            `${
              currentPage ==
              (listNovel && listNovel.page_info[1].total_page) - 4
                ? "bg-gray-600"
                : ""
            }`
          }
        >
          {rangePagination
            ? (listNovel && listNovel.page_info[1].total_page) - 4
            : currentPage}
        </button>

        <button
          onClick={() =>
            handlePageClick(
              rangePagination
                ? (listNovel && listNovel.page_info[1].total_page) - 3
                : currentPage + 1
            )
          }
          className={
            `${
              currentPage ==
              (listNovel && listNovel.page_info[1].total_page) - 3
                ? "bg-gray-600"
                : " bg-gray-800"
            }` +
            " text-white px-3 py-1  border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
          }
        >
          {rangePagination
            ? (listNovel && listNovel.page_info[1].total_page) - 3
            : currentPage + 1}
        </button>

        <button
          onClick={() =>
            handlePageClick(
              rangePagination
                ? (listNovel && listNovel.page_info[1].total_page) - 2
                : currentPage + 2
            )
          }
          className={
            `${
              currentPage ==
              (listNovel && listNovel.page_info[1].total_page) - 2
                ? "bg-gray-600"
                : " bg-gray-800"
            }` +
            " text-white px-3 py-1  border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
          }
        >
          {rangePagination
            ? (listNovel && listNovel.page_info[1].total_page) - 2
            : currentPage + 2}
        </button>

        <button
          onClick={() =>
            handlePageClick(
              rangePagination
                ? (listNovel && listNovel.page_info[1].total_page) - 1
                : currentPage + 3
            )
          }
          className={
            `${
              currentPage ==
              (listNovel && listNovel.page_info[1].total_page) - 1
                ? "bg-gray-600"
                : " bg-gray-800"
            }` +
            " text-white px-3 py-1  border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
          }
        >
          {rangePagination
            ? (listNovel && listNovel.page_info[1].total_page) - 1
            : currentPage + 3}
        </button>
        <button
          disabled
          className="text-white px-3 py-1 bg-gray-400 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out opacity-50 cursor-not-allowed"
        >
          ...
        </button>
        <button
          onClick={() =>
            handlePageClick(listNovel && listNovel.page_info[1].total_page)
          }
          className="text-white px-3 py-1 bg-gray-800 hover:bg-gray-600 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
        >
          {listNovel && listNovel.page_info[1].total_page}
        </button>
        <button
          onClick={() => handlePageClick(listNovel.page_info[1].total_page)}
          className="text-white px-3 py-1 bg-gray-800 hover:bg-gray-600 border border-gray-600 rounded-md transition-colors duration-200 ease-in-out"
        >
          <FaAngleDoubleRight size={24} />
        </button>
      </div>
    </>
  );
};

export default LatestNovel;
