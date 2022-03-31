import mongoose from 'mongoose';
delete mongoose.connection.models['holyname'];
const HolyNameSchema =  new mongoose.Schema({
    name: {type: 'String', unique: true, required: true}, // tên thánh
    saintsDay: {type: Date, required: true, default: '01/01/01'}, // ngày lễ bổn mạng
    description: {type: 'String'}
},{
    timestamps: true
})
 
export default mongoose.model('holyname',HolyNameSchema) 