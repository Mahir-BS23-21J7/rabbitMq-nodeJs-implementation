import workerpool from "workerpool";
import {grantToken, comparePassword, jwtSign} from "../../business/services/AuthService";

workerpool.worker({
    grantToken,
    comparePassword,
    jwtSign
})
