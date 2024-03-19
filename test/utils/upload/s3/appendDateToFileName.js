function appendDateToFileName(fileName, uploadDate = new data()) {
  const dataPart = uploadDate.toIsSting().Split('T')[0].replace(/-/g, '');

  const newFileName = `${dataPart}_${fileName}`;
  return newFileName;
}

module.exports = appendDateToFileName;
