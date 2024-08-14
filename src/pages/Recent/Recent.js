import React from "react";
import CardManga from "../../components/cardManga";
import useFetch from "../../hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";

const Page_Recent = () => {
  let sv = useSelector((state) => state.server.sv);
  const comicRecent = useFetch(sv);

  return (
    <div className="bg-black px-[60px] pb-[60px]">
      <div className="">
        <h2 className="text-[57px] leading-[64px] font-semibold text-[#FFFFFF] pt-[50px] pb-[60px]">
          Recent Comic
        </h2>
      </div>
      <div className="grid max-[768px]:grid-cols-4 max-[600px]:grid-cols-3 max-[962px]:grid-cols-6 max-[1126px]:grid-cols-7 min-[1126px]:grid-cols-8 2xl:grid-cols-10  mx-[60px]  gap-[20px] max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
        {comicRecent.map((item, index) => (
          <CardManga
            key={index}
            poster={item?.image_poster_link_goc}
            title={item?.title_manga}
            rate={item?.rate}
            update={item.time_release}
            path_segment={item?.path_segment_manga}
            chapterLink={item.url_chapter}
          />
        ))}
      </div>
    </div>
  );
};

export default Page_Recent;
