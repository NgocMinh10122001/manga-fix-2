import { useState, useContext, useRef } from "react";
import {
  div,
  Link,
  NavLink,
  Outlet,
  useParams,
  useHistory,
} from "react-router-dom";
import SubMenu from "../components/SubMenu/SubMenu";
import Dropdown from "../components/Dropdown/Dropdown";
import platform from "platform";
import ios from "../pages/img/ios.png";
import adroi from "../pages/img/adroi.png";
import { CiSearch } from "react-icons/ci";
import { useEffect } from "react";
import axios from "axios";
import "../assets/scss/_dropdown.scss";
import { SviContext } from ".";
import { changeServer } from "../Redux/Feature/serverSlice";
import { setIsLoading } from "../Redux/Feature/serverSlice";
import { useDispatch, useSelector } from "react-redux";
import Handle_function from "../handle_account/handle";
// import { IoLogoAndroid } from "react-icons/io";
import { LiaFlagUsaSolid } from "react-icons/lia";
import JP from "country-flag-icons/react/3x2/JP";
import US from "country-flag-icons/react/3x2/US";
import VN from "country-flag-icons/react/3x2/VN";
import AC from "country-flag-icons/react/3x2/AC";
import IC from "country-flag-icons/react/3x2/IC";
import EU from "country-flag-icons/react/3x2/EU";
import XK from "country-flag-icons/react/3x2/XK";
import RU from "country-flag-icons/react/3x2/RU";
import FR from "country-flag-icons/react/3x2/FR";
import { useNavigate } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiSettingsFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa6";
import { FaGoogleDrive } from "react-icons/fa";
import styles from "./layout.module.scss";

