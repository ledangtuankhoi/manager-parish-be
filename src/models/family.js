const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// rửa tội
const Baptism =  new Schema({ 
    name: String, 
    // place_of_cirth varchar
    man:{type:ObjectId},
    wonam:{type:ObjectId},

    numberSpuse: {type: Number}, // sô hôn phối
    dateSpuse: Date, // ngày hôn phối
    placeOfSpuse: {type: String}, // nơi hôn phối
    priest: {type:ObjectId}, // id linh muc làm chứng
    person_1: {type:ObjectId}, // người làm chúng 1
    person_2: {type:ObjectId}, // người làm chúng 2
    status: {type:String}, // tính trạng hôn nhân
    subParish: {type:ObjectId}, // id giáo họ
    numberPopulation: Number, // số nhân khẩu của gia đình
    type_family: { // gia đình thuộc diện 
        enum: [
            'normal', // bình thường
            'poor', // nghèo
            'nearPoor', // cận nghèo
            'shortOfManpower', // neo đơn
            'defect', // khuyết tật
        ]
    },
    type_marriage: {  // tình trạng hôn nhân 
        enum: [
            'legal', //hợp pháp
            'regularize', // hợp thức hóa
            'standard', // chuẩn
            'infidel', // không theo phép đạo
            'separate', //ly thân
            'divorce', //ly dị
            'takeDown', //đã được tháo gỡ
        ]
    },
    number_phone: String,
    address: String,
    noteL: String,
    photo_family: String,
},{
    timestamps: true
})

module.exports = mongoose.model('User',User)