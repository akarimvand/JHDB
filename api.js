// api.js

// این تابع داده‌ها را از فایل متنی واکشی می‌کند
async function fetchData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/akarimvand/JHDB/main/JHDB_AG.txt"
  );
  const text = await response.text();

  // تبدیل داده‌های متنی به آرایه‌ای از اشیاء
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const headers = lines[0].split("\t");
  const rows = lines.slice(1).map((line) => {
    const values = line.split("\t");
    return headers.reduce((record, header, index) => {
      record[header] = values[index] || "";
      return record;
    }, {});
  });

  return rows;
}

// این تابع داده‌ها را بر اساس ISO_NO فیلتر می‌کند
export async function getRecordsByIsoNo(isoNo) {
  const data = await fetchData();
  return data.filter((row) => row.ISO_NO === isoNo);
}
