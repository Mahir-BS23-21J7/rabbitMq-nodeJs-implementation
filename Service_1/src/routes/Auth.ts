import { Application, Router } from 'express'
import { upload } from '../packageSettings/multer/Settings';
import * as RegistrationController from '../business/controllers/RegistrationController'
import * as LogInController from '../business/controllers/LogInController'
import { catchValidationErrors } from '../middlewares/ValidationErrors';
import { companyAdminRegistrationValidator } from '../validators/RegistrationValidators';
import { companyAdminLogInValidator } from '../validators/LogInValidators';
import { passIfLoggedIn, blockIfLoggedIn } from '../middlewares/Auth';

const router = Router();

router.post('/register/company', [
    blockIfLoggedIn,
    upload.fields([{
        name: 'company_logo',
        maxCount: 1
    }]), ...companyAdminRegistrationValidator, catchValidationErrors
], RegistrationController.registerCompanyAdmin)

router.post('/login/company-admin', [
    blockIfLoggedIn,
    ...companyAdminLogInValidator, catchValidationErrors
], LogInController.logInCompanyAdmin)

router.post('/login/system-admin', [
    blockIfLoggedIn,
    ...companyAdminLogInValidator, catchValidationErrors
], LogInController.logInSystemAdmin)

//Export All Routes
export function routes(app: Application): any {
    app.use('/api/auth', router)
}


