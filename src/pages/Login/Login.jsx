import React, { useState, useRef } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Handle_function from "../../handle_account/handle";
import { useSelector, useDispatch } from "react-redux";
import { Buffer } from "buffer";
import styles from "../layout.module.scss";
import * as message from "../../components/Message/Message";
import { changeServer } from "../../Redux/Feature/serverSlice";
import CustomizeSpin from "../../components/spin/CustomizeSpin";
import Dropdown from "../../components/Dropdown/Dropdown";
import JP from "country-flag-icons/react/3x2/JP";
import US from "country-flag-icons/react/3x2/US";
import VN from "country-flag-icons/react/3x2/VN";
import AC from "country-flag-icons/react/3x2/AC";
import IC from "country-flag-icons/react/3x2/IC";
import EU from "country-flag-icons/react/3x2/EU";
import XK from "country-flag-icons/react/3x2/XK";
import RU from "country-flag-icons/react/3x2/RU";
import FR from "country-flag-icons/react/3x2/FR";

let path = "";
let arr_id_manga = [""];
let arr_url = [""];
let arr_path = [""];
export default function Login() {
  const [input, setInput] = useState("");
  const sv = useSelector((state) => state.server.sv);
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [checkSearch, setCheckSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpenMenuServerForComputer, setIsOpenMenuServerForComputer] =
    useState(false);

  const menuServerForComputer = useRef(null);

  const dispatch = useDispatch();

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

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInput((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  const handleNavigate = (index) => {
    if (index === 4 || index === 11) {
      navigate(`/${index}/novel`);
    } else {
      navigate(`/${index}`);
    }
  };

  const handleCloseSearch = () => {
    setCheckSearch(false);
  };
  const handleOpen = () => {
    setOpen(!open);
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
  //  const loginSubmit = () =>{
  //   Handle_function.Handle_login(input);
  //   Cookies.get("jwt")?navigate("/"):message.error("some things wrong!")

  //  }
  const token = Buffer.from(`dooxxinhgai@gmail.com:12345678`, "utf8").toString(
    "base64"
  );
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
  const loginSubmit = async () => {
    try {
      // console.log("check input", input);
      const response = await axios.post(
        "https://apimanga.mangasocial.online/login",
        input
      );

      if (response?.data.errCode !== 200) {
        message.error(response.data.message);
        setLoading(true);
        console.log(response);
      } else {
        message.success(response.data.message);

        sessionStorage.setItem("user", response?.data.account);
        sessionStorage.setItem("user_email", response?.data.account.email);
        sessionStorage.setItem("user_id", response?.data.account.id_user);
        sessionStorage.setItem("jwt", response?.data.account.jwt);
        // console.log(response)
        // console.log(response.headers.getSetCookie());
        setLoading(true);
        message.success(response.data.message);

        sessionStorage.setItem("user", response?.data.account);
        sessionStorage.setItem("user_email", response?.data.account.email);
        sessionStorage.setItem("user_id", response?.data.account.id_user);
        sessionStorage.setItem("jwt", response?.data.account.jwt);
        // console.log(response)
        // console.log(response.headers.getSetCookie());
        setLoading(true);

        if (sv === 4) {
          navigate(`/4/novel`);
        } else {
          navigate(`/${sv}`);
        }
      }
    } catch (error) {
      setLoading(true);
      message.error(
        "Please provide a valid email address and password. If you continue to have issues logging into your account"
      );
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    // console.log("check input", input);

    await loginSubmit();
  };
  // console.log("check loading", loading);

  return (
    <>
      <div className="flex px-3 items-center justify-between py-4 bg-gray-800  max-[480px]:hidden ">
        <Link
          to={sv === 4 ? `/4/novel` : `/${sv}`}
          className="title inline-flex justify-start items-center text-white space-x-2 cursor-pointer"
        >
          <img className="img-manga" src="/images/Ellipse 1.svg" alt=""></img>
          <h3>MangaSocial</h3>
        </Link>
        <div className="hidden md:flex cursor-pointer space-x-8 text-xl font-semibold text-white">
          <Link to={`/${sv}/genres`}>
            <p className=" text-white">Genres</p>
          </Link>

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
                        <button onClick={() => dispatch(changeServer(item.sv))}>
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

          <Link to={`/${sv}/contact-us`}>
            <p className="contact text-white">Contact us</p>
          </Link>
          <Link to={`/${sv}/policy`}>
            <p className="policy text-white">Policy</p>
          </Link>
          <Link
            to={`https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
              alt=""
              className="w-5 h-5 lg:w-12 lg:h-12 hover:scale-105 transition-all cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex relative items-center space-x-">
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
            onChange={handleOnChange}
            onKeyDown={handleSearch}
          />

          {checkSearch && input.content && input !== "" ? (
            <div
              className={
                styles.search +
                " h-80 w-[17rem] bg-[#DADADA] absolute top-[50px] max-[480px]:!hidden rounded-lg border-double flex justify-center flex-col items-center overflow-y-auto "
              }
            >
              <hr className="mt-[150px]" />
              {checkSearch && input.content && input !== "" ? (
                <div
                  className={
                    styles.search +
                    " h-80 w-[17rem] bg-[#DADADA] absolute top-[50px] max-[480px]:!hidden rounded-lg border-double flex justify-center flex-col items-center overflow-y-auto "
                  }
                >
                  <hr className="mt-[150px]" />
                  {searchData ? (
                    searchData.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="w-[90%] h-full border-double border-red-900 rounded-lg flex border-4 cursor-pointer  "
                      >
                        <img
                          className="w-1/3 h-[69%] py-2 rounded-lg"
                          src={item.poster}
                          alt=""
                        />
                        <Link
                          to={"/" + sv + `/chapter/` + arr_path[index]}
                          className="flex"
                        >
                          <div className="text-lg flex flex-col ml-6 justify-center">
                            <div>{item.title}</div>
                            <div>Rate:{item.rate}</div>
                            <div>Views: {item.views}</div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>Not found @@</p>
                  )}

                  <div className="text-white border-5 border-white bg-blue-400 rounded-lg h-auto w-24 flex text-center content-center justify-center my-2">
                    <button onClick={() => handleCloseSearch()}>Close</button>
                  </div>
                </div>
              ) : null}

              <div className="text-white border-5 border-white bg-blue-400 rounded-lg h-auto w-24 flex text-center content-center justify-center my-2">
                <button onClick={() => handleCloseSearch()}>Close</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <Outlet></Outlet>
      {/* max-[435px]:bg-gradient-to-b max-[435px]:to-black max-[435px]:opacity-95 */}
      <div className="bg-[url('/public/images/Login/bg-login.jpeg')] w-full h-full max-[435px]:h-full  bg-cover bg-center bg-no-repeat relative ">
        <div className="max-[435px]:block hidden bg-gradient-to-b from-transparent to-black opacity-100 absolute top-0 bottom-0 right-0 left-0 z-[1]"></div>
        <div className="flex justify-center items-center h-full font-semibold relative z-[10]">
          <div className="w-[520px] h-[800px] bg-[#353434] max-[435px]:bg-transparent flex flex-col gap-[31px] items-center justify-center max-[435px]:justify-start  rounded-xl  max-[435px]:w-full max-[435px]:h-full max-[435px]:pt-[36%]  max-[435px]:rounded-none max-[435px]:gap-[30px]">
            <div className="flex items-center flex-col gap-3 ">
              <h1 className="text-4xl  text-white max-[435px]:text-3xl max-[435px]:leading-[28px] max-[435px]:font-semibold">
                Log in
              </h1>
              <h1 className="text-xl text-white max-[435px]:text-base max-[435px]:font-semibold">
                You can use your app or account to login
              </h1>
            </div>
            <div className="relative flex py-5 items-center w-[378px]">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-base">
                Or Continue with
              </span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <div className="w-[378px] text-base text-white flex flex-col gap-3 max-[435px]:w-full max-[435px]:flex max-[435px]:justify-center max-[435px]:items-center max-[435px]:gap-2">
              <div className="w-full p-[10px] bg-[#747474] rounded-md  max-[435px]:rounded-xl  max-[435px]:w-[90%]">
                <input
                  className="w-full border-none outline-none bg-transparent opacity-100 max-[435px]:h-[20px] max-[435px]:text-xs"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                />
              </div>

              <div className="w-full p-[10px] bg-[#747474] rounded-md flex items-center  max-[435px]:rounded-xl   max-[435px]:w-[90%]">
                <input
                  className="w-full border-none outline-none bg-transparent opacity-100  max-[435px]:h-[20px] max-[435px]:text-xs"
                  placeholder="Password"
                  type={hidden ? "password" : "text"}
                  name="password"
                  onChange={handleOnChange}
                />
                {hidden ? (
                  <IoMdEyeOff
                    size={26}
                    className="cursor-pointer max-[435px]:!text-[20px]"
                    onClick={() => setHidden(!hidden)}
                  />
                ) : (
                  <IoEye
                    size={26}
                    className="cursor-pointer max-[435px]:!text-[20px]"
                    onClick={() => setHidden(!hidden)}
                  />
                )}
              </div>

              <div
                className="w-full h-full max-[435px]:flex max-[435px]:justify-center"
                onClick={() => setLoading(false)}
              >
                <div
                  className="w-full p-[10px] max-[435px]:w-[90%] bg-[#929292] rounded-md max-[435px]:rounded-xl hover:bg-[#EA6016] cursor-pointer"
                  onClick={handleSubmit}
                >
                  <div className="w-full border-none text-center outline-none text-white opacity-100 uppercase bg-transparent cursor-pointer max-[435px]:h-[16px] max-[435px]:text-xs max-[435px]:font-semibold ">
                    {loading ? "Log in" : <CustomizeSpin />}
                  </div>
                </div>
              </div>
            </div>

            <Link to="/forgot-password">
              <h1 className="text-[#EA6016] cursor-pointer hover:underline hover:font-extrabold text-base max-[435px]:text-sm max-[435px]:font-semibold">
                Forgot Password?
              </h1>
            </Link>

            <div className="flex items-center gap-3 max-[435px]:hidden">
              <img
                src="https://raw.githubusercontent.com/Exorcist11/MangaSocial/main/public/images/Login/QR.png"
                alt=""
                className="w-[50px] h-[50px]"
              />
              <h1 className="text-[#EA6016] cursor-pointer hover:font-extrabold text-base max-[435px]:font-semibold ">
                Scan QR Code to Login
              </h1>
            </div>

            <div className="flex gap-1 cursor-pointer hover:font-extrabold text-base mt-[40%]">
              <h1 className="text-[#747474] text-base max-[435px]:font-semibold">
                Don't have an account?
              </h1>
              <p
                className="text-[#EA6016] hover:underline text-base max-[435px]:font-semibold"
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// import React, { useState, useRef } from "react";
// import { IoEye } from "react-icons/io5";
// import { IoMdEyeOff } from "react-icons/io";
// import * as message from "../../components/Message/Message";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { Link, Outlet } from "react-router-dom";
// import { CiSearch } from "react-icons/ci";
// import Handle_function from "../../handle_account/handle";
// import { useSelector, useDispatch } from "react-redux";
// import { changeServer } from "../../Redux/Feature/serverSlice";
// import { Buffer } from "buffer";
// import SubMenu from "../../components/SubMenu/SubMenu";
// import CustomizeSpin from "../../components/spin/CustomizeSpin";
// import Dropdown from "../../components/Dropdown/Dropdown";
// import JP from "country-flag-icons/react/3x2/JP";
// import US from "country-flag-icons/react/3x2/US";
// import VN from "country-flag-icons/react/3x2/VN";
// import AC from "country-flag-icons/react/3x2/AC";
// import IC from "country-flag-icons/react/3x2/IC";
// import EU from "country-flag-icons/react/3x2/EU";
// import XK from "country-flag-icons/react/3x2/XK";
// import RU from "country-flag-icons/react/3x2/RU";
// import FR from "country-flag-icons/react/3x2/FR";
// import styles from "../layout.module.scss";

// let path = "";
// let arr_id_manga = [""];
// let arr_url = [""];
// let arr_path = [""];

// export default function Login() {
//   const [input, setInput] = useState("");
//   const [open, setOpen] = useState(false);
//   const sv = useSelector((state) => state.server.sv);
//   const navigate = useNavigate();
//   const [hidden, setHidden] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchData, setSearchData] = useState("");
//   const [checkSearch, setCheckSearch] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1150);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isServerHovered, setIsServerHovered] = useState(false);
//   const [link, setLink] = useState("");
//   const [slugState, setSlugState] = useState();

//   const [search, setSearch] = useState("");
//   const [url, setURL] = useState("");
//   const [isMenuVisible, setIsMenuVisible] = useState(true);
//   const [showMenu, setShowMenu] = useState(true);
//   const [reload, setReload] = useState(true);
//   const { slug } = useParams();

//   let isLogin = getSessionData();

//   const submenuRef = useRef(null);

//   const dispatch = useDispatch();

//   const handleClickOutside = (event) => {
//     if (submenuRef.current && !submenuRef.current.contains(event.target)) {
//       setOpen(false);
//     }
//   };

//   let getSessionData = () => {
//     return sessionStorage.getItem("user_email");
//     // return Handle_function.isAuthen
//   };

//     const handleCloseSearch = () => {
//       setCheckSearch(false);
//     };

//   const serverName = [
//     // {
//     //   sv: 0,
//     //   name: "mangainn.net",
//     //   icon: (
//     //     <US
//     //       title="Vietnamese"
//     //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5 "
//     //     />
//     //   ),
//     // },
//     {
//       sv: 1,
//       name: "ww5.manganelo.tv",
//       icon: (
//         <JP
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     // {
//     //   sv: 2,
//     //   name: "mangareader.cc",
//     //   icon: (
//     //     <JP
//     //       title="Vietnamese"
//     //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//     //     />
//     //   ),
//     // },
//     {
//       sv: 3,
//       name: "ninemanga.com",
//       icon: (
//         <JP
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     {
//       sv: 4,
//       name: "bestlightnovel.com",
//       icon: (
//         <XK
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     {
//       sv: 5,
//       name: "mangajar.com/manga",
//       icon: (
//         <EU
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     // {
//     //   sv: 6,
//     //   name: "mangakomi.io",
//     //   icon: (
//     //     <US
//     //       title="Vietnamese"
//     //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//     //     />
//     //   ),
//     // },
//     {
//       sv: 7,
//       name: "readm.org",
//       icon: (
//         <EU
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     // {
//     //   sv: 8,
//     //   name: "mangajar.com",
//     //   icon: <XK title="Vietnamese" className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5" />,
//     // },
//     {
//       sv: 9,
//       name: "swatmanga.com",
//       icon: (
//         <EU
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     {
//       sv: 10,
//       name: "mangajar.com",
//       icon: (
//         <JP
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     // {
//     //   sv: 11,
//     //   name: "novelhall.com",
//     //   icon: (
//     //     <JP
//     //       title="Vietnamese"
//     //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//     //     />
//     //   ),
//     // },
//     // {
//     //   sv: 12,
//     //   name: "mto.com",
//     //   icon: (
//     //     <JP
//     //       title="Vietnamese"
//     //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//     //     />
//     //   ),
//     // },
//     {
//       sv: 13,
//       name: "de.ninemanga.com",
//       icon: (
//         <JP
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     {
//       sv: 14,
//       name: "br.ninemanga.com",
//       icon: (
//         <JP
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     {
//       sv: 15,
//       name: "ru.ninemanga.com",
//       icon: (
//         <RU
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     {
//       sv: 16,
//       name: "es.ninemanga.com",
//       icon: (
//         <JP
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     {
//       sv: 17,
//       name: "fr.ninemanga.com",
//       icon: (
//         <FR
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     {
//       sv: 18,
//       name: "it.ninemanga.com",
//       icon: (
//         <US
//           title="Vietnamese"
//           className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//         />
//       ),
//     },
//     // {
//     //   sv: 19,
//     //   name: "azoranov.com/series/",
//     //   icon: (
//     //     <US
//     //       title="Vietnamese"
//     //       className="max-[480px]:h-5 max-[480px]:w-5 h-5 w-5"
//     //     />
//     //   ),
//     // },
//   ];
//   const handleOnChange = (event) => {
//     const { name, value } = event.target;
//     setInput((preState) => ({
//       ...preState,
//       [name]: value,
//     }));
//   };
//   //  const loginSubmit = () =>{
//   //   Handle_function.Handle_login(input);
//   //   Cookies.get("jwt")?navigate("/"):message.error("some things wrong!")

//   //  }
//   const token = Buffer.from(`dooxxinhgai@gmail.com:12345678`, "utf8").toString(
//     "base64"
//   );
//   const loginSubmit = async () => {
//     try {
//       // console.log("check input", input);
//       const response = await axios.post(
//         "https://apimanga.mangasocial.online/login",
//         input
//       );

//       if (response?.data.errCode !== 200) {
//         message.error(response.data.message);
//         setLoading(true);
//         console.log(response);
//       } else {
//         message.success(response.data.message);

//         sessionStorage.setItem("user", response?.data.account);
//         sessionStorage.setItem("user_email", response?.data.account.email);
//         sessionStorage.setItem("user_id", response?.data.account.id_user);
//         sessionStorage.setItem("jwt", response?.data.account.jwt);
//         // console.log(response)
//         // console.log(response.headers.getSetCookie());
//         setLoading(true);
//         message.success(response.data.message);

//         sessionStorage.setItem("user", response?.data.account);
//         sessionStorage.setItem("user_email", response?.data.account.email);
//         sessionStorage.setItem("user_id", response?.data.account.id_user);
//         sessionStorage.setItem("jwt", response?.data.account.jwt);
//         // console.log(response)
//         // console.log(response.headers.getSetCookie());
//         setLoading(true);

//         if (sv === 4) {
//           navigate(`/4/novel`);
//         } else {
//           navigate(`/${sv}`);
//         }
//       }
//     } catch (error) {
//       setLoading(true);
//       message.error(
//         "Please provide a valid email address and password. If you continue to have issues logging into your account"
//       );
//       console.log(error);
//     }
//   };
//   const handleSubmit = async () => {
//     // console.log("check input", input);

//     await loginSubmit();
//   };
//   const handleNavigateClickLogo = () => {
//     if (sv != 4) {
//       navigate(`/` + sv);
//     } else {
//       navigate(`/` + sv + "/novel");
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.post(
//         "https://apimanga.mangasocial.online/search-manga-by-name-in-sever/" +
//           sv,
//         input
//       );
//       setSearchData(response.data);
//       console.log(response.data);
//       if (response.status == 200) {
//         setCheckSearch(true);
//       }

//       let a = response.data[0].id_manga;
//       let url = a.lastIndexOf("/");
//       path = a.slice(url + 1, 1000);
//       setSearch(response.data[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   const handleNavigate = (index) => {
//     if (index === 4 || index === 11) {
//       navigate(`/${index}/novel`);
//     } else {
//       navigate(`/${index}`);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   function changeSV(index) {
//     dispatch(changeServer(index));
//     this.forceUpdate();
//   }
//   // console.log("check loading", loading);

//   return (
//     <>
//       {/* <div className="header-top max-[435px]:hidden">
//         <Link to={sv === 4 ? `/4/novel` : `/${sv}`}>
//           <div className="title">
//             <img className="img-manga" src="/images/Ellipse 1.svg" alt=""></img>
//             <h3>MangaSocial</h3>
//           </div>
//         </Link>
//         <div className="menu-header">
//           <Link to={`/${sv}`}>
//             <div className="comic">
//               <p>Comic</p>
//               <img className="arrow-img" alt="Arrow" />
//             </div>
//           </Link>

//           <Link to={`/${sv}/genres`}>
//             <p>Genres</p>
//           </Link>

//           <p>Popular</p>

//           <div className="dropdown">
//             <button>Server</button>
//           </div>

//           <Link to={`/${sv}/contact-us`}>
//             <p className="contact">Contact us</p>
//           </Link>
//           <Link to={`/${sv}/policy`}>
//             <p className="policy">Policy</p>
//           </Link>
//           <Link
//             to={`https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720`}
//           >
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
//               alt=""
//               className="w-5 h-5 lg:w-12 lg:h-12 hover:scale-105 transition-all cursor-pointer"
//             />
//           </Link>
//         </div>
//         <div className="avatar_search">
//           <CiSearch color="red" size={32} className="mr-2" />
//           <input
//             className="w-full border-none outline-none bg-transparent opacity-100"
//             placeholder="Search"
//             name="content"
//           />

//           <div className="flex justify-center align-middle items-center ml-4">
//             <Link to="/login">
//               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
//                 Login
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div> */}
//       <div className="flex px-3 items-center justify-between py-4 bg-gray-800  max-[480px]:hidden ">
//         <div className="flex items-center space-x-2 group-hover:text-red-700 ">
//           <div
//             onClick={() => handleNavigateClickLogo()}
//             className="title inline-flex justify-start items-center text-white space-x-2 cursor-pointer"
//           >
//             <img
//               className="img-manga max-[725px]:!hidden"
//               src="/images/logo-thinkdiff.png"
//               alt=""
//             ></img>
//             <h3 className="">MangaSocial</h3>
//           </div>
//           {isLargeScreen ? "" : <Dropdown />}
//         </div>

//         {isLargeScreen && (
//           <div
//             className={`hidden md:flex cursor-pointer space-x-8 text-xl font-semibold text-white `}
//           >
//             <div
//               className="cursor-pointer"
//               onClick={() => navigate("/" + sv + "/genres")}
//             >
//               <p>Genres</p>
//             </div>

//             {/* <div
//             className="server"
//             onMouseEnter={handleServerMouseEnter}
//             onMouseLeave={handleServerMouseLeave}
//           >
//             <p>Server</p>
//             <img
//               className="arrow-img"
//               src={
//                 isServerHovered
//                   ? "/images/Polygon cam.svg"
//                   : "/images/Polygon 1.svg"
//               }
//               alt="Arrow"
//             />
//           </div> */}

//             {/* SERVER LIST       index    link
//           --------------------------NOVEL------------------------------------
//                                         "https://www.ninemanga.com",
//                                         "https://mangajar.com/",
//                                   11    "https://www.novelhall.com"
//                                         "https://azoranov.com/series/",
//                                    4    "https://bestlightnovel.com/",
//                                   12    "https://mto.to/",
//                                         "https://ru.ninemanga.com",
//                                    9    "https://swatmanga.net",
//                 --------------------MANGA-----------------------------
//                                   14    "https://br.ninemanga.com",
//                                   13    "https://de.ninemanga.com",
//                                   16    "https://es.ninemanga.com",
//                                   17    "https://fr.ninemanga.com",
//                                   18    "https://it.ninemanga.com",
//                                    5    "https://mangajar.com/manga",
//                                    8    "https://mangajar.com",
//                               *    6    "https://mangakomi.io/",
//                               *    2    "https://mangareader.cc",
//                                    7    "https://readm.org/",
//                                    1    "https://ww5.manganelo.tv",
//                                    0    "https://www.mangainn.net",

//     */}

//             <div
//               className="cursor-pointer"
//               onClick={() => {
//                 dispatch(changeServer(4));

//                 navigate("/" + 4 + "/novel");
//               }}
//               // onClick={() => dispatch(changeServer(4))}
//             >
//               {/* redirect to server novel : bestlightnovel.com*/}
//               <p className="novel">Novel</p>
//             </div>

//             <div className="dropdown relative cursor-pointer">
//               <button ref={submenuRef} onClick={() => handleOpen()}>
//                 Server
//               </button>
//               {open ? (
//                 <ul
//                   className="menu grid grid-cols-2"
//                   onClick={() => handleOpen()}
//                 >
//                   {serverName &&
//                     serverName.length > 0 &&
//                     serverName.map((item) => {
//                       return (
//                         <li
//                           key={item.sv}
//                           className="menu-item flex justify-start items-center pe-2"
//                           onClick={() => handleNavigate(item.sv)}
//                         >
//                           <button
//                             onClick={() => dispatch(changeServer(item.sv))}
//                           >
//                             {item.name}
//                           </button>
//                           <div className="">{item.icon}</div>
//                         </li>
//                       );
//                     })}
//                 </ul>
//               ) : null}

//               {open ? (
//                 ""
//               ) : (
//                 <>
//                   {serverName.map((item) =>
//                     item.sv === sv ? (
//                       <div
//                         key={item.sv}
//                         className="text-red-700 text-base tracking-wide font-normal absolute top-full w-full flex justify-start items-center gap-[6px]"
//                       >
//                         <span>{item.name}</span>
//                         <div>{item.icon}</div>
//                       </div>
//                     ) : (
//                       ""
//                     )
//                   )}
//                 </>
//               )}
//             </div>

//             <div
//               className="cursor-pointer"
//               onClick={() => navigate("/" + sv + `/contact-us`)}
//             >
//               <p className="contact">Contact us</p>
//             </div>
//             <div
//               className="cursor-pointer"
//               onClick={() => navigate("/" + sv + `/policy`)}
//             >
//               <p className="policy">Policy</p>
//             </div>
//             <a
//               target="_blank"
//               href={`https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720`}
//             >
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
//                 alt=""
//                 className="w-5 h-5 lg:w-12 lg:h-12 hover:scale-105 transition-all cursor-pointer"
//               />
//             </a>
//           </div>
//         )}

//         <div className={`flex relative items-center space-x-2`}>
//           <CiSearch
//             color="red"
//             size={32}
//             onClick={handleSearch}
//             className="mr-2 cursor-pointer"
//           />
//           <input
//             className="rounded-full px-4 py-2 text-gray-800"
//             placeholder="Search..."
//             name="content"
//             onChange={handleOnChange}
//             onKeyDown={handleSearch}
//           />
//           {!isLogin ? (
//             <div className="flex justify-center align-middle items-center ml-4">
//               <Link to={`/login`}>
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
//                   Login
//                 </button>
//               </Link>
//             </div>
//           ) : (
//             // <div to="/user-profile">
//             //     <div className="avatar">
//             //         <img src="/images/usersquare.svg" alt="usersquare"></img>
//             //     </div>
//             // </div>
//             <SubMenu />
//           )}
//           {/*  */}
//           {checkSearch && input.content && input !== "" ? (
//             <div
//               className={
//                 styles.search +
//                 " h-80 w-[17rem] bg-[#DADADA] absolute top-[50px] max-[480px]:!hidden rounded-lg border-double flex justify-center flex-col items-center overflow-y-auto "
//               }
//             >
//               <hr className="mt-[150px]" />
//               {searchData ? (
//                 searchData.slice(0, 3).map((item, index) => (
//                   <div
//                     key={index}
//                     className="w-[90%] h-full border-double border-red-900 rounded-lg flex border-4 cursor-pointer  "
//                   >
//                     <img
//                       className="w-1/3 h-[69%] py-2 rounded-lg"
//                       src={item.poster}
//                       alt=""
//                     />
//                     <Link
//                       to={"/" + sv + `/chapter/` + arr_path[index]}
//                       className="flex"
//                       onClick={() => {
//                         navigate("/" + sv + "/chapter/" + arr_path[index]);
//                         window.location.reload();
//                       }}
//                     >
//                       <div className="text-lg flex flex-col ml-6 justify-center">
//                         <div>{item.title}</div>
//                         <div>Rate:{item.rate}</div>
//                         <div>Views: {item.views}</div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))
//               ) : (
//                 <p>Not found @@</p>
//               )}

//               <div className="text-white border-5 border-white bg-blue-400 rounded-lg h-auto w-24 flex text-center content-center justify-center my-2">
//                 <button onClick={() => handleCloseSearch()}>Close</button>
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>

//       <Outlet></Outlet>
//       {/* max-[435px]:bg-gradient-to-b max-[435px]:to-black max-[435px]:opacity-95 */}
//       <div className="bg-[url('/public/images/Login/bg-login.jpeg')] w-full h-full max-[435px]:h-full  bg-cover bg-center bg-no-repeat relative ">
//         <div className="max-[435px]:block hidden bg-gradient-to-b from-transparent to-black opacity-100 absolute top-0 bottom-0 right-0 left-0 z-[1]"></div>
//         <div className="flex justify-center items-center h-full font-semibold relative z-[10]">
//           <div className="w-[520px] h-[800px] bg-[#353434] max-[435px]:bg-transparent flex flex-col gap-[31px] items-center justify-center max-[435px]:justify-start  rounded-xl  max-[435px]:w-full max-[435px]:h-full max-[435px]:pt-[36%]  max-[435px]:rounded-none max-[435px]:gap-[30px]">
//             <div className="flex items-center flex-col gap-3 ">
//               <h1 className="text-4xl  text-white max-[435px]:text-3xl max-[435px]:leading-[28px] max-[435px]:font-semibold">
//                 Log in
//               </h1>
//               <h1 className="text-xl text-white max-[435px]:text-base max-[435px]:font-semibold">
//                 You can use your app or account to login
//               </h1>
//             </div>
//             <div className="relative flex py-5 items-center w-[378px]">
//               <div className="flex-grow border-t border-gray-400"></div>
//               <span className="flex-shrink mx-4 text-gray-400 text-base">
//                 Or Continue with
//               </span>
//               <div className="flex-grow border-t border-gray-400"></div>
//             </div>

//             <div className="w-[378px] text-base text-white flex flex-col gap-3 max-[435px]:w-full max-[435px]:flex max-[435px]:justify-center max-[435px]:items-center max-[435px]:gap-2">
//               <div className="w-full p-[10px] bg-[#747474] rounded-md  max-[435px]:rounded-xl  max-[435px]:w-[90%]">
//                 <input
//                   className="w-full border-none outline-none bg-transparent opacity-100 max-[435px]:h-[20px] max-[435px]:text-xs"
//                   placeholder="Enter your email"
//                   type="email"
//                   name="email"
//                   onChange={handleOnChange}
//                 />
//               </div>

//               <div className="w-full p-[10px] bg-[#747474] rounded-md flex items-center  max-[435px]:rounded-xl   max-[435px]:w-[90%]">
//                 <input
//                   className="w-full border-none outline-none bg-transparent opacity-100  max-[435px]:h-[20px] max-[435px]:text-xs"
//                   placeholder="Password"
//                   type={hidden ? "password" : "text"}
//                   name="password"
//                   onChange={handleOnChange}
//                 />
//                 {hidden ? (
//                   <IoMdEyeOff
//                     size={26}
//                     className="cursor-pointer max-[435px]:!text-[20px]"
//                     onClick={() => setHidden(!hidden)}
//                   />
//                 ) : (
//                   <IoEye
//                     size={26}
//                     className="cursor-pointer max-[435px]:!text-[20px]"
//                     onClick={() => setHidden(!hidden)}
//                   />
//                 )}
//               </div>

//               <div
//                 className="w-full h-full max-[435px]:flex max-[435px]:justify-center"
//                 onClick={() => setLoading(false)}
//               >
//                 <div
//                   className="w-full p-[10px] max-[435px]:w-[90%] bg-[#929292] rounded-md max-[435px]:rounded-xl hover:bg-[#EA6016] cursor-pointer"
//                   onClick={handleSubmit}
//                 >
//                   <div className="w-full border-none text-center outline-none text-white opacity-100 uppercase bg-transparent cursor-pointer max-[435px]:h-[16px] max-[435px]:text-xs max-[435px]:font-semibold ">
//                     {loading ? "Log in" : <CustomizeSpin />}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Link to="/forgot-password">
//               <h1 className="text-[#EA6016] cursor-pointer hover:underline hover:font-extrabold text-base max-[435px]:text-sm max-[435px]:font-semibold">
//                 Forgot Password?
//               </h1>
//             </Link>

//             <div className="flex items-center gap-3 max-[435px]:hidden">
//               <img
//                 src="https://raw.githubusercontent.com/Exorcist11/MangaSocial/main/public/images/Login/QR.png"
//                 alt=""
//                 className="w-[50px] h-[50px]"
//               />
//               <h1 className="text-[#EA6016] cursor-pointer hover:font-extrabold text-base max-[435px]:font-semibold ">
//                 Scan QR Code to Login
//               </h1>
//             </div>

//             <div className="flex gap-1 cursor-pointer hover:font-extrabold text-base mt-[40%]">
//               <h1 className="text-[#747474] text-base max-[435px]:font-semibold">
//                 Don't have an account?
//               </h1>
//               <p
//                 className="text-[#EA6016] hover:underline text-base max-[435px]:font-semibold"
//                 onClick={() => navigate("/sign-up")}
//               >
//                 Sign up
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
