import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.scss";
import { CiSearch } from "react-icons/ci";
import platform from "platform";
import "../../assets/scss/_dropdown.scss";
import { useDispatch, useSelector } from "react-redux";
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
import { FiAlignJustify } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/scss/_dropdown.scss";
import { changeServer } from "../../Redux/Feature/serverSlice";
import { setIsLoading } from "../../Redux/Feature/serverSlice";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isServerHovered, setIsServerHovered] = useState(false);
  const [link, setLink] = useState("");
  const submenuRef = useRef(null);

  //handle search
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [idMangaList, setIdMangaList] = useState("0");
  const [open, setOpen] = useState(false);
  const [checkSearch, setCheckSearch] = useState(false);
  const [url, setURL] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1800);

  const serverName = [
    {
      sv: 0,
      name: "mangainn.net",
      icon: (
        <US title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5 " />
      ),
    },
    {
      sv: 1,
      name: "ww5.manganelo.tv",
      icon: (
        <JP title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 2,
      name: "mangareader.cc",
      icon: (
        <JP title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 3,
      name: "ninemanga.com",
      icon: (
        <JP title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 4,
      name: "bestlightnovel.com",
      icon: (
        <XK title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 5,
      name: "mangajar.com/manga",
      icon: (
        <EU title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 6,
      name: "mangakomi.io",
      icon: (
        <US title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 7,
      name: "readm.org",
      icon: (
        <EU title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    // {
    //   sv: 8,
    //   name: "mangajar.com",
    //   icon: <XK title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />,
    // },
    {
      sv: 9,
      name: "swatmanga.com",
      icon: (
        <EU title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 10,
      name: "mangajar.com",
      icon: (
        <JP title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 11,
      name: "novelhall.com",
      icon: (
        <JP title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 12,
      name: "mto.com",
      icon: (
        <JP title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 13,
      name: "de.ninemanga.com",
      icon: (
        <JP title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 14,
      name: "br.ninemanga.com",
      icon: (
        <JP title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 15,
      name: "ru.ninemanga.com",
      icon: (
        <RU title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 16,
      name: "es.ninemanga.com",
      icon: (
        <JP title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 17,
      name: "fr.ninemanga.com",
      icon: (
        <FR title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    {
      sv: 18,
      name: "it.ninemanga.com",
      icon: (
        <US title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />
      ),
    },
    // {
    //   sv: 19,
    //   name: "azoranov.com/series/",
    //   icon: <US title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5" />,
    // },
  ];
  const sv = useSelector((state) => state.server.sv);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const dispatch = useDispatch();
  const handleCloseSearch = () => {
    setCheckSearch(false);
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleNavigate = (index) => {
    if (index === 4 || index === 11) {
      navigate(`/${index}/novel`);
    } else {
      navigate(`/${index}`);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleServerMouseEnter = () => {
    setIsServerHovered(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={styles.dropdown + "  min-[1150px]:hidden"}
      ref={dropdownRef}
    >
      <button className={styles.dropdown__toggle} onClick={toggleDropdown}>
        <FiAlignJustify />
      </button>
      {isOpen && (
        <div className={styles.dropdown__menu + " p-3 text-white bg-gray-700"}>
          <a
            className="p-4"
            target="_blank"
            href={`https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
              alt=""
              className="w-10 h-auto lg:w-12 lg:h-12 hover:scale-105 transition-all cursor-pointer"
            />
          </a>
          <div class="grid grid-cols-2 gap-4">
            <div
              className="comic flex  text-xl font-semibold hover:!bg-gray-700 cursor-pointer gap-3 items-center  "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p>Comic</p>
              <img
                className="arrow-img w-[1rem]"
                src={
                  isHovered
                    ? "/images/Polygon cam.svg"
                    : "/images/Polygon 1.svg"
                }
                alt="Arrow"
              />
            </div>

            <div
              className="cursor-pointer text-xl font-semibold hover:!bg-gray-700 "
              onClick={() => navigate("/" + sv + "/genres")}
            >
              <p>Genres</p>
            </div>

            <div className="dropdown relative ">
              <button ref={submenuRef} onClick={() => handleOpen()}>
                Server
              </button>
              {open ? (
                <ul
                  className="menu overflow-x-auto slider-container grid grid-cols-2"
                  onClick={() => handleOpen()}
                >
                  {serverName &&
                    serverName.length > 0 &&
                    serverName.map((item) => (
                      <li
                        key={item.sv}
                        className="menu-item flex justify-start items-center pe-2"
                        onClick={() => handleNavigate(item.sv)}
                      >
                        <button onClick={() => dispatch(changeServer(item.sv))}>
                          {item.name}
                        </button>
                        <div className="">{item.icon}</div>
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>
            <p className="cursor-pointer text-xl font-semibold hover:!bg-gray-700 ">
              Popular
            </p>

            <div
              onClick={() => {
                dispatch(changeServer(4));

                navigate("/" + 4 + "/novel");
              }}
              className="cursor-pointer text-xl font-semibold hover:!bg-gray-700 "
              // onClick={() => dispatch(changeServer(4))}
            >
              {/* redirect to server novel : bestlightnovel.com*/}
              <p className="novel cursor-pointer text-xl font-semibold hover:!bg-gray-700 ">
                Novel
              </p>
            </div>
            <div onClick={() => navigate("/" + sv + `/contact-us`)}>
              <p className="contact cursor-pointer text-xl font-semibold hover:!bg-gray-700 ">
                Contact us
              </p>
            </div>
            <div onClick={() => navigate("/" + sv + `/policy`)}>
              <p className="policy cursor-pointer text-xl font-semibold hover:!bg-gray-700 ">
                Policy
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
