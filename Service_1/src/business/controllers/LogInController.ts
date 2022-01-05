import { Request, Response, NextFunction } from "express";
import { grantToken } from "../services/AuthService";
import {successResponse} from "../../utils/UtilityFunctions";
import {emitEvent} from "../../events/emitters/SampleEventEmitter";
import { dispatchEmailJob, emailQueue } from "../../jobs/EmailJob";

// System Admin LogIn
export async function logInSystemAdmin(req: Request, res: Response, next: NextFunction): Promise<any> {

    emitEvent('SystemAdminLogInAttempt', req.body)

    const { email, password } = req.body
    const result = await grantToken(email, password)

    if(result instanceof Error) {
        return next(result)
    }

    // await dispatchEmailJob({email: email})

    const response = successResponse(
        200,
        'Login Success!',
        [{"auth-23-token": result}]
    )

    return res.status(200).send(response)
}

// Company Admin LogIn
export async function logInCompanyAdmin() {

}
