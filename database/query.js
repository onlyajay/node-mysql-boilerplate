const connection = require('./connection');

exports.getRows = async (query) => {
    return connection.query(query);
}

exports.insertRow = async (query, object) => {
    const result = await connection.query(query, object);
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

exports.deleteRow = async (query) => {
    const result = await connection.query(query);
    return !!(result && result.affectedRows > 0);
}