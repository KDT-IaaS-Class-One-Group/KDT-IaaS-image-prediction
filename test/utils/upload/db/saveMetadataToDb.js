// CommonJS 스타일의 모듈 시스템을 사용할 경우
const mysql = require('mysql2/promise');
const dbConfig = require('./dbConfig'); // dbConfig 모듈 불러오기

async function saveMetadataToDb(file_name, file_size, content_type, s3_url) {
    const connection = await mysql.createConnection(dbConfig);
    
    const query = `
        INSERT INTO file_metadata (file_name, file_size, content_type, s3_url) 
        VALUES (?, ?, ?, ?)
    `;
    
    try {
        const [results] = await connection.execute(query, [file_name, file_size, content_type, s3_url]);
        console.log('Metadata saved to DB:', results);
    } catch (error) {
        console.error('Error saving metadata to DB:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

module.exports = saveMetadataToDb;
