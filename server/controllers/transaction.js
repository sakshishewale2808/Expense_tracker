import Transaction from "./../models/Transaction.js"
const postTransaction = async(req,res)=>{
    const {title,amount,category,type,user} = req.body;

    const transaction = new Transaction({
        title,
        amount,
        category,
        type,
        user
    });


    try{
        const savedTransaction = await transaction.save();
        res.json({
            success:true,
            message:"Transaction successfull",
            date:savedTransaction
        })
    }
    catch (e){
        res.json({
            success:true,
            message:e.message,
            date:null 
        })
    }

}
const getTransaction = async(req,res)=>{
    const {userId} = req.query;
    const user = await User.findById(userId)
    if(!user){
        return res.json({
            success:false,
            message:"User not found",
            data:null
        })
    }
    const transactions = await Transaction.find({user:userId})
    res.json({
        success:true,
        message:"transaction fetched successfully",
        data:transactions
    })

}
export {postTransaction,getTransaction}