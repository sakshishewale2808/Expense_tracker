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
export {postTransaction}