import {Router} from 'express';
import { AuthController } from '../controller/authController';
class authRoute{
    public router:Router=Router();
    constructor(){
        this.getRoutes();
    }
    getRoutes(){
        this.router.get('/',AuthController.welcome);
    }
}
export default new authRoute().router;