// StorageService.ts
import multer from "multer";
import { uploadFileToS3 } from "../../../utils/s3/uploadFileToS3";
import { saveMetadataToDb } from "../../../utils/db/saveMetadataToDb";
import appendDateToFileName from "../../../utils/s3/appendDateToFileName";

export class StorageService {
  private upload;

  constructor() {
    this.upload = multer({ dest: "uploads/" }); // 파일 임시 저장 폴더 지정
  }

  getUploader() {
    return this.upload.single("file");
  }

  async handleFileUpload(req, res) {
    console.log("/api/upload 엔드포인트에 요청이 도착했습니다.");
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: "파일이 전송되지 않았습니다." });
    }

    const datedFileName = appendDateToFileName(file.originalname); // 파일명에 날짜 추가
    try {
      // S3에 파일 업로드
      const s3Url = await uploadFileToS3(
        file.path,
        datedFileName,
        file.mimetype
      );
      console.log("S3에 파일이 업로드되었습니다:", s3Url);

      // 데이터베이스에 메타데이터 저장
      await saveMetadataToDb(datedFileName, file.size, file.mimetype, s3Url);
      res.json({ message: "파일이 성공적으로 업로드되었습니다.", url: s3Url });
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
      res.status(500).json({ error: "파일 업로드 중 오류가 발생했습니다." });
    }
  }
}
