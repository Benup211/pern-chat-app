import { body } from "express-validator";

export class AuthValidator {
    static registerUser() {
        return [
            body("username")
                .notEmpty()
                .withMessage("Username is required")
                .isLength({ min: 5 })
                .withMessage("Username must be at least 5 characters long"),
            body("fullName")
                .notEmpty()
                .withMessage("fullName is required"),
            body("password")
                .notEmpty()
                .withMessage("Password is required")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
                )
                .withMessage(
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                ),
            body("confirmPassword")
                .notEmpty()
                .withMessage("Confirm Password is required")
                .custom((value, { req }) => value === req.body.password)
                .withMessage(
                    "Confirm Password must be the same as the Password"
                ),
            body("gender")
                .notEmpty()
                .withMessage("Gender is required")
                .isIn(["male", "female"])
                .withMessage('Gender must be either "male" or "female"'),
        ];
    }
    static loginUser(){
        return[
            body('username')
            .notEmpty()
            .withMessage("Username is required"),
            body('password')
            .notEmpty()
            .withMessage("Password is required"),
        ]
    }
}
