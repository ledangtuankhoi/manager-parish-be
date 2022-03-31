import { mongoose } from 'mongoose';
 


const UserSchema = new  mongoose.Schema({
    username: {type: 'String', unique: true, required: true},
    password: {type: 'String',  required: true, minimum: 4},
    refreshAccessToken: {type: 'String' }
    
},{
    timestamps: true
})

const User = mongoose.model('Users',UserSchema)
export default User