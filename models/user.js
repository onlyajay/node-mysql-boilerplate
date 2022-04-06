const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');

exports.find = async (offset, pageSize) => {
    const query = `SELECT * FROM USERS LIMIT ${offset}, ${pageSize}`;
    return getRows(query, "find");
}

exports.findById = async (id) => {
    const query = `SELECT * FROM USERS WHERE USER_ID = ${id}`;
    return getRows(query, "findById");
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
    const result = await getRows(query, "count");
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}