function appendDateToFileName(file_name, uploadDate = new data()) {
  const dataPart = uploadDate.toIsSting().Split('T')[0].replace(/-/g, '');

  const newFileName = `${datePart}_${fileName}`;
  return newFileName;
}
