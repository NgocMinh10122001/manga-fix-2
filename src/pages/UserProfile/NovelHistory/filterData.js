const filterNovel_Manga = (data, filter, customRange) => {
  const now = new Date();
  let filteredData = data.data;
  var d = new Date();
  switch (filter) {
    case "1_week":
      filteredData = data.data.filter(
        (manga) =>
          new Date(manga.readAt) >= new Date(now.setDate(now.getDate() - 7))
      );
      break;
    case "1_month":
      filteredData = data.data.filter(
        (manga) =>
          new Date(manga.readAt) >= new Date(now.setMonth(now.getMonth() - 1))
      );
      break;
    case "3_months":
      filteredData = data.data.filter(
        (manga) =>
          new Date(manga.readAt) >= new Date(now.setMonth(now.getMonth() - 3))
      );
      break;
    case "5_months":
      filteredData = data.filter(
        (manga) =>
          new Date(manga.readAt) >= new Date(now.setMonth(now.getMonth() - 5))
      );
      break;
    case "6_months":
      filteredData = data.data.filter(
        (manga) =>
          new Date(manga.readAt) >= new Date(now.setMonth(now.getMonth() - 6))
      );
      break;
    case "1_year":
      filteredData = data.data.filter(
        (manga) =>
          new Date(manga.readAt) >=
          new Date(now.setFullYear(now.getFullYear() - 1))
      );
      break;
    case "custom":
      if (customRange.startDate && customRange.endDate) {
        const start = new Date(customRange.startDate);
        const end = new Date(customRange.endDate);
        filteredData = data.data.filter((manga) => {
          const readAt = new Date(manga.readAt);
          return readAt >= start && readAt <= end;
        });
      }
      break;
    default:
      break;
  }

  return filteredData;
};

export default filterNovel_Manga;
