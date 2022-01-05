import { Application, NextFunction, Request, response, Response } from 'express'
import { UploadError } from '../errors/UploadError'
import { routes as apiRoutes }  from './Api'
import { routes as authRoutes }  from './Auth'
import { handleError as handleRouteError } from '../errors/HandleError'

export async function initiateRoutes(app: Application): Promise<void> {

    // Auth Routes
    authRoutes(app)
    // Api Routes
    apiRoutes(app)
    // ErrorHandling
    handleRouteError(app)
}
