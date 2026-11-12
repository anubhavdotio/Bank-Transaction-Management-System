const Router  =require("express")
const authMiddleware=require("../middleware/auth.middleware")
const transactionController=require("../Controllers/transaction.controller")




const transactionRoutes=Router();


//post  post/api/transaction
//  create a new transaction

transactionRoutes.post("/",authMiddleware.authMiddleware,transactionController.createTransaction)

/**
 * -POST /api/transactions/initial-funds
 * -Create initial funds transaction from system user
 */

transactionRoutes.post("/system/initial-funds",authMiddleware.authSystemUserMiddleware,transactionController.createInitialFundsTransaction)

module.exports =transactionRoutes