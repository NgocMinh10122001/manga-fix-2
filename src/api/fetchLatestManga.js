import React from "react";

const fetchLatestManga = (index) => {
  const [data, setData] = useState([]);
  const sv = useSelector((state) => state.server.sv);
  const getData = async () => {
    if (sv === 4 || sv === 9 || sv === 11 || sv === 12) {
      const response = await prodApis.server_novel(sv);
      console.log("manga data", response);
      setData(response.data[index].data);
    } else {
      const response = await prodApis.server(sv);
      console.log("manga data", response);
      setData(response.data[index].data);
    }
  };


  return data;
};

export default AxiosLatestManga;
