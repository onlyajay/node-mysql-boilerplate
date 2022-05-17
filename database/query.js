const connection = require('./connection');

exports.getRows = async (query, params) => {
    return connection.query(query, params);
}

exports.insertRow = async (query, params) => {
    const result = await connection.query(query, params);
    if (result && result.affectedRows > 0) {
        return result.insertId;
    } else {
        return 0;
    }
}

exports.updateRow = async (query, valueArray) => {
    const result = await connection.query(query, valueArray);
    return !!(result && result.affectedRows > 0);
}

exports.deleteRow = async (query, params) => {
    const result = await connection.query(query, params);
    return !!(result && result.affectedRows > 0);
}