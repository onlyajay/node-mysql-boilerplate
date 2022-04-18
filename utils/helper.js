const PAGE_SIZE = 20;
const PAGE_NO = 1;
const OR_AND = "AND";
exports.getPageNo = async (req) => {
    let pageNo = PAGE_NO;
    if (req.query && req.query.pageNo) {
        pageNo = parseInt(req.query.pageNo);
    }
    return pageNo;
}

exports.getPageSize = async (req) => {
    let pageSize = PAGE_SIZE;
    if (req.query && req.query.pageSize) {
        pageSize = parseInt(req.query.pageSize);
    }
    return pageSize;
}

exports.getOrAnd = async (req) => {
    let orAnd = OR_AND;
    if (req.query && req.query.orAnd) {
        orAnd = req.query.orAnd;
    }
    return orAnd;
}