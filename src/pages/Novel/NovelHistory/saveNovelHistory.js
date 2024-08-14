function saveNovelHistory(chapterData, infoNovel) {
  const { chapter_name, content, title } = chapterData;
  const { poster, id_manga } = infoNovel[0];
  if (id_manga.endsWith("/")) {
    id_manga = id_manga.slice(0, -1);
  }
  const parts = url.split("/");
  const novelId = parts[parts.length - 1];

  const history = JSON.parse(localStorage.getItem("novelHistory")) || [];
  // Kiểm tra nếu mục đã tồn tại
  const existingEntry = history.find(
    (entry) => entry.novelId === novelId && entry.chapter_name === chapter_name
  );
  if (!existingEntry) {
    history.push({
      poster,
      chapter_name,
      title,
      novelId,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("novelHistory", JSON.stringify(history));
    console.log(`Lưu lịch sử đọc novel: ${novelId} - Chương: ${chapter_name}`);
  } else {
    console.log(`Lịch sử đọc đã tồn tại: ${novelId} - Chương: ${chapter_name}`);
  }
}

export default saveNovelHistory;