let path = "";
let arr_id_manga = [""];
let arr_url = [""];
let arr_path = [""];
export default function Layout() {
  const [isHovered, setIsHovered] = useState(false);
  const [isServerHovered, setIsServerHovered] = useState(false);
  const [link, setLink] = useState("");
  const [slugState, setSlugState] = useState();

  //handle search
  const [input, setInput] = useState("");

  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [idMangaList, setIdMangaList] = useState("0");
  const [open, setOpen] = useState(false);
  const [checkSearch, setCheckSearch] = useState(false);
  const [isOpenMenuSearch, setIsOpenMenuSearch] = useState(false);
  const [isOpenMenuServerForComputer, setIsOpenMenuServerForComputer] =
    useState(false);
  const [isOpenMenuServerForPhone, setIsOpenMenuServerForPhone] =
    useState(false);
  const { slug } = useParams();

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1150);

  const menuSearch = useRef(null);
  const submenuRef = useRef(null);
  const menuServerForComputer = useRef(null);
  const menuServerForPhone = useRef(null);

  const sv = useSelector((state) => state.server.sv);
  const loading = useSelector((state) => state.server.loading);
  const navigate = useNavigate();

  //  14    "https://br.ninemanga.com",
  //                                 13    "https://de.ninemanga.com",
  //                                 16    "https://es.ninemanga.com",
  //                                 17    "https://fr.ninemanga.com",
  //                                 18    "https://it.ninemanga.com",
  //                                  5    "https://mangajar.com/manga",
  //                                  8    "https://mangajar.com",
  //                             *    6    "https://mangakomi.io/",
  //                             *    2    "https://mangareader.cc",
  //                                  7    "https://readm.org/",
  //                                  1    "https://ww5.manganelo.tv",
  //                                  0    "https://www.mangainn.net",
  const serverName = [
    // {
    //   sv: 0,
    //   name: "mangainn.net",
    //   icon: (
    //     <US
    //       title="Vietnamese"
    //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5 "
    //     />
    //   ),
    // },
    {
      sv: 1,
      name: "ww5.manganelo.tv",
      icon: (
        <JP
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    // {
    //   sv: 2,
    //   name: "mangareader.cc",
    //   icon: (
    //     <JP
    //       title="Vietnamese"
    //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
    //     />
    //   ),
    // },
    {
      sv: 3,
      name: "ninemanga.com",
      icon: (
        <JP
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    {
      sv: 4,
      name: "bestlightnovel.com",
      icon: (
        <XK
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    {
      sv: 5,
      name: "mangajar.com/manga",
      icon: (
        <EU
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    // {
    //   sv: 6,
    //   name: "mangakomi.io",
    //   icon: (
    //     <US
    //       title="Vietnamese"
    //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
    //     />
    //   ),
    // },
    {
      sv: 7,
      name: "readm.org",
      icon: (
        <EU
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    // {
    //   sv: 8,
    //   name: "mangajar.com",
    //   icon: <XK title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5" />,
    // },
    {
      sv: 9,
      name: "swatmanga.com",
      icon: (
        <EU
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    {
      sv: 10,
      name: "mangajar.com",
      icon: (
        <JP
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    // {
    //   sv: 11,
    //   name: "novelhall.com",
    //   icon: (
    //     <JP
    //       title="Vietnamese"
    //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
    //     />
    //   ),
    // },
    // {
    //   sv: 12,
    //   name: "mto.com",
    //   icon: (
    //     <JP
    //       title="Vietnamese"
    //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
    //     />
    //   ),
    // },
    {
      sv: 13,
      name: "de.ninemanga.com",
      icon: (
        <JP
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    {
      sv: 14,
      name: "br.ninemanga.com",
      icon: (
        <JP
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    {
      sv: 15,
      name: "ru.ninemanga.com",
      icon: (
        <RU
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    {
      sv: 16,
      name: "es.ninemanga.com",
      icon: (
        <JP
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    {
      sv: 17,
      name: "fr.ninemanga.com",
      icon: (
        <FR
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    {
      sv: 18,
      name: "it.ninemanga.com",
      icon: (
        <US
          title="Vietnamese"
          className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
        />
      ),
    },
    // {
    //   sv: 19,
    //   name: "azoranov.com/series/",
    //   icon: (
    //     <US
    //       title="Vietnamese"
    //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
    //     />
    //   ),
    // },
  ];

  const dispatch = useDispatch();
  function test() {
    console.log("sv:", sv);
  }
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInput((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleClickOutSideMenuSearch = (event) => {
    if (menuSearch.current && !menuSearch.current.contains(event.target)) {
      setIsOpenMenuSearch(false);
    }
  };

  const handleClickOutSideMenuServerForComputer = (event) => {
    if (
      menuServerForComputer.current &&
      !menuServerForComputer.current.contains(event.target)
    ) {
      setIsOpenMenuServerForComputer(false);
    }
  };

  const handleClickOutSideMenuServerForPhone = (event) => {
    if (
      menuServerForPhone.current &&
      !menuServerForPhone.current.contains(event.target)
    ) {
      setIsOpenMenuServerForPhone(false);
    }
  };

  const handleClickOutside = (event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutSideMenuSearch);
    document.addEventListener(
      "mousedown",
      handleClickOutSideMenuServerForComputer
    );
    document.addEventListener(
      "mousedown",
      handleClickOutSideMenuServerForPhone
    );
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutSideMenuSearch);
      document.removeEventListener(
        "mousedown",
        handleClickOutSideMenuServerForComputer
      );
      document.addEventListener(
        "mousedown",
        handleClickOutSideMenuServerForPhone
      );
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1150);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   if (sv != 4) {
  //     navigate("/" + sv);
  //   } else {
  //     navigate("/" + sv + "/novel");
  //   }
  // }, []);
  const fetchData = (value) => {
    fetch("https://apimanga.mangasocial.online/")
      .then((response) => response.json())
      .then((res) => {
        console.log(res[1].data);
        // const results = data.filter((data) => {
        //     return data && data.title_manga && data.title_manga.toLowerCase().includes(value)
        // })
        // console.log(results)
      });
  };
  const fetchServer = async () => {
    try {
      const response = await axios.get(
        "https://apimanga.mangasocial.online/all-server"
      );
      console.log("Response: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "https://apimanga.mangasocial.online/search-manga-by-name-in-sever/" +
          sv,
        input
      );
      setSearchData(response.data);
      console.log(response.data);
      if (response.status == 200) {
        setCheckSearch(true);
      }

      let a = response.data[0].id_manga;
      let url = a.lastIndexOf("/");
      path = a.slice(url + 1, 1000);
      setSearch(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  for (let i = 0; i < searchData?.length; i++) {
    let url = searchData[i].id_manga;
    console.log("day la url: " + url);
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    while (url.endsWith(".html")) {
      url = url.slice(0, -5);
    }
    arr_id_manga[i] = url;
    arr_url[i] = arr_id_manga[i].lastIndexOf("/");
    arr_path[i] = arr_id_manga[i].slice(arr_url[i] + 1, 1000);
  }
  // console.log(arr_path);
  // console.log(path);
  const handleCloseSearch = () => {
    setCheckSearch(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleServerMouseEnter = () => {
    setIsServerHovered(true);
  };

  const handleServerMouseLeave = () => {
    setIsServerHovered(false);
  };

  let getSessionData = () => {
    return sessionStorage.getItem("user_email");
    // return Handle_function.isAuthen
  };

  const handleNavigate = (index) => {
    if (index === 4 || index === 11) {
      navigate(`/${index}/novel`);
    } else {
      navigate(`/${index}`);
    }
  };

  let isLogin = getSessionData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const os = platform.os.family;

    if (os === "iOS") {
      setModalContent(ios);
      setIsModalOpen(true);
      setLink(
        "https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720"
      );
    } else if (os === "Android") {
      console.log("androi");
      setModalContent(adroi);
      setIsModalOpen(true);
      setLink(
        "https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove"
      );
    } else {
      console.log("Đây là laptop");
    }
  }, []);
  useEffect(() => {
    dispatch(setIsLoading(true));
  }, []);
  ////////////////////////////
  // useEffect(() => {
  //   // Thực hiện reload trang khi slug thay đổi
  //   // navigate(window.location.pathname, { replace: true });
  //   setReload(!reload);
  // }, [slug]);
  /////////////////////////////////////

  // const toggleMenu = () => {
  //   const show = !showMenu;
  //   setShowMenu(show);
  //   console.log(showMenu);
  // };
  const handleNavigateClickLogo = () => {
    if (sv != 4) {
      navigate(`/` + sv);
    } else {
      navigate(`/` + sv + "/novel");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function changeSV(index) {
    dispatch(changeServer(index));
    this.forceUpdate();
  }

  return (
    <>
      <div className="flex px-3 items-center justify-between py-4 bg-gray-800  max-[480px]:hidden ">
        <div className="flex items-center space-x-2 group-hover:text-red-700 ">
          <div
            onClick={() => handleNavigateClickLogo()}
            className="title inline-flex justify-start items-center text-white space-x-2 cursor-pointer"
          >
            <img
              className="img-manga max-[725px]:!hidden"
              src="/images/logo-thinkdiff.png"
              alt=""
            ></img>
            <h3 className="">MangaSocial</h3>
          </div>
          {isLargeScreen ? "" : <Dropdown />}
        </div>

        {isLargeScreen && (
          <div
            className={`hidden md:flex cursor-pointer space-x-8 text-xl font-semibold text-white `}
          >
            <div
              className="cursor-pointer"
              onClick={() => navigate("/" + sv + "/genres")}
            >
              <p>Genres</p>
            </div>

            {/* <div
            className="server"
            onMouseEnter={handleServerMouseEnter}
            onMouseLeave={handleServerMouseLeave}
          >
            <p>Server</p>
            <img
              className="arrow-img"
              src={
                isServerHovered
                  ? "/images/Polygon cam.svg"
                  : "/images/Polygon 1.svg"
              }
              alt="Arrow"
            />
          </div> */}

            {/* SERVER LIST       index    link
          --------------------------NOVEL------------------------------------
                                        "https://www.ninemanga.com",
                                        "https://mangajar.com/",
                                  11    "https://www.novelhall.com"
                                        "https://azoranov.com/series/",         
                                   4    "https://bestlightnovel.com/",
                                  12    "https://mto.to/",
                                        "https://ru.ninemanga.com",
                                   9    "https://swatmanga.net",
                --------------------MANGA-----------------------------                        
                                  14    "https://br.ninemanga.com",
                                  13    "https://de.ninemanga.com",
                                  16    "https://es.ninemanga.com",
                                  17    "https://fr.ninemanga.com",
                                  18    "https://it.ninemanga.com",
                                   5    "https://mangajar.com/manga",
                                   8    "https://mangajar.com",
                              *    6    "https://mangakomi.io/",
                              *    2    "https://mangareader.cc",   
                                   7    "https://readm.org/",   
                                   1    "https://ww5.manganelo.tv",
                                   0    "https://www.mangainn.net",
                                        
    */}

            <div
              className="cursor-pointer"
              onClick={() => {
                dispatch(changeServer(4));

                navigate("/" + 4 + "/novel");
              }}
              // onClick={() => dispatch(changeServer(4))}
            >
              {/* redirect to server novel : bestlightnovel.com*/}
              <p className="novel">Novel</p>
            </div>

            <div
              ref={menuServerForComputer}
              onClick={() =>
                setIsOpenMenuServerForComputer(!isOpenMenuServerForComputer)
              }
              className="dropdown relative cursor-pointer"
            >
              <button>Server</button>

              {isOpenMenuServerForComputer ? (
                <ul
                  className="menu grid grid-cols-2"
                  onClick={() => handleOpen()}
                >
                  {serverName &&
                    serverName.length > 0 &&
                    serverName.map((item) => {
                      return (
                        <li
                          key={item.sv}
                          className="menu-item flex justify-start items-center pe-2"
                          onClick={() => handleNavigate(item.sv)}
                        >
                          <button
                            onClick={() => dispatch(changeServer(item.sv))}
                          >
                            {item.name}
                          </button>
                          <div className="">{item.icon}</div>
                        </li>
                      );
                    })}
                </ul>
              ) : null}

              {serverName.map((item) =>
                item.sv === sv ? (
                  <div
                    key={item.sv}
                    className="text-red-700 text-base tracking-wide font-normal absolute top-full w-full flex justify-start items-center gap-[6px]"
                  >
                    <span>{item.name}</span>
                    <div>{item.icon}</div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>

            <div
              className="cursor-pointer"
              onClick={() => navigate("/" + sv + `/contact-us`)}
            >
              <p className="contact">Contact us</p>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => navigate("/" + sv + `/policy`)}
            >
              <p className="policy">Policy</p>
            </div>
            <a
              target="_blank"
              href={`https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720`}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                alt=""
                className="w-5 h-5 lg:w-12 lg:h-12 hover:scale-105 transition-all cursor-pointer"
              />
            </a>
          </div>
        )}

        <div
          className={`flex relative items-center space-x-2`}
          ref={menuSearch}
        >
          <CiSearch
            color="red"
            size={32}
            onClick={handleSearch}
            className="mr-2 cursor-pointer"
          />
          <input
            className="rounded-full px-4 py-2 text-gray-800"
            placeholder="Search..."
            name="content"
            onClick={() => setIsOpenMenuSearch(!isOpenMenuSearch)}
            onChange={handleOnChange}
            onKeyDown={handleSearch}
          />
          {!isLogin ? (
            <div className="flex justify-center align-middle items-center ml-4">
              <Link to={`/login`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            // <div to="/user-profile">
            //     <div className="avatar">
            //         <img src="/images/usersquare.svg" alt="usersquare"></img>
            //     </div>
            // </div>
            <SubMenu />
          )}
          {/* search */}
          {checkSearch && input.content && isOpenMenuSearch && input !== "" ? (
            <>
              <div
                className={
                  styles.search +
                  " h-[500px] w-[380px] bg-[#DADADA] absolute top-[50px] max-[480px]:!hidden right-2 rounded-lg border-double justify-center items-center "
                }
              >
                <div className="h-[470px] overflow-y-scroll overflow-x-hidden w-full">
                  {searchData ? (
                    searchData.map((item, index) => (
                      <Link
                        to={"/" + sv + `/chapter/` + arr_path[index]}
                        className="flex px-1 w-full"
                        onClick={() => {
                          navigate("/" + sv + "/chapter/" + arr_path[index]);
                        }}
                      >
                        <img
                          className="w-[50px] h-[100px] py-2 rounded-lg"
                          src={item.poster}
                          alt=""
                        />

                        <div className="text-lg flex flex-col ml-6 w-full justify-center gap-3">
                          <div className="whitespace-nowrap truncate w-[260px]">
                            {item.title}
                          </div>
                          <div className="whitespace-nowrap text-normal text-gray-600 truncate w-[260px]">
                            categories:{item.categories}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p>Not found @@</p>
                  )}
                </div>

                <div className="text-white border-5 w-full border-white bg-blue-400 rounded-lg h-auto text-center flex content-center justify-center my-2">
                  <button onClick={() => handleCloseSearch()}>Close</button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="header-top 2 hidden max-[480px]:block !bg-black !w-full !h-fit ">
        <div className="avatar_search max-[480px]:!px-4 max-[480px]:!py-4 max-[480px]:!ml-0  w-full flex-col !gap-4 !items-start">
          {!isLogin ? (
            <div className="flex justify-between w-full py-3 align-middle items-center ml-4 max-[480px]:!ml-0">
              <p className="text-white italic text-4xl font-semibold">
                Manga Social
              </p>
              <Link to={`/login`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  max-[480px]:text-base rounded-full">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            // <div to="/user-profile">
            //     <div className="avatar">
            //         <img src="/images/usersquare.svg" alt="usersquare"></img>
            //     </div>
            // </div>
            <div className="max-[480px]:flex max-[480px]:justify-between max-[480px]:items-center w-full">
              <SubMenu />
              <IoSettingsSharp
                size={40}
                className="text-white hidden max-[480px]:block"
              />
            </div>
          )}
          <div
            className="!w-full flex justify-center relative items-center "
            ref={menuServerForPhone}
          >
            {/* <CiSearch
              color="red"
              size={32}
              onClick={handleSearch}
              className="mr-2 cursor-pointer"
            /> */}
            <input
              className=" border-none outline-none !bg-[#4A4A4A] max-[480px]:!text-white opacity-100 !w-[100%] !h-[50px] !text-sm !rounded-3xl max-[480px]:!ps-6"
              placeholder="Search..."
              name="content"
              onChange={handleOnChange}
              onKeyDown={handleSearch}
              onClick={() => {
                console.log(isOpenMenuServerForPhone);

                setIsOpenMenuServerForPhone(!isOpenMenuServerForPhone);
              }}
            />
            {checkSearch &&
            isOpenMenuServerForPhone &&
            input.content &&
            input.content !== "" ? (
              <div className="w-[92%] bg-[#DADADA] absolute bottom-[-360px]  rounded-lg border-double flex justify-center flex-col items-center ">
                <div className="w-full overflow-x-hidden overflow-y-auto h-[300px]">
                  {searchData ? (
                    searchData.map((item, index) => (
                      <>
                        <Link
                          to={"/" + sv + `/chapter/` + arr_path[index]}
                          className="flex px-1 w-full"
                          onClick={() => {
                            navigate("/" + sv + "/chapter/" + arr_path[index]);
                          }}
                        >
                          <img
                            className="w-[50px] h-[100px] py-2 rounded-lg"
                            src={item.poster}
                            alt=""
                          />

                          <div className="text-lg flex flex-col ml-6 w-full justify-center gap-3">
                            <div className="whitespace-nowrap truncate w-[260px]">
                              {item.title}
                            </div>
                            <div className="whitespace-nowrap text-normal text-gray-600 truncate w-[260px]">
                              categories:{item.categories}
                            </div>
                          </div>
                        </Link>
                      </>
                    ))
                  ) : (
                    <p>Not found @@</p>
                  )}
                </div>
                <div className="text-white border-5 w-full border-white bg-blue-400 rounded-lg h-auto flex text-center content-center justify-center my-2">
                  <button
                    className="w-full"
                    onClick={() => handleCloseSearch()}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          {/*  */}
        </div>
      </div>
      <div className="header-mobile  w-full z-[999] py-2 pe-2 bg-[#F45F17] fixed bottom-0 right-0 hidden max-[480px]:block">
        <ul className="flex w-full justify-between items-center ">
          <li className="">
            <Link
              to={`/${sv}`}
              className="flex flex-col gap-1 justify-center items-center w-full h-full"
            >
              <div className="icon text-white">
                <IoHomeSharp size={20} />
              </div>
              <p className="title text-white font-semibold ">Home</p>
            </Link>
          </li>
          <li className="">
            <Link
              to={`/${sv}`}
              className="flex flex-col gap-1 justify-center items-center w-full h-full"
            >
              <div className="icon text-white">
                <IoNewspaperOutline size={20} />
              </div>
              <p className="title text-white font-semibold">News</p>
            </Link>
          </li>
          <li className="">
            <button
              className="flex flex-col gap-1 items-center justify-center w-full h-full"
              ref={submenuRef}
              onClick={() => handleOpen()}
            >
              {/* <button ref={submenuRef}>Server</button> */}

              <div className="icon text-white">
                {open ? (
                  <FaGoogleDrive size={20} />
                ) : (
                  <>
                    {serverName.map((item) =>
                      item.sv === sv ? (
                        <div
                          key={item.sv}
                          ref={submenuRef}
                          onClick={() => handleOpen()}
                        >
                          {item.icon}
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </>
                )}
              </div>

              <div className="dropdown relative max-[480px]:static text-sm max-[480px]:hover:!text-white">
                <div className="!text-white hover:!text-white ">Server</div>
                {open && (
                  <ul
                    className="menu slider-container min-w-[350px] absolute top-[-34px] left-0 bg-black transform -translate-y-full overflow-x-auto -translate-x-[50%] grid grid-cols-2 shadow-lg max-[480px]:absolute max-[480px]:w-full z-[999]"
                    onClick={() => handleOpen()}
                  >
                    {serverName &&
                      serverName.length > 0 &&
                      serverName.map((item) => (
                        <li
                          key={item.sv}
                          className="menu-item slider-item flex justiyf-start items-center p-2 hover:bg-gray-200"
                          onClick={() => {
                            navigate("/" + item.sv);
                            dispatch(changeServer(item.sv));
                          }}
                        >
                          {/* <button className="text-left w-full flex justify-start items-center">
                            {item.name}
                            <div className="ml-2">{item.icon}</div>
                          </button> */}
                          <div>{item.name}</div>
                          <div className="ml-2">{item.icon}</div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              {/* <div className="dropdown relative text-sm max-[480px]:static max-[480px]:hover:text-white">
                <div className="text-white hover:text-white">Server</div>
                {open ? (
                  <ul
                    className="menu absolute max-[480px]:static max-[480px]:bottom-[90%] max-[480px]:left-0 max-[480px]:right-0 max-[480px]:w-[100vw] z-[999] w-auto grid grid-cols-2"
                    onClick={() => handleOpen()}
                  >
                    {serverName &&
                      serverName.length > 0 &&
                      serverName.map((item) => (
                        <li
                          key={item.sv}
                          className="menu-item flex justify-start items-center p-2"
                          onClick={() => navigate("/" + item.sv)}
                        >
                          <button
                            onClick={() => dispatch(changeServer(item.sv))}
                          >
                            {item.name}
                          </button>
                          <div>{item.icon}</div>
                        </li>
                      ))}
                  </ul>
                ) : null}
              </div> */}
              {/* <div className="dropdown max-[480px]:static text-sm max-[480px]:hover:text-white">
                <div className="text-white hover:text-white">Server</div>
                {open && (
                  <ul
                    className="menu absolute top-0 left-0 transform -translate-y-full w-auto grid grid-cols-2 bg-white shadow-lg max-[480px]:static max-[480px]:w-full z-[999]"
                    onClick={() => handleOpen()}
                  >
                    {serverName &&
                      serverName.length > 0 &&
                      serverName.map((item) => (
                        <li
                          key={item.sv}
                          className="menu-item flex justify-start items-center p-2 hover:bg-gray-200"
                          onClick={() => navigate("/" + item.sv)}
                        >
                          <button
                            className="text-left w-full"
                            onClick={() => dispatch(changeServer(item.sv))}
                          >
                            {item.name}
                          </button>
                          <div className="ml-2">{item.icon}</div>
                        </li>
                      ))}
                  </ul>
                )}
              </div> */}
            </button>
          </li>
          <li className="">
            <Link
              to={`/${sv}/genres`}
              className="flex flex-col gap-1 justify-center items-center w-full h-full"
            >
              <div className="icon text-white">
                <RiSettingsFill size={20} />
              </div>
              <p className="title text-white font-semibold">Genres</p>
            </Link>
          </li>
          <li className="">
            <div
              className="flex flex-col gap-1 justify-center items-center w-full h-full"
              onClick={() => {
                dispatch(changeServer(4));

                navigate("/" + 4 + "/novel");
              }}
            >
              <div className="icon text-white">
                <FaBook size={20} />
              </div>
              <p className="title text-white font-semibold">Novel</p>
            </div>
          </li>
        </ul>
      </div>
      <Outlet></Outlet>

      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="z-10 p-8 text-center bg-white rounded-md">
            <h2 className="mb-4 text-2xl font-bold">Dowload App</h2>
            <div to={link}>
              <img src={modalContent} alt="ios" style={{ width: "200px" }} />
            </div>
            <button
              onClick={closeModal}
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
