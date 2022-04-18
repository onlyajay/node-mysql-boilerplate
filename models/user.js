const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');

exports.find = async (offset, pageSize) => {
    const query = `SELECT * FROM USERS LIMIT ${offset}, ${pageSize}`;
    return getRows(query);
}

exports.findById = async (id) => {
    const query = `SELECT * FROM USERS WHERE USER_ID = ${id}`;
    return getRows(query);
}

exports.insert = async (object) => {
    const query = `INSERT INTO USERS SET ?`;
    const id = await insertRow(query, object,"insert");
    return id ? this.findById(id) : null;
}

exports.update = async (id, object) => {
    const updateKeys = [];
    const updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE USERS SET ? WHERE USER_ID = ${id}`;
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findById(id) : null;
}

exports.remove = async (id) => {
    const query = `DELETE FROM USERS WHERE USER_ID = ${id}`;
    return deleteRow(query);
}

exports.count = async () => {
    const query = `SELECT count(*) AS TotalCount FROM USERS`;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT * FROM USERS WHERE LOWER(user_first_name) LIKE '%${key}%' OR LOWER(user_last_name) LIKE '%${key}%' LIMIT ${offset}, ${pageSize}`;
    return getRows(query);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) AS TotalCount FROM USERS WHERE LOWER(user_first_name) LIKE '%${key}%' OR LOWER(user_last_name) LIKE '%${key}%'`;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

const getWhereCondition = async (columnArray, orAnd) => {
    let whereCondition = "";
    let count = 0;
    for (const col of columnArray) {
        const columnName = col["columnName"];
        const columnLogic = col["columnLogic"];
        const columnValue = col["columnValue"];
        if(columnLogic === "LIKE"){
            whereCondition = whereCondition + ` ${count > 0 ? orAnd : ""} LOWER(${columnName}) ${columnLogic} '%${columnValue.toLowerCase()}%'`;
        }else {
            whereCondition = whereCondition + ` ${count > 0 ? orAnd : ""} LOWER(${columnName}) ${columnLogic} '${columnValue.toLowerCase()}'`;
        }
        count++;
    }
    return whereCondition;
}

exports.searchByColumn = async (offset, pageSize, columnArray, orAnd) => {
    const whereCondition = await getWhereCondition(columnArray, orAnd);
    const query = `SELECT * FROM USERS WHERE ${whereCondition} LIMIT ${offset}, ${pageSize}`;
    return getRows(query);
}

exports.searchByColumnCount = async (columnArray, orAnd) => {
    const whereCondition = await getWhereCondition(columnArray, orAnd);
    const query = `SELECT count(*) AS TotalCount FROM USERS WHERE ${whereCondition}`;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}