import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardNovel from "../../components/cardNovel";
import CardManga from "../../components/cardManga";
import NovelCard from "../Novel/NovelCard";
import NovelCard2 from "../Novel/NovelCard2";

const MangaCategory = () => {
  const [manga, setManga] = useState([]);
  const params = useParams();
  const { category } = params;
  console.log(manga);

  const getManga = async () => {
    const resposne = await axios.get(
      `https://apimanga.mangasocial.online/manga-categories/${category}`
    );
    setManga(resposne.data);
  };

  useEffect(() => {
    getManga();
  }, []);
    const extractNovelId = (url) => {
    const parts = url.split('/');
    return parts.find(part => part.startsWith('novel_'));
  };
  const getChapterFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };
  const getChapterFromUrl2 = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
   };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="bg-black w-full px-[60px] pb-[60px]">
      <div className="max-[480px]:px-4 ">
        <h2 className="max-[480px]:!text-2xl mb-5 pt-4 text-5xl max-[738px]:text-[34px]  max-[480px]:relative text-white font-semibold">
          {capitalizeFirstLetter(category)}
        </h2>
      </div>
      <div className="grid max-[768px]:grid-cols-3 md:grid-cols-5 2xl:grid-cols-7  gap-[20px] px-[60px] max-[435px]:px-4 max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
        {manga.slice(0, 20).map((item, index) => (
          <NovelCard2
            key={index}
            poster={item?.poster}
            title={item?.title}
            rate={item?.rate}
            update={item.time_release}
            chapter={getChapterFromUrl(item?.chaper_new || "/")}
            path_segment={
              item?.id_manga.includes(".html")
                ? getChapterFromUrl(item?.id_manga.replace(".html", ""))
                : getChapterFromUrl(item?.id_manga || "/")
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MangaCategory;
