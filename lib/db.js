import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: "203.150.225.102",
    database: "roadassothaicom",
    user: "roadassothaicom",
    password: "V^k81as35",
  });
  try {
    const [result] = await dbconnection.execute(query, values);
    dbconnection.end();
    return result;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}


/* import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: "103.30.127.13",
    database: "lawyer_production",
    user: "lawyer_production",
    password: "mQclhf94bT$Lfw3&",
  });
  try {
    const [result] = await dbconnection.execute(query, values);
    dbconnection.end();
    return result;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
} */
