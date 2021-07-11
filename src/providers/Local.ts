/**
 * Primary file for your  API Server
 *
 * @author abhishek07456.cse <abhishek07456.cse@gmail.com>
 */


import express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
    public config(): any {
        dotenv.config({ path: path.join(__dirname, '../../.env') });
        const port = process.env.PORT || 8081;
        const url = process.env.APP_URL || `http://127.0.0.1:${port}`;
        const apiPrefix = 'api';
        const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
		const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';
        const DbUrl  = process.env.DB_URL  || 'mongodb://localhost:27017';
        const DbName = process.env.DB_NAME || 'sharetube';
        return {
            port,
            url,
            apiPrefix,
            maxUploadLimit,
            maxParameterLimit,
            DbUrl,
            DbName
        };
    }

    public init(_app: express.Application): express.Application {
        console.log("hello:")
        _app.locals.app = this.config();
        // console.log(_app.locals.app.port);
        return _app;
    }
}

export default new Locals;
