const { successResponse, errorResponse } = require("../helpers/response");

const FindItemById = async (id, res, Model, text) =>{
    try {
        const data = await Model.findById(id);
        if (data) {
            successResponse(res,{statusCode: 200, message: `${text} found successfully`}, data)
        }
    } catch (error) {
        errorResponse(res, 404, `${text} not found! try again..`)
    }
}

module.exports = {FindItemById};