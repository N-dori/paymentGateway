import mongoose from "mongoose";

const connectMongoDB = async () => {
    try{
        const URI :string|undefined = process.env.MONGODB_URI
        if (URI){
            await mongoose.connect(URI)
            console.log('connected to mongo_Db');

        }
        
    }
    catch(err){
        console.log(err , 'could not connect to mongo ');
        
    }
}
export default connectMongoDB