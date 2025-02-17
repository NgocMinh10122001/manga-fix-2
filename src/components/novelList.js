import React, { memo } from "react";
import useFetchNovel from "../hooks/useFetchNovel";
import Loading from "./Loading/Loading";
import { Spin } from "antd";
import NovelCard from "../pages/Novel/NovelCard";

const NovelList = memo(function NovelList({ index }) {
  const newRelease = useFetchNovel(index);
  console.log("newRelease: ", newRelease);
  const firstFiveItem = newRelease.slice(0, 10);
  // console.log("check path seg", firstFiveItem[0]);
  return (
    <>
      <div className="grid max-[768px]:grid-cols-3 md:grid-cols-6 2xl:grid-cols-7  gap-[20px] mx-[60px] max-[435px]:px-4 max-[435px]:gap-4 max-[435px]:pb-4 pb-[60px]">
        {firstFiveItem.map((item, index) => (
          <NovelCard
            key={index}
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

export default NovelList;
