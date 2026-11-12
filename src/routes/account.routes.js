const express=require("express")
const authMiddleware=require("../middleware/auth.middleware")
const accountController=require("../Controllers/account.controller")





const router=express.Router()



router.post("/",authMiddleware.authMiddleware,accountController.createAccountController)



/**
 * -GET  /api/accounts/
 * Get all accounts of the loggedin user
 * Protected Route 
 * 
 */
router.get("/",authMiddleware.authMiddleware,accountController.getUserAccountController)

/**
 * -GET /api/accounts/balance/:accountId
 */

router.get("/balance/:accountId",authMiddleware.authMiddleware,accountController.getAccountBalanceController)




module.exports=router