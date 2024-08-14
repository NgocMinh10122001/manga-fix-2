import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import NewsComicCard from "./newsComicCard";
import { useSelector } from "react-redux";
import prodApis from "../api/home";

const NewsComics = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    getNews();
  }, []);
  const sv = useSelector((state) => state.server.sv);
  const getNews = async () => {
    try {
      const newsResponse = await prodApis.server(sv);
      console.log("check qq 1", newsResponse);

      setNews(newsResponse.data[7].data);
      // console.log("check qq", newsResponse.data[7]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid max-[768px]:grid-cols-3 md:grid-cols-5 2xl:grid-cols-7  gap-[20px] px-[60px] max-[435px]:px-4 max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
      {news?.map((item, index) => (
        <NewsComicCard
          key={index}
          index={index}
          poster={item.images_poster}
          time={item.time_news}
          title={item.title_news}
          url={item.url_news}
        />
      ))}
    </div>
  );
};

export default NewsComics;
