import {Application, NextFunction, Request, Response} from "express";
import multer from "multer";
import {errorResponse} from "../utils/UtilityFunctions";
import {UploadError} from "./UploadError";
import {NotFoundError} from "./NotFoundError";
import {ValidationError} from "./ValidationError";
import {AuthenticationError} from "./AuthenticationError";
import {AuthorizationError} from "./AuthorizationError";

export function handleError(app: Application): any {

    // Handle 404
    app.use((req: Request, res: Response, next: NextFunction): void => next(new NotFoundError('Requested URL was not found!')))

    // Handle All Error
    app.use((err: any, req: Request, res: Response, next: NextFunction): any => {

        if (res.headersSent) {
            return next('There was an unhandled error!')
        }

        if (err) {

            if (err instanceof multer.MulterError || err instanceof UploadError) {
                const response = errorResponse(
                    422,
                    'Unprocessable Entry',
                    [{'msg': err.message || 'There is error while uploading file'}]
                )
                return res.status(422).send(response)
            }

            if (err instanceof NotFoundError) {
                const response = errorResponse(
                    404,
                    'Not Found',
                    [{'msg': err.message || 'Could not find what is requested'}]
                )
                return res.status(422).send(response)
            }

            if (err instanceof ValidationError) {
                const response = errorResponse(
                    err.status,
                    err.message,
                    err.errors
                )
                return res.status(400).send(response)
            }

            if (err instanceof AuthenticationError) {
                const response = errorResponse(
                    err.status,
                    err.message,
                    [{msg: 'Credentials do not match'}]
                )
                return res.status(403).send(response)
            }

            if (err instanceof AuthorizationError) {
                const response = errorResponse(
                    err.status,
                    err.message,
                    [{msg: 'Access denied'}]
                )
                return res.status(401).send(response)
            }
        }
    })
}
