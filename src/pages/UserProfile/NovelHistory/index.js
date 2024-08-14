import React, { useState } from "react";
import filterNovel_Manga from "./filterData";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const NovelHistory = (data) => {
  const [selectedFilter, setSelectedFilter] = useState("1_week");
  const [customRange, setCustomRange] = useState({
    startDate: "",
    endDate: "",
  });
  const sv = useSelector((state) => state.server.sv);

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "1 Tuần", value: "1_week" },
    { label: "1 Tháng", value: "1_month" },
    { label: "3 Tháng", value: "3_months" },
    { label: "6 Tháng", value: "6_months" },
    { label: "1 Năm", value: "1_year" },
    { label: "Custom Range", value: "custom" },
  ];

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setCustomRange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filteredManga = filterNovel_Manga(data, selectedFilter, customRange);
  console.log("filtrnovel", filteredManga);

  return (
    <>
      {" "}
      <div className="bg-gray-800 text-black p-6 mb-5 rounded-lg shadow-md">
        {/* ------------------- FILTER DATA NOVEL ----------------------------*/}
        <div className="mb-4">
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {selectedFilter === "custom" && (
          <div className="mb-4 flex max max-[480px]:flex-col gap-4">
            <div className="flex ">
              <label
                className=" bg-white rounded-l border-r-0 flex justify-center items-center mr-0"
                for="startDate"
              >
                Start Date:
              </label>
              <input
                type="date"
                name="startDate"
                value={customRange.startDate}
                onChange={handleDateChange}
                className="p-2  border-r border-t border-b rounded-r  mx-0 "
              />
            </div>
            <div className="flex">
              <label
                className=" bg-white rounded-l border-r-0 flex justify-center items-center mr-0"
                for="startDate"
              >
                <span>End Date:</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={customRange.endDate}
                onChange={handleDateChange}
                className="p-2 mx-0 border-r border-t border-b rounded-r"
              />
            </div>
          </div>
        )}
        {/* ------------------- FILTER DATA NOVEL ----------------------------*/}
        <div className="max-[480px]:!text-2xl mb-5 text-5xl max-[738px]:text-[34px] text-white relative font-semibold">
          Recent Read Novel
        </div>

        <div className="h-[670px] mb-5 scroll-container overflow-y-auto overflow-x-hidden">
          {filteredManga.length > 0 &&
            filteredManga.map((novel) => {
              const titleChapter = novel.title_chapter.slice(0, 15) + "....";
              const chapterUrl = novel.link_chapter.endsWith("/")
                ? novel.link_chapter.slice(0, -1)
                : novel.link_chapter;
              const chapter =
                chapterUrl.split("/")[chapterUrl.split("/").length - 1];

              const slug =
                chapterUrl.split("/")[chapterUrl.split("/").length - 2];

              return (
                <NavLink
                  to={`/${sv}/chapter/${slug}`}
                  className="d-flex max-[480px]:flex-col justify-between gap-2 pt-4 p-2 text-white border-b border-gray-400"
                >
                  <div className="w-1/3 text-left text-lg truncate">
                    {novel.title_manga}
                  </div>
                  <NavLink
                    to={`/${sv}/novel/${slug}/${chapter}`}
                    className="w-1/3 text-center truncate text-lg "
                  >
                    <span className="text-yellow-400">{chapter}</span>__{" "}
                    {titleChapter}
                  </NavLink>
                  <div className="w-1/3 flex-shrink-0 text-right truncate text-lg text-gray-400">
                    {novel.readAt}
                  </div>
                </NavLink>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default NovelHistory;
