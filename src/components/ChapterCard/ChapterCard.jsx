import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import axios from "axios";

const ChapterCard = ({
  chapter,
  title,
  poster,
  des,
  slug,
  chapterLink,
  chapterName,
  genre,
}) => {
  console.log("chapterssss: ", chapter);
  console.log("titlessss: ", title);
  console.log("postersss: ", poster);
  console.log("des: ", des);
  console.log("slug: ", slug);
  console.log("chapterLink: ", chapterLink);
  console.log("chapterName: ", chapterName);
  console.log("genre: ", genre);
  // console.log("check link", chapterLink);
  const sv = useSelector((state) => state.server.sv);
  const readmode = useSelector((state) => state.ReadMode.readmode);
  const user_id = sessionStorage.getItem("user_id");
  const chapterNumber = chapter?.replace(
    `http://apimanga.mangasocial.online/rmanga/${slug}/`,
    ""
  );

  const downloadPDF = async (e) => {
    const response = await axios.get(chapterLink);
    const Content = response.data;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(title, 10, 10);

    doc.setFontSize(12);
    const textLines = doc.splitTextToSize(Content.content_chapter, 180);
    doc.text(textLines, 10, 20);

    doc.save(`${title}_${chapterName}.pdf`);
    e.stopPropagation();
  };

  const chapterNumberReadMode = chapterLink;
  // console.log("chapter",chapterLink);
  const getChapterFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };
  const getChapterFromUrl2 = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };
  // console.log("check slug", chapterLink)

  const truncatedDes = des.length > 50 ? `${des.slice(0, 50)}...` : des;
  return (
    <>
      <NavLink
        to={`/${sv}/${genre === "manga" ? "chapter" : "novel"}/${slug}/${
          readmode
            ? getChapterFromUrl2(chapterNumberReadMode)
            : getChapterFromUrl2(chapterNumberReadMode)
        }`}
      >
        <div className="flex border-gray-300 border-b shallow-sm items-center w-full gap-4 my-3  cursor-pointer py-4 md:py-8 px-2 justify-between transition-all duration-200">
          {/* chapter info */}
          <div className="items-center text-xl truncate gap-4 md:gap-12 md:py-2 text-white font-semibold whitespace-nowrap w-full">
            {` ${chapterName} `}
          </div>
          <div className="items-start whitespace-nowrap  md:items-center font-semibold text-xl text-[#ff9f66] text-right w-full md:gap-0">
            <button
              className="hover:underline"
              onClick={(e) => {
                sv == 4 && downloadPDF(e);
              }}
            >
              {sv == 4 ? "Down Load PDF" : "Read"}
            </button>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default ChapterCard;
