
import mongoose from 'mongoose';

export default async function() {
    try { 
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.hrwiy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
        // mongodb+srv://manger-parish:<password>@cluster0.hrwiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
        console.log('MongoDb connected\n');
    } catch (error) {
        console.log('MongoDb connect Failed');
        console.error(error);
        console.log('\n');
        
    }
}