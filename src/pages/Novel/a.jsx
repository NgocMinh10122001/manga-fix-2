<div
  className=" w-[100%] h-full bg-cover bg-center bg-no-repeat md:flex md:gap-30 px-[14px] pt-[14px] md:px-[141px] md:pt-[48px] gap-10"
  style={{
    background: "black",
  }}
>
  <div className="relative">
    <img
      src={chapterDetail[0]?.poster}
      alt=""
      className=" h-[203px] w-[330px]  max-[435px]:w-hidden max-[435px]:h-auto max-[435px]:w-[100%] md:h-[649px] md:w-[433px] bg-cover object-cover bg-center rounded-[8px]"
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
  <div className="flex flex-col gap-[8px] md:gap-5">
    <div className="flex flex-col gap-[8px] md:gap-[40px]">
      {/* name && tương tác */}
      <div className="flex flex-col gap-[8px] md:gap-[21px]">
        <div className="font-semibold text-[14px] leading-[20px] md:text-[45px] md:leading-[52px] text-white">
          {chapterDetail[0]?.title}
        </div>
        {/* tương tác */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-medium text-[11px] leading-[16px]  md:font-semibold md:text-[22px] md:leading-[28px] text-white ">
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
            <div>{`${chapterDetail[0]?.chapters.length} chapter `} </div>
          </div>
        </div>
      </div>

      {/* server && button */}
      <div className="flex flex-col gap-[40px]">
        {/* button */}
        <div className="flex  gap-5">
          <button className="  hover:text-white p-[8px]  rounded-[12px] md:px-[52px] md:py-[26px]  bg-[#FF2020]  text-white md:rounded-[67px] ">
            <div className="font-bold text-[12px] leading-[16px] md:text-[36px] md:leading-[44px] ">
              Read now
            </div>
          </button>
          <button className=" p-[8px]  rounded-[12px] text-black md:px-[52px] md:py-[26px]   bg-[#496EF1]  md:text-white md:rounded-[67px]">
            <div className="font-bold text-[12px] leading-[16px] md:text-[36px] md:leading-[44px] flex gap-1 md:gap-3 ">
              <div> My List </div>
              <img
                src="/images/ChapterPage/uil_plus.png"
                alt=""
                className="h-[20px] w-[20px] md:h-[48px] md:w-[48px] bg-cover object-cover "
              />
            </div>
          </button>
          <button className=" p-[8px]  rounded-[12px] md:px-[52px] md:py-[26px] bg-[#F45F17]  text-white md:rounded-[67px]">
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
          <div className="flex flex-wrap items-center justify-normal gap-3">
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
      </div>
      <div className="flex flex-col gap-[8px] md:gap-[40px]">
        {/* info chapter */}
        <div className="flex flex-col gap-[8px] md:gap-[16px]">
          <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex items-center gap-2">
            Author:
            <div className="text-white">{chapterDetail[0]?.author}</div>
          </div>
          <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex items-center gap-2">
            Artist:
            <div className="text-white">Some Name</div>
          </div>
          <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex flex-wrap items-center gap-2">
            Genres:
            <div className="text-white">{chapterDetail[0]?.categories}</div>
          </div>
          <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex items-center gap-2">
            Age:
            <div className="text-white">18+</div>
          </div>
          {/* desc */}
          <div className="">
            <p className="w-[223px] h-auto text-[11px] font-medium leading-[16px]  md:w-[1000px] md:font-normal md:text-[24px] md:leading-[36px] text-white">
              {showFullDescription ? fullDescription : truncatedDescription}
              {!showFullDescription && (
                <button onClick={() => setShowFullDescription(true)}>
                  <div className=" underline  underline-offset-4">See All</div>
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>;
