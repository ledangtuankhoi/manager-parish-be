

import mongoose from 'mongoose'; 
const Schema = mongoose.Schema;

 
const Person = mongoose.Schema({
    position: {  // chưc danh
        type: String,  
        enum:[ 
            'chiefPriest', // cha xứ
            'vicePriest',// cha phó
            'monl', // thầy tu
            'soeur', // tu sĩ nữ
            'flock', // giáo dân
        ],
        default: 'flock' 
    },
    holyName :{type:  Schema.Types.ObjectId, default: null, ref:'holyname'}, //teen thánh
    name:{
        givenName: {type: 'string', default: null}, // tên đệm
        firstName: {type: 'string', default: null}, // tên 
    },
    sex: {
        type: String,  
        enum:['male','female'],
        default: 'male' ,
    },
    dateOfBirth: {type:Date, default: '01/01/1900 00:00:00'}, //  
    // place_of_cirth varchar
    mon:{type:'ObjectId', default: null},
    dad:{type:'ObjectId', default: null},
    identityCard: String, // CMND
    subParish: {type:'ObjectId', default: null}, // id giao ho
    parish: {type:'ObjectId', default: null}, // id giáo xứ
  
    baptism: { // id bí tích rửa tội
        date: {type:Date, default: null}, // ngày 
        location: {type:String, default: null}, // địa điểm  
        priest: {type:String, default: null}, // linh mục  
        patron: { type: 'ObjectId', default: null}, 
    }, 
    confirmation: { // id bí tích thêm sưc
        date: {type:Date, default: null}, // ngày 
        location: {type:String, default: null}, // địa điểm  
        priest: {type:String, default: null}, // linh mục  
        patron: { type: 'ObjectId', default: null}, 
    },
    eucharist: { // rước lễ lần đầu
        date: {type:Date, default: null}, // ngày 
        location: {type:String, default: null}, // địa điểm  
        priest: {type:String, default: null}, // linh mục  
        patron: { type: 'ObjectId', default: null}, // người đỡ đầu
    },
    holyOrder: { // bí tích truyền chức thánh
        date: {type:Date, default: null}, // ngày 
        location: {type:String, default: null}, // địa điểm  
        priest: {type:String, default: null}, // linh mục  
        patron: { type: 'ObjectId', default: null}, // người đỡ đầu
    }, 
     
    // thông tin khác
    family: {type:'ObjectId', default: null},// id gia đình
    eduLevel: {
        type: String,
        enum: [
            '12/12',
            'câp 1',
            'câp 2',
            'câp 3',
            'Cao đẳng',
            'Đại học',
            'tiến sĩ',
        ],
        default: 'câp 1',
    }, // trình độ văn hóa
    isEdu: {type:String, default: false}, // còn học
    qualification: {type:String, default: null}, // trình độ chuyên môn
    foreignLanguage: {type:String, default: null}, // ngoại ngữ
    job: {type:String, default: null}, // nghề nghiệp
    ethnic: {type:String, default: 'Kinh'}, // dân tộc
    numberPhone: {type:String, default: null}, //
    email: {type:String, default: null},
    address: {type:String, default: null},
    note: {type:String, default: null}, // ghi chú
},{
    timestamps: true
})

export default mongoose.model('Persons',Person)
// export default mongoose.model('Persons',Person)