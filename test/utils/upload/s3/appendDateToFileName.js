function appendDateToFileName(fileName, uploadDate = new Date()) {
  const year = uploadDate.getFullYear();
  const month = String(uploadDate.getMonth() + 1).padStart(2, '0');
  const day = String(uploadDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}${month}${day}`;
  const newFileName = `${formattedDate}_${fileName}`;
  return newFileName;
}

module.exports = appendDateToFileName;
