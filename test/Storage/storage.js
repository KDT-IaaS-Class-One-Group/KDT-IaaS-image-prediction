const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const { uploadFileToS3 } = require('../../Storage/uploadFileToS3'); 
const { saveMetadataToDb } = require('../../Utils/saveMetadataToDb'); 
const appendDateToFileName = require('../../Utils/appendDateToFileName'); 

const app = express();
const port = 5555;

app.post('/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const datedFileName = appendDateToFileName(file.originalname); // 파일명에 업로드 날짜 추가
    try {
        // S3에 파일 업로드
        const s3Url = await uploadFileToS3(file.path, datedFileName, file.mimetype);
        console.log('File uploaded to S3:', s3Url);

        // 데이터베이스에 메타데이터 저장
        await saveMetadataToDb(file.originalname, file.size, file.mimetype, s3Url, new Date());
        res.json({ message: 'File uploaded successfully', url: s3Url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
