import React, { memo, useState, useRef, useEffect } from "react";
import useFetchNovel from "../../hooks/useFetchNovel";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import NovelCard from "../../pages/Novel/NovelCard";
import CardPopularNovelThisMonth from "./CardPopularNovelThisMonth";
import styles from "./PopularNovel.module.scss";

const PopularNovelThisMonth = memo(function PopularNovelThisMonth({ index }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  //   const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(2);
  const [isFetching, setIsFetching] = useState(false);
  const containerRef = useRef(null);

  const [readMode, setReadMode] = useState(
    useSelector((state) => state.ReadMode.readmode)
  );
  const sv = useSelector((state) => state.server.sv);

  // const fetchPages = async (page1, page2) => {
  //   setLoading(true);
  //   setIsFetching(true);

  //   try {
  //     if (currentPage <= totalPages) {
  //       const response1 = await axios.get(
  //         `https://apimanga.mangasocial.online/${sv}/novel/popular_manga/${page1}`
  //       );
  //       //   response1.data.list_manga.map((manga) =>
  //       //     setData((prevData) => [...prevData, manga])
  //       //   );
  //       setData((prevData) => [...prevData, ...response1.data.list_manga]);
  //       console.log(response1.data, "hhhhhhhhhhhhhhhhhhh");
  //       const totalPages = response1.data.page_info[1].total_page;
  //       setTotalPages(totalPages);
  //       if (page2 <= totalPages) {
  //         const response2 = await axios.get(
  //           `https://apimanga.mangasocial.online/${sv}/novel/popular_manga/${page1}`
  //         );
  //         setData((prevData) => [...prevData, ...response2.data.list_manga]);
  //       }

  //       // setTotalPages(response1.data.page_info[1].total_page);
  //     }

  //     setLoading(false);
  //   } catch (error) {
  //     console.log("error fetching data", error);
  //   }
  //   setCurrentPage((prev) => prev + 2);
  //   setIsFetching(false);
  // };

  // const handleScroll = () => {
  //   const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
  //   if (scrollLeft + clientWidth >= scrollWidth - 5 && !isFetching) {
  //     if (currentPage == totalPages) {
  //       fetchPages(currentPage, currentPage + 1);
  //     } else {
  //       fetchPages(currentPage, currentPage + 1);
  //     }
  //   }
  //   if (scrollWidth <= clientWidth) {
  //     if (!isFetching) {
  //       fetchPages(currentPage, currentPage + 1);
  //     }
  //   }
  // };

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      setIsFetching(true);

      try {
        const response1 = await axios.get(
          `https://apimanga.mangasocial.online/4/novel/new_release_comics`
        );
        //   response1.data.list_manga.map((manga) =>
        //     setData((prevData) => [...prevData, manga])
        //   );
        setData(response1.data[9].data);
        console.log(response1.data[9].data, "hhhhhhhhhhhhhhhhhhh");

        setLoading(false);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchPages();
  }, [sv]);

  return (
    <>
      <div
        ref={containerRef}
        // onScroll={handleScroll}
        className={` ${styles["scroll-container"]} overflow-x-scroll w-[100%] px-2 gap-4 text-white whitespace-nowrap`}
      >
        {data.length > 0 &&
          data.map((item, index) => (
            <CardPopularNovelThisMonth
              key={index}
              // poster={item?.poster_novel}
              // title={item?.title_novel}
              // chapterLink={item?.link_server_chapter}
              // path_segment={item?.link_server_novel.replace(
              //   "https://apimanga.mangasocial.online/web/rnovel/",
              //   ""
              // )}
              poster={item?.image_poster_link_goc}
              title={item?.title_manga}
              rate={item?.rate}
              update={item.time_release}
              chapter={item?.chapter_new}
              path_segment={item?.path_segment_manga}
            />
          ))}
      </div>
    </>
  );
});

export default PopularNovelThisMonth;
