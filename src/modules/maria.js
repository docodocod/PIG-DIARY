const mariadb = require('mariadb');

// 데이터베이스 연결 풀 생성
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'answlrl1',
    database: 'node_twitter'
});

async function getConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('데이터베이스 연결 성공!');
        return connection;
    } catch (err) {
        console.error('데이터베이스 연결 오류:', err);
        throw err;
    }
}

async function getSelection(select) {
    const connection = await getConnection();
    try {
        const results = await connection.query(select);
        console.log('쿼리 결과: ', results);
    } catch (err) {
        console.error('쿼리 오류: ', err);
    } finally {
        if (connection) {
            await connection.release(); // 연결 반환
        }
    }
}

// 쿼리 실행
export default {getConnection,getSelection};