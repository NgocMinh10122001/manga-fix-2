import { Link } from "react-router-dom";
import ComicRecent from "../../components/comicRecent";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { PiBagSimpleFill } from "react-icons/pi";
import { PiGenderIntersexFill } from "react-icons/pi";
import { FaTelegram } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { RiKey2Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { Modal } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import * as message from "../../components/Message/Message";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import NovelHistory from "./NovelHistory";
function UserProfile() {
  const [userData, setUserData] = useState();
  console.log("check userdata", userData);
  const [data, setData] = useState("");
  const [gioitinh, setGioitinh] = useState("");
  const inputRef = useRef(null);
  const [openName, setOpeName] = useState("");
  const [openIntroduction, setOpenIntroduction] = useState(false);
  const [openJob, setJob] = useState(false);
  const [openGender, setGender] = useState(false);
  const [openBirth, setBirth] = useState(false);
  const [openPass, setPass] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [dataHistory, setDataHistory] = useState([]);
  const [novelDataHistory, setNovelDataHistory] = useState([]);
  const [mangaDataHistory, setMangaDataHistory] = useState([]);

  console.log("check id", sessionStorage.getItem("user_id"));

  const user_id = sessionStorage.getItem("user_id");
  const onFinish = async (values) => {
    try {
      if (values.new_password === values.confirm_password) {
        const response = await axios.post(
          `https://apimanga.mangasocial.online/${sessionStorage.getItem(
            "user_id"
          )}/setting/password`,
          values
        );
        if (response && response.data) {
          message.success(`Update password is successfully, You have successfully registered for a mangasocial account. Please log in to your email, search for the verify account email to activate it, if not found, go to spam to search
`);
          handleCancel();
        } else {
          message.error(`password is wrong, try again!
`);
        }
      } else {
        message.error(
          "New password and confirmation password are not in async, please try again!"
        );
      }
    } catch (error) {
      message.error(
        `${
          error.response.data.message
            ? error.response.data.message
            : "Password is wrong, try again!"
        }`
      );
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleGender = () => {
    let selectGender = document.getElementById("gender");
    let selectedValue =
      selectGender.options[selectGender.selectedIndex].value || "";
    setGioitinh(selectedValue);
  };
  const handleChangeData = (e) => {
    setData(e.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalInput = (type) => {
    if (type === "introduction") {
      setOpenIntroduction(true);
    } else if (type === "job") {
      setJob(true);
    } else if (type === "gender") {
      setGender(true);
    } else if (type === "birth") {
      setBirth(true);
    } else if (type === "name") {
      setOpeName(true);
    } else if (type === "pass") {
      setPass(true);
      showModal();
    }
  };
  const editUserData = async (type, value) => {
    if (type === "job") {
      const res = await axios.patch(
        "https://apimanga.mangasocial.online/user/setting/" +
          sessionStorage.getItem("user_id") +
          "/",
        { gender: userData.gender, job: value }
      );
      if (res.status === 200) {
        alert("update successfull!");
        window.location.reload(true);
      } else {
        alert("Something wrong, please try again!");
      }
    } else if (type === "introduction") {
      const res = await axios.patch(
        "https://apimanga.mangasocial.online/user/setting/" +
          sessionStorage.getItem("user_id") +
          "/",
        { gender: userData.gender, introduction: value }
      );
      if (res.status === 200) {
        alert("update successfull!");
        window.location.reload(true);
      } else {
        alert("Something wrong, please try again!");
      }
    } else if (type === "birth") {
      const res = await axios.patch(
        "https://apimanga.mangasocial.online/user/setting/" +
          sessionStorage.getItem("user_id") +
          "/",
        { gender: userData.gender, date_of_birth: value }
      );
      if (res.status === 200) {
        alert("update successfull!");
        window.location.reload(true);
      } else {
        alert("Something wrong, please try again!");
      }
    } else if (type === "gender") {
      const res = await axios.patch(
        "https://apimanga.mangasocial.online/user/setting/" +
          sessionStorage.getItem("user_id") +
          "/",
        { gender: value }
      );
      if (res.status === 200) {
        alert("update successfull!");
        window.location.reload(true);
      } else if (res.status !== 200) {
        alert("Something wrong, please try again!");
      }
    } else if (type === "name") {
      const res = await axios.patch(
        "https://apimanga.mangasocial.online/user/setting/" +
          sessionStorage.getItem("user_id") +
          "/",
        { gender: userData.gender, name_user: value }
      );
      if (res.status === 200) {
        alert("update successfull!");
        window.location.reload(true);
      } else {
        alert("Something wrong, please try again!");
      }
    }
  };

  const getDataHistory = async () => {
    try {
      const response = await axios.get(
        `https://apimanga.mangasocial.online/log_user/${user_id}`
      );
      console.log("Data History:", response.data);

      const responseData = response.data;
      const novelArray = responseData.filter((item) => item.type === "novel");
      const mangaArray = responseData.filter((item) => item.type === "manga");

      setMangaDataHistory(mangaArray);
      setNovelDataHistory(novelArray);
      setDataHistory(response.data);
    } catch (error) {
      console.log("error save", error);
    }
  };
  console.log("Data History", dataHistory);
  const hideModal = (type) => {
    if (type === "introduction") {
      setOpenIntroduction(false);
      editUserData("introduction", data);
    } else if (type === "job") {
      setJob(false);
      editUserData("job", data);
    } else if (type === "gender") {
      setGender(false);
      editUserData("gender", gioitinh);
    } else if (type === "birth") {
      setBirth(false);
      editUserData("birth", data);
    } else if (type === "name") {
      setOpeName(false);
      editUserData("name", data);
    } else if (type === "pass") {
      setPass(false);
      // editUserData("name", data);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        "https://apimanga.mangasocial.online/user/" +
          sessionStorage.getItem("user_id")
      );
      setUserData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeAvatar = () => {
    inputRef.current.click();
  };
  const chosefile = (e) => {
    const file = e.target.files[0];
    axios
      .post(
        "https://apimanga.mangasocial.online/user/setting/" +
          sessionStorage.getItem("user_id") +
          "/",
        { gender: userData.gender, avatar_user: file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Update avatar successfull!");
          window.location.reload();
        } else {
          alert("Something Wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchUserData();
    getDataHistory();
  }, [user_id]);

  return (
    <div className="bg-[#000000] h-full">
      <div className="bg-[#000000] px-5">
        {/* <div className="flex flex-col items-center text-[#fff] relative">
          <img
            src="images\UserProfile\Rectangle 457.png"
            alt=""
            className="w-full h-[500px] bg-[#ffff] bg-cover rounded-b-[150px]"
          />
          <div className="h-60 w-full relative flex  items-center">
            <div className="flex absolute bottom-0">
              <div>
                <img
                  src={userData?.avatar_user}
                  alt="user avatar"
                  className="w-[312px] h-[312px]
                            rounded-full object-cover border-solid border-8"
                />
                <div
                  className="mx-auto flex justify-center h-6 w-6"
                  onClick={() => handleChangeAvatar()}
                >
                  <input
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    onChange={(e) => chosefile(e)}
                  />
                  <svg
                    alt="change avatar"
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-switch-camera text-slate-500 opacity-20 hover:opacity-70 cursor-pointer absolute bottom-10 rounded-lg"
                  >
                    <path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
                    <path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="m18 22-3-3 3-3" />
                    <path d="m6 2 3 3-3 3" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col font-normal text-[28px]  justify-center ml-6 mt-6">
                <div className="flex items-center">
                  {!openName ? (
                    <>
                      <h2 className="text-[#fff] text-[45px] font-semibold w-[90%]">
                        {userData?.name_user}
                      </h2>
                    </>
                  ) : (
                    <>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="type new name..."
                          className="rounded-lg text-black"
                          onChange={(e) => handleChangeData(e)}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-check ml-4 cursor-pointer"
                          onClick={() => hideModal("name")}
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
                <p className="self-start">
                  Joined {userData?.participation_time}
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="relative">
          <div
            className="bg-cover bg-center bg-white h-64 sm:h-96"
            style={{
              backgroundImage:
                "https://images.wallpapersden.com/image/download/starry-landscape-4k-cool-blue-moon_bW5tbG6UmZqaraWkpJRobWllrWdma2U.jpg",
            }}
          ></div>
          <div className="absolute bottom-0 min-[480px]:flex min-[480px]:items-center max-[480px]:left-1/2 min-[480px]:translate-y-[80%] transform max-[480px]:-translate-x-1/2 translate-y-[60%]">
            <div className="text-center flex-shrink-0 flex justify-center relative items-center">
              <img
                src={userData?.avatar_user}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-white"
              />
              <div
                className="mx-auto absolute top-[100%] flex justify-center h-6 w-6"
                onClick={() => handleChangeAvatar()}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={inputRef}
                  onChange={(e) => chosefile(e)}
                />
                <svg
                  alt="change avatar"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-switch-camera text-slate-500 opacity-20 hover:opacity-70 cursor-pointer absolute bottom-10 rounded-lg"
                >
                  <path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
                  <path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="m18 22-3-3 3-3" />
                  <path d="m6 2 3 3-3 3" />
                </svg>
              </div>
            </div>
            <div className="mt-0 ms-2 w-[99%] text-center">
              <h1 className="text-xl truncate text-[#fff] sm:text-xl font-bold">
                {userData?.name_user}
              </h1>
              <p className="text-gray-500 truncate text-normal">
                Joined {userData?.participation_time}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-[230px] w-[526px] bg-[#676767] text-[#fff] mb-24 rounded-lg">
          <div className="mx-6">
            <div>
              <h2 className="text-[36px] text-[#fff]">Setting</h2>
              <hr />
              <div className="flex">
                {!openIntroduction ? (
                  <p type="text" className="text-[24px] inline-block w-[90%]">
                    {userData?.introduction
                      ? userData.introduction
                      : "Update Introduction"}
                  </p>
                ) : (
                  <input
                    type="text"
                    placeholder="Type something..."
                    className="text-black w-[90%] h-28 rounded-sm"
                    onChange={(e) => handleChangeData(e)}
                  />
                )}

                {!openIntroduction ? (
                  <svg
                    onClick={() => showModalInput("introduction")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-pencil cursor-pointer ml-4"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-check ml-4 cursor-pointer"
                    onClick={() => hideModal("introduction")}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </div>
              <hr />
            </div>
            <div className="flex  my-[30px] items-center gap-2">
              <PiBagSimpleFill
                size={30}
                className="text-white"
                onClick={() => showModalInput("job")}
              />

              {!openJob ? (
                <div className="flex">
                  <p className="text-[22px] pl-2">
                    {userData?.job ? userData.job : "Update Job"}
                  </p>
                  <svg
                    onClick={() => showModalInput("job")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-pencil cursor-pointer ml-4"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  {/* <PiBagSimpleFill
                    size={30}
                    className="text-white"
                    onClick={() => showModalInput("job")}
                  /> */}
                </div>
              ) : (
                <div className="flex">
                  <input
                    type="text"
                    placeholder="type job..."
                    className="rounded-lg text-black"
                    onChange={(e) => handleChangeData(e)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-check ml-4 cursor-pointer"
                    onClick={() => hideModal("job")}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>

                  {/* <PiBagSimpleFill size={ 20}  onClick={() => hideModal("job")}/> */}
                </div>
              )}
            </div>
            <div className="flex mb-[30px] gap-2 items-center">
              <PiGenderIntersexFill size={33} className="text-white" />
              {!openGender ? (
                <div className="flex">
                  <p className="text-[22px] pl-2">
                    {userData?.gender || "Update Sex"}
                  </p>
                  <svg
                    onClick={() => showModalInput("gender")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-pencil cursor-pointer ml-4"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  {/* <PiGenderIntersexFill size={30} className="text-white" />; */}
                </div>
              ) : (
                <div className="flex">
                  <select
                    name="gender"
                    id="gender"
                    className="rounded-lg text-black"
                    onChange={() => handleGender()}
                  >
                    {userData.gender == "male" ? (
                      <>
                        <option value="male">male</option>
                        <option value="female">female</option>
                      </>
                    ) : (
                      <>
                        <option value="female">female</option>
                        <option value="male">male</option>
                      </>
                    )}
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-check ml-4 cursor-pointer"
                    onClick={() => hideModal("gender")}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex mb-[30px] gap-2 items-center">
              <FaTags size={30} className="text-white" />
              <p className="text-[22px] pl-2">Manga-Action-Mystery</p>
            </div>
            <div className="flex mb-[30px] gap-2 items-center">
              <FaBirthdayCake size={27} className="text-white" />

              {!openBirth ? (
                <div className="flex">
                  <p className="text-[22px] pl-2">
                    {userData?.date_of_birth
                      ? userData.date_of_birth
                      : "Date of birth has not been set"}
                  </p>
                  <svg
                    onClick={() => showModalInput("birth")}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-pencil cursor-pointer ml-4"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  {/* <FaBirthdayCake size={30} className="text-white" /> */}
                </div>
              ) : (
                <div className="flex">
                  <input
                    type="text"
                    placeholder="format dd/mm/yyyy"
                    className="text-black"
                    onChange={(e) => handleChangeData(e)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-check ml-4 cursor-pointer"
                    onClick={() => hideModal("birth")}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex mb-[30px] gap-2 items-center">
              <RiKey2Fill size={31} className="text-white" />

              {/* {!openPass ? ( */}
              <div className="flex">
                <p className="text-[22px] pl-2">Password</p>
                <svg
                  onClick={() => showModalInput("pass")}
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-pencil cursor-pointer ml-4"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
                {/* <FaBirthdayCake size={30} className="text-white" /> */}
                <Modal
                  title="Basic Modal"
                  open={isModalOpen}
                  onCancel={handleCancel}
                  footer={false}
                >
                  <Form
                    name="basic"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Current Password"
                      name="current_password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="New Password"
                      name="new_password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label="Confirm Password"
                      name="confirm_password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="me-4 !text-blue-500 hover:!text-white"
                      >
                        Submit
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleCancel}
                        className=" !text-blue-500 hover:!text-white"
                      >
                        Cancel
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
              {/* ) : (
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-check ml-4 cursor-pointer"
                    onClick={() => hideModal("pass")}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              )} */}
            </div>
          </div>
        </div>

        <div>
          <div className="text-6xl text-white mb-10">
            <Link to="">Novel Viewing History</Link>
          </div>
          <div className="mb-5">
            {/* <ComicRecent /> */}
            <NovelHistory data={novelDataHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
