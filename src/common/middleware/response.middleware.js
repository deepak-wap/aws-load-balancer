// src/common/middleware/response.middleware.js
import chalk from 'chalk';

const responseMiddleware = (req, res, next) => {
    let data = null;

    if(res.data === undefined){
        data = undefined
    } else if (res.data === null){
        data === null
    } else {
        data = res.data
    }
    const code = res.statusCode !== undefined ? res.statusCode : 200;
    const message = res.message || 'Success';

    // Colored log
    console.log(chalk.green(`[${req.method}] ${req.originalUrl} - ${message} | Status Code: ${code}`));

    res.status(code).json({
        success: true,
        message,
        data
    });
};

export default responseMiddleware;