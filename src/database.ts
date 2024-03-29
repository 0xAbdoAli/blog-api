import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NODE_ENV
} = process.env

const Client = new Pool({
  host: POSTGRES_HOST,
  database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT as string)
})

//test connection to database
const test_db_connection = async (): Promise<void> => {
  try {
    const connection = await Client.connect()
    const sqlQuery = 'select now();'
    const result = await connection.query(sqlQuery)
    console.log(`[+] Connected [+] ${result.rows[0].now}`)
    connection.release()
  } catch (error) {
    console.error(error)
  }
}
test_db_connection()

export default Client
