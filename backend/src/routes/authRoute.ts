import {Router} from 'express';
import { AuthController } from '../controller/authController';
import { AuthValidator } from '../validators/authValidator';
import { GlobalMiddleware } from '../middlewares/globalMiddleware';
class authRoute{
    public router:Router=Router();
    constructor(){
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes(){
        this.router.get('/',AuthController.welcome);
        this.router.get('/logout',AuthController.logoutUser);
        this.router.get('/user',GlobalMiddleware.CheckAuth,AuthController.getUser);
    }
    postRoutes(){
        this.router.post('/register',AuthValidator.registerUser(),GlobalMiddleware.CheckValidation,AuthController.registerUser);
        this.router.post('/login',AuthValidator.loginUser(),GlobalMiddleware.CheckValidation,AuthController.loginUser);
    }
}
export default new authRoute().router;