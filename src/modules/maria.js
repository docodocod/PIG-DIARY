// maria.js 모듈에서 getSelection 함수 내보내기
import mariadb from 'mariadb';
import dotenv from 'dotenv';

const Config = dotenv.config().parsed;

console.log(Config);

// 포트 원래 없었나 만들어놨던거같은데 너가 다지워서 헷갈림
const pool = mariadb.createPool({
    host: Config.DB_HOST,
    port: 3306, // 포트 정보 추가
    user: Config.DB_USER,
    password: Config.DB_PASSWORD,
    database: Config.DB_DATABASE,
    connectionLimit: 5, // 연결 풀에 포함될 최대 연결 수
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


export async function getSelection(select) {
    const connection = await getConnection();
    console.log(connection);
    try {
        const results = await connection.query(select);
        console.log('쿼리 결과: ', results);
        return results; // 결과 반환
    } catch (err) {
        console.error('쿼리 오류: ', err);
        throw err;
    } finally {
        if (connection) {
            await connection.release(); // 연결 반환
            await connection.end();
        }
    }
}

export async function postUpdate(update){
    const connection=await getConnection();
    console.log(connection);
    try {
        const results = await connection.query(update);
        console.log("업데이트 성공 여부:", results);
        return results;
    }catch(err){
        console.error("업데이트 실패: ",err);
        throw err;
    } finally{
        if (connection){
            await connection.release();
            await connection.end();
        }
    }
}

export async function postInsert(insert){
    const connection=await getConnection();
    console.log(connection);
    try {
        const results = await connection.query(insert);
        console.log("삽입 성공:", results);
        return results;
    }catch(err){
        console.error("삽입 실패: ",err);
        throw err;
    } finally{
        if (connection){
            await connection.release();
            await connection.commit();
            await connection.end();
        }
    }
}
