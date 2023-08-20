// maria.js 모듈에서 getSelection 함수 내보내기
import mariadb from 'mariadb';
import dotenv from 'dotenv';


const Config = dotenv.config({ path: "./config/.env.app" }).parsed;

const pool = mariadb.createPool({
    host: Config.DB_HOST,
    port: Config.DB_PORT, // 포트 정보 추가
    user: Config.DB_USER,
    password: Config.DB_PASSWORD,
    database: Config.DB_DATABASE,
    connectionLimit: 100, // 연결 풀에 포함될 최대 연결 수
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


export async function Select(query) {
    const connection = await getConnection();
    try {
        const results = await connection.query(query);
        return results; // 결과 반환
    } catch (err) {
        throw err;
    } finally {
        if (connection) {
            await connection.release(); // 연결 반환
            await connection.end();
        }
    }
};

export async function Update(query){
    const connection=await getConnection();
    console.log(connection);
    try {
        const results = await connection.query(query);
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

export async function Insert(query){
    const connection=await getConnection();
    console.log(connection);
    try {
        const results = await connection.query(query);
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
};

export async function Delete(query){
    const connection = await getConnection();
    console.log(connection);
    try {
        const results = await connection.query(query);
        console.log("삭제 성공:", results);
        return results;
    } catch (error) {
        console.error("삭제 실패:", error);
        throw error;
    } finally {
        if (connection) {
            await connection.release();
            await connection.commit();
            await connection.end();
        }
    }
};


