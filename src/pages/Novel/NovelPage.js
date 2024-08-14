import React, { useEffect, useState } from "react";
import "./ChapterPage.scss";
import ChapterCard from "../../components/ChapterCard/ChapterCard";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Comments from "../../components/comments";
import CMT from "../../components/cmt";
import { Buffer } from "buffer";
import Cookies from "js-cookie";
import CMT_list from "./../../components/cmt_list";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Audio from "./../../components/audioPlayer/audioPlayer";
import TextToSpeech from "../../components/textToSpeech";
import TTS from "../../components/TextToSpeech/TTS";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const NovelPage = () => {
  const [showTab, setShowTab] = useState(true);
  const [chapterDetail, setChapterDetail] = useState([]);
  const [chapterData, setChapterData] = useState("");
  // console.log("check chapter", chapterData);
  const [subTitle, setSubTitle] = useState("");
  const [listChap, setListChap] = useState("");
  const [visibleChapterCount, setVisibleChapterCount] = useState(12);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [comment, setComment] = useState("");
  const params = useParams();
  const { slug, chapter } = params;
  const sv = useSelector((state) => state.server.sv);
  const user_id = sessionStorage.getItem("user_id");
  const [currentChap, setCurrentChap] = useState("");
  const navigate = useNavigate();
  console.log("chapterDataaaaaaaaaa", chapterData);
  console.log("chapterDetaillllllll", chapterDetail);
  console.log("subTitleeeeeeeee", subTitle);

  const readmode = useSelector((state) => state.ReadMode.readmode);

  const getChapterFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };
  const getChapterFromUrl2 = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };
  const handleChapter = (e) => {
    if (readmode) {
      let selectChapter = document.getElementById("chapterList");
      let selectedChapter =
        selectChapter.options[selectChapter.selectedIndex].value;
      console.log(selectedChapter);
      // setChooseChapter(e.target.value);
      const linkChapter = getChapterFromUrl2(selectedChapter);
      navigate(`/${sv}/novel/${slug}/${linkChapter}`);
      fetchChapterContent(selectedChapter);
    } else {
      let selectChapter = document.getElementById("chapterList");
      let selectedChapter =
        selectChapter.options[selectChapter.selectedIndex].value;
      console.log("check cc", selectedChapter);
      // setChooseChapter(e.target.value);
      const linkChapter = getChapterFromUrl(selectedChapter);

      navigate(`/${sv}/novel/${slug}/${linkChapter}`);
      fetchChapterContent(selectedChapter);
    }
  };

  const nextChap = () => {
    let indexOfCurrentChap = listChap.indexOf(currentChap);
    if (indexOfCurrentChap == listChap.length - 1) {
      alert("Last Chapter!");
    } else {
      if (readmode) {
        let selectChapter = document.getElementById("chapterList");
        let selectedChapter =
          selectChapter.options[indexOfCurrentChap + 1].value;
        const linkChapter = getChapterFromUrl2(selectedChapter);
        navigate(`/${sv}/novel/${slug}/${linkChapter}`);
        fetchChapterContent(
          Object.values(chapterDetail.chapters || "")[indexOfCurrentChap + 1]
        );
        setCurrentChap(
          Object.values(chapterDetail.chapters || "")[indexOfCurrentChap + 1]
        );
      } else {
        let selectChapter = document.getElementById("chapterList");
        let selectedChapter =
          selectChapter.options[indexOfCurrentChap + 1].value;
        const linkChapter = getChapterFromUrl(selectedChapter);
        navigate(`/${sv}/novel/${slug}/${linkChapter}`);
        fetchChapterContent(chapterDetail[0].chapters[indexOfCurrentChap + 1]);
        setCurrentChap(chapterDetail[0].chapters[indexOfCurrentChap + 1]);
      }
    }
  };

  const prevChap = () => {
    let indexOfCurrentChap = listChap.indexOf(currentChap);
    console.log(indexOfCurrentChap);
    if (indexOfCurrentChap == 0) {
      alert("Cannot!");
    } else {
      if (readmode) {
        let selectChapter = document.getElementById("chapterList");
        let selectedChapter =
          selectChapter.options[indexOfCurrentChap - 1].value;
        const linkChapter = getChapterFromUrl2(selectedChapter);
        navigate(`/${sv}/novel/${slug}/${linkChapter}`);
        fetchChapterContent(
          Object.values(chapterDetail.chapters || "")[indexOfCurrentChap - 1]
        );
        setCurrentChap(
          Object.values(chapterDetail.chapters || "")[indexOfCurrentChap - 1]
        );
      } else {
        let selectChapter = document.getElementById("chapterList");
        let selectedChapter =
          selectChapter.options[indexOfCurrentChap - 1].value;
        const linkChapter = getChapterFromUrl(selectedChapter);
        navigate(`/${sv}/novel/${slug}/${linkChapter}`);
        fetchChapterContent(chapterDetail[0].chapters[indexOfCurrentChap - 1]);
        setCurrentChap(chapterDetail[0].chapters[indexOfCurrentChap - 1]);
      }
    }
  };

  const fetchChapterContent = async (link_novel) => {
    // console.log("check link", link_novel);
    const res = await axios.get(link_novel);
    setChapterData(res.data);
    let content = res.data.content || res.data.content_chapter;
    let first = content.indexOf("Chapter" || "");
    let last = content.indexOf("Chapter" || "", first + 1);
    setSubTitle(content.substring(first + 10, last));
  };

  const handleShowTab = () => {
    setShowTab(!showTab);
  };
  const commentOnchange = (e) => {
    setComment(e.target.value);
  };
  const handleSendComment = async () => {
    try {
      const res = await axios.post(
        `https://apimanga.mangasocial.online/cmanga/${slug}/${user_id}/`,
        { content: comment }
      );
      console.log("response:", res);
      console.log("comment:", comment);
    } catch (error) {
      console.log(error);
      console.log("comment:", comment);
      console.log(slug);
    }
  };
  const fetchChapterDetail = async () => {
    try {
      if (readmode) {
        const response = await axios.get(
          `https://apimanga.mangasocial.online/web/rnovel/${sv}/${slug}/`
        );
        console.log("check res", response.data.chapters);
        setChapterDetail(response.data);
        setListChap(Object.values(response.data.chapters));
        // fetchChapterContent(response.data[0].chapters[0]);
        console.log("chapter detail:", response.data);
      } else {
        console.log(":checkad");
        const response = await axios.get(
          `https://apimanga.mangasocial.online/rnovel/${slug}`
        );
        console.log("check res", response.data[0].chapters);
        setChapterDetail(response.data);
        setListChap(response.data[0].chapters);
        // fetchChapterContent(response.data[0].chapters[0]);
        console.log("chapter detail:", response.data);
      }
    } catch (error) {
      console.log(error);
      console.log("slug:", slug);
    }
  };

  const saveHistory = async (userId, path_segment, chapter_segment) => {
    const requestBody = {
      path_segment_manga: path_segment,
      path_segment_chapter: chapter_segment,
      type: "novel",
    };
    try {
      const response = await axios.post(
        `https://apimanga.mangasocial.online/log_user/${userId}`,
        requestBody
      );
      console.log("History saved:", response.data);
    } catch (error) {
      console.log("error save", error);
    }
  };

  useEffect(() => {
    if (readmode) {
      fetchChapterDetail();
      fetchChapterContent(
        `https://apimanga.mangasocial.online/web/rnovel/${sv}/${slug}/${chapter}`
      );
      setCurrentChap(
        `https://apimanga.mangasocial.online/web/rnovel/${sv}/${slug}/${chapter}/`
      );
    } else {
      fetchChapterDetail();
      fetchChapterContent(
        `https://apimanga.mangasocial.online/rnovel/${slug}/${chapter}`
      );
      setCurrentChap(
        `https://apimanga.mangasocial.online/rnovel/${slug}/${chapter}`
      );
    }
  }, [chapter]);

  useEffect(() => {
    saveHistory(user_id, slug, chapter);
  }, [slug, chapter]);

  const handleSeeMore = () => {
    setVisibleChapterCount((prevCount) => prevCount + 10);
  };

  // const sortedChapters = chapterDetail[0]?.chapters.sort((a, b) => {
  //   // Lấy 3 số sau ký tự "chapter-"
  //   const getLastNumber = (url) =>
  //     parseInt(
  //       url.slice(url.indexOf("chapter-") + 8, url.indexOf("chapter-") + 11),
  //       10
  //     );

  //   const chapterNumberA = getLastNumber(a);

  //   const chapterNumberB = getLastNumber(b);

  //   return chapterNumberA - chapterNumberB;
  // });

  const viewsString = chapterDetail[0]?.views || "";
  const startIndex = viewsString.lastIndexOf("has ") + 4;
  const viewsPart = viewsString.substring(startIndex);
  const truncatedDescription =
    chapterDetail[0]?.description?.slice(0, 180) + "... ";
  const fullDescription = chapterDetail[0]?.description;

  let listServer = [
    { src: "/images/ChapterPage/GB.png", title: "GB" },
    { src: "/images/ChapterPage/ES.png", title: "ES" },
    { src: "/images/ChapterPage/FR.png", title: "FR" },
    { src: "/images/ChapterPage/HU.png", title: "HU" },
    { src: "/images/ChapterPage/DK.png", title: "DK" },
    { src: "/images/ChapterPage/IT.png", title: "IT" },
    { src: "/images/ChapterPage/SA.png", title: "SA" },
  ];

  return (
    <div className="w-full bg-black" style={{ zoom: 0.9 }}>
      {/*----------------- info chapter ----------------*/}
      <div className=" mx-20 max-[480px]:mx-2 text-left w-100vh flex max-[768px]:flex-row max-[480px]:flex-col gap-1 p-4  px-4  bg-black">
        <div className=" ps-3 pb-5">
          <div className="relative max-[480px]:w-full">
            <img
              src={chapterDetail[0]?.poster || chapterDetail.poster}
              alt=""
              className=" w-100% min-w-[430px] h-auto sm:w-[100vw] md:h-[649px] md:w-[433px] max-[1250px]:min-w-[320px] max-[739px]:min-w-[270px] bg-cover object-cover bg-center rounded-[8px]"
            />
            {chapterDetail?.r18 ? (
              <div className="absolute top-0 right-5  hidden md:block ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="118"
                  height="118"
                  viewBox="0 0 118 118"
                  fill="none"
                >
                  <path
                    d="M0 0H118V59C118 91.5848 91.5848 118 59 118C26.4152 118 0 91.5848 0 59V0Z"
                    fill="#1E1E1E"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="118"
                    height="118"
                    viewBox="0 0 118 118"
                    fill="none"
                  >
                    <path
                      d="M0 0H118V59C118 91.5848 91.5848 118 59 118C26.4152 118 0 91.5848 0 27.8K like59V0Z"
                      fill="#1E1E1E"
                    />
                    <text
                      x="10%"
                      y="50%"
                      fontSize="57px"
                      fontWeight="bold"
                      fill="white"
                      tex="middle"
                      dominantBaseline="middle"
                    ></text>
                  </svg>
                </svg>
              </div>
            ) : null}
            <div className="absolute top-0 left-0 hidden md:block ">
              <div className="relative ">
                <img
                  src="/images/ChapterPage/Star 1.png"
                  alt=""
                  className="h-[144px] w-[144px]"
                />
                <div className="h-[64px] w-[125px] text-white font-semibold text-[24px] leading-[32px] absolute top-[30px] left-[10px]  text-center">
                  New Chapter
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* cột  ------------------------2 */}
        <div className=" ml-4 text-white">
          {/* ------------------title------------ */}
          <div className="flex flex-col gap-[8px] md:gap-[21px]">
            {/* name && tương tác */}
            <div className="flex flex-col gap-[8px] md:gap-[21px]">
              <div className="font-semibold text-[14px] md:text-3xl md:leading-[2] text-white">
                {chapterDetail[0]?.title || chapterDetail.title_novel}
              </div>
              {/* tương tác */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 font-medium text-[11px] leading-[16px]  md:font-semibold md:text-[22px] md:leading-[28px] text-white">
                  <img
                    src="/images/ChapterPage/carbon_view-filled.png"
                    alt=""
                    className="h-[32px] w-[32px] hidden md:block "
                  />
                  <div>{`${viewsString} views`}</div>
                </div>
                <div className="flex items-center gap-2 font-medium text-[11px] leading-[16px] md:font-semibold md:text-[22px] md:leading-[28px] text-white ">
                  <img
                    src="/images/ChapterPage/mdi_like.png"
                    alt=""
                    className="h-[32px] w-[32px] hidden md:block"
                  />
                  <div>27.8K like</div>
                </div>
                <div className="flex items-center gap-2 font-medium text-[11px] leading-[16px] md:font-semibold md:text-[22px] md:leading-[28px] text-white ">
                  <img
                    src="/images/ChapterPage/jam_files-f.png"
                    alt=""
                    className="h-[32px] w-[32px] hidden md:block"
                  />
                  <div>
                    {`${
                      chapterDetail[0]?.chapters.length ||
                      Object.keys(chapterDetail.chapters || "").length
                    } chapter `}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[40px]">
            {/* button */}
            <div className="flex gap-4 mt-5">
              <button className="  hover:text-white p-[8px]  rounded-[12px] md:px-[52px] md:py-[26px]  bg-[#FF2020]  text-white md:rounded-[67px] ">
                <div className="font-bold whitespace-nowrap text-[12px] leading-[16px] md:text-[36px] md:leading-[44px]">
                  Read now
                </div>
              </button>
              <button className=" p-[8px] rounded-[12px] text-black md:px-[52px] md:py-[26px]  bg-[#496EF1]  md:text-white md:rounded-[67px]">
                <div className="font-bold text-[12px] whitespace-nowrap leading-[16px] md:text-[36px] md:leading-[44px] flex gap-1 md:gap-3">
                  <div> My List </div>
                  <img
                    src="/images/ChapterPage/uil_plus.png"
                    alt=""
                    className="h-[20px] w-[20px] md:h-[48px] md:w-[48px] bg-cover object-cover "
                  />
                </div>
              </button>

              <button className=" p-[8px]  rounded-[12px] md:px-[2rem] md:py-[1rem] bg-[#F45F17]  text-white md:rounded-[67px]">
                <div className="font-bold text-[12px] leading-[16px] md:text-[36px] md:leading-[44px] flex gap-1 md:gap-3 ">
                  <div>{chapterDetail[0]?.rate}</div>
                  <img
                    src="/images/ChapterPage/Star 3.png"
                    className="h-[20px] w-[20px] md:h-[48px] md:w-[48px] bg-cover object-cover"
                    alt=""
                  />
                </div>
              </button>
            </div>
            {/* chọn server */}
            <div className="flex flex-col gap-[10px]">
              <div className=" font-bold text-[12px] leading-[16px]  md:text-[28px] md:leading-[36px] text-white ">
                Server
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {listServer.map((item, index) => (
                  <img
                    key={index}
                    src={item?.src}
                    alt={item?.title}
                    title={item?.title}
                    className="w-[32px] h-[23px]  md:h-[48px]  md:w-[67px] cursor-pointer hover:opacity-80"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[8px] md:gap-[40px]">
              {/* info chapter */}
              <div className="flex flex-col gap-[8px] md:gap-[16px]">
                <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex items-center gap-2">
                  Author:
                  <div className="text-white">
                    {chapterDetail[0]?.author || chapterDetail?.author}
                  </div>
                </div>
                <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex items-center gap-2">
                  Artist:
                  <div className="text-white">Some Name</div>
                </div>
                <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex flex-wrap items-center gap-2">
                  Genres:
                  <div className="text-white">
                    {chapterDetail[0]?.categories || chapterDetail?.catergories}
                  </div>
                </div>
                <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex items-center gap-2">
                  Age:
                  <div className="text-white">18+</div>
                </div>
                {/* desc */}
                <div className="">
                  <p className="w-auto h-auto text-[11px] font-medium leading-[16px]  md:w-[1000px] md:font-normal md:text-[24px] md:leading-[36px] text-white">
                    {showFullDescription
                      ? fullDescription
                      : truncatedDescription}
                    {!showFullDescription && (
                      <button onClick={() => setShowFullDescription(true)}>
                        <div className=" underline  underline-offset-4">
                          See All
                        </div>
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[12px] flex items-center justify-center gap-[47px] md:gap-[87px] bg-[#3C3B38]">
        <div
          className={` ${showTab ? "tabbtn" : " none-tab "} `}
          onClick={handleShowTab}
        >
          Chapter
        </div>
        <div
          className={` ${!showTab ? "tabbtn" : " none-tab "} `}
          onClick={handleShowTab}
        >
          Comment
        </div>
      </div>
      <div className="bg-black">
        {showTab && (
          <div className="bg-black mx-4 md:mx-36 ">
            <div className="flex flex-col justify-center items-center pt-8">
              <h1 className="text-3xl md:text-6xl text-white">
                {chapterDetail[0]?.title}
              </h1>
              <h3 className="text-xl md:text-3xl text-gray-400 pt-4">
                <span>{subTitle}</span>
              </h3>
            </div>
            <div className="flex gap-3 justify-center flex-wrap pt-10">
              <button
                className="bg-[#138e00] h-10 px-4 flex items-center text-lg rounded-lg text-white"
                onClick={prevChap}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>{" "}
                Previous Chapter
              </button>

              <select
                name="chapterList"
                id="chapterList"
                className="bg-[#138e00] w-[200px] rounded-lg text-white"
                value={currentChap}
                onChange={() => handleChapter()}
              >
                {chapterDetail[0] ? (
                  <>
                    {chapterDetail[0]?.chapters?.map((item, index) => (
                      <option value={item} key={index + 1}>
                        {/* {item.replace(
                      "http://apimanga.mangasocial.online/rnovel/" + slug + "/",
                      ""
                    )} */}
                        {`Chapter_${index + 1}`}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    {Object.values(chapterDetail?.chapters || "").map(
                      (item, index) => (
                        <>
                          {/* {console.log("check cc2", item)} */}
                          <option value={item} key={index + 1}>
                            {/* {item.replace(
                      "http://apimanga.mangasocial.online/rnovel/" + slug + "/",
                      ""
                    )} */}
                            {`${
                              Object.keys(chapterDetail?.chapters || "")[index]
                            }`}
                          </option>
                        </>
                      )
                    )}
                  </>
                )}
              </select>

              <button
                className="bg-[#138e00] h-10 px-4 flex items-center text-lg rounded-lg text-white"
                onClick={nextChap}
              >
                {" "}
                Next Chapter
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>{" "}
              </button>
            </div>
            <div className="w-full md:w-[70%] pt-8 mx-auto">
              <TTS
                content={chapterData?.content || chapterData?.content_chapter}
              />{" "}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center bg-black h-[1000vh]">
        {!showTab && (
          <div className="flex flex-col">
            <CMT_list cmt_arr={chapterDetail[0].comments} />
            {/* logined user comment */}
            {sessionStorage.getItem("user_email") ? (
              <div>
                <div className="antialiased mx-auto max-w-screen-sm scale-150 mt-24 w-[1000px]">
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <img
                          className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                          src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 border rounded-lg px-4 py-2 leading-relaxed">
                        <div className="flex items-center">
                          <strong className="text-white flex items-center">
                            {sessionStorage.getItem("user_email")}
                          </strong>{" "}
                        </div>
                        <div className="flex flex-row gap-6">
                          <input
                            className="text-lg text-white bg-slate-500 h-24 w-full rounded-lg my-2"
                            onChange={(e) => commentOnchange(e)}
                          ></input>
                          <button
                            className="bg-slate-500 rounded-lg m-2 w-[20%] text-white font-semibold"
                            onClick={() => handleSendComment()}
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-auto">
                <h1 className="text-4xl text-white mt-6">
                  Please{" "}
                  <Link to="/login">
                    <span className="text-[#F45F17] cursor-pointer">login</span>
                  </Link>{" "}
                  to comment!
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NovelPage;
