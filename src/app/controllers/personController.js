import Person from "../../models/person.js";
import HolyName from "../../models/holy_name.js";
import rexQueryReq from '../../utils/rexQueryReq.js'

//func test
//  DELETE ALL PERSON
//
// [DELETE] /person/detele-all
// xóa tất cả các model trong persons
// đây là func test giúp cho việc xóa collection trong DB nhanh hơn
// @return true => status 200 and message
// @return false => status error code and message err
//
export function delete_all(req, res, next) {
  Person.deleteMany({})
    .then(() => {
      console.log("delete_all person successfully");
      return res.status(200).json({
        success: true,
        message: "delete_all person successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        success: false,
        message: err.message,
        code: err.code,
      });
    });
}

//
//  CEATE ONE PERSON
//
// [POST] /person/
// tạo mới 1 person model trong collecton.persons
// mẫu requset body trong file /requestRestClient/person "### create one"
// @param req_person nhận request.body từ clinet, kiểu obeject giống model.person
// @return true => status 201 and object person
// @return false => status error code and message err
//
export async function createOne(req, res, next) {
  const req_person = req.body;
  var newPerson = {};
  if (!req_person)
    return res.json({
      success: false,
      message: "request undefined",
      code: 403,
    });

  newPerson = createObjectPerson(req_person); 
  await newPerson
    .save()
    .then((person) => {
      console.log("create person successfully");
      return res.status(201).json(person);
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "create person failed",
        code: err.code,
      });
      return console.log(err);
    });
}

//
//  UPDATE ONE PERSON
//
// [PUT] /person/:id
// cập nhật 1 person bằng id truyền req.parmas model trong collecton.persons
// @param req_person nhận request.body từ clinet
// @param id nhận request params id từ  url
// @param update_person object.person đã được chỉnh sửa
// @return true => status 200 and object person
// @return false => status 403 code and message err
//
export async function updateOne(req, res, next) {
  const id = req.params.id;
  const req_person = req.body;
  var update_person = {};
  if (!id || !req_person)
    return res.json({
      success: false,
      message: "request undefined",
      code: 403,
    });

  update_person = Object.assign(
    update_person,
    createObjectPerson(req_person)._doc
  );
  delete update_person._id;

  Person.findByIdAndUpdate(id, update_person)
    .then(function (person) {
      if (!person) {
        return res.json({
          success: false,
          message: "Id not exist",
          code: 403,
        });
      }
      console.log("update person successfully");
      return res.status(200).json(person);
    })
    .catch(function (err) {
      console.log(err);
      return res.json({
        success: false,
        message: err.message,
        code: 403,
      });
    });
}

//
//  DELETE ONE PERSON
//
// [DELETE] /person/:id
// xóa 1 model.person bằng 1 id truyền qua req.pramas
// @param id nhận request params id từ  url
// @return true => status 200
// @return false => status  code and message err
//
export function deleteOne(req, res, next) {
  const id = req.params.id;
  if (!id)
    return res.status(404).json({
      success: false,
      message: "request undefined",
      code: 404,
    });

  Person.findByIdAndDelete(id)
    .then((person) => {
      if (!person) {
        return res.status(404).json({
          success: false,
          message: "Id not exist",
          code: 404,
        });
      }
      console.log("delete person successfully");
      return res.status(200);
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        success: false,
        message: err.message,
        code: 403,
      });
    });
}

//
//  INDEX
//
// [GET] /person/
//  lấy tất cả các person trong collection.persons
// @typeSort
// @columnSort
// @return true => status 200 ,message, cout persons, array object poerson
// @return false => status  code and message err
//
export async function index(req, res) {
  // console.log thời gian thực hiện func
  // bắt đầu tính thời gian console.time('taskA')
  // kết thúc tình thời gian console.timeEnd('taskA')
  // console.time('name-task-went-see-time')
  console.time("task index");
 
  const {status, key, value} = rexQueryReq(req.query) 
  console.log('rexQueryReq(req.query) '); 
  if( status == false ){
    return res.json({
      success: false,
      message: `${key}: ${value} not input`
    });
  }

  // seleted field model
  var seletedField =  req.query.seletedField || process.env.SELETED_FIELD;

  // type asc/desc, column with sort 
  var typeSort =   req.query.typeSort || process.env.TYPE_SORT;
  var columnSort = req.query.columnSort || process.env.COLUMN_SORT; 
  

  // pagination
  var limitPage = req.query.limitPage ||  process.env.LIMIT_PAGE;
  var skipPage = req.query.skipPage || process.env.SHIPPING_PAGE;

  // nếu không có req.query thì set mặt định sort
  // If a string is passed, it must be a space delimited list of path names.
  // The sort order of each path is ascending unless the path name is
  //  prefixed with - which will be treated as descending.   
  if(typeSort == 'asc') typeSort = '';
  if(typeSort == 'desc') typeSort = '-';

  // sort example: -updateAt => sort updatedAt with type descending
  Person.find({}, seletedField)  
    .sort(`${typeSort}${columnSort}`) // sắp xếp
    .skip(limitPage * skipPage) //
    .limit(limitPage) // giới hạn dữ liệu ra
    .then((person) => {
      if (!person)
        return res.json({
          success: false,
          message: "person null",
        });

      // console.log("list person id");
      // person.forEach((value) => {
      //   console.log(value._id.toString());
      // }); 

      console.log("person.length %s", person.length);
      return res.status(200).json({
        count: person.length, 
        person: person,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        success: false,
        message: err.message,
        code: err.code,
      });
    });

  // kết thúc tình thời gian console.timeEnd('taskA')
  console.timeEnd("task index");
}

//
//  DETAIL ONE POERSON
//
// [GET] /person/:id
//  lấy tất cả các person trong collection.persons
// @param id nhận request params id từ  url
// @return true => status 200 and object poerson
// @return false => status  code and message err
//
export async function detailOne(req, res, next) {
  const id = req.params.id;
  if (!id)
    return res.json({
      success: false,
      message: "person not exist",
      code: 403,
    });

  try {
    // Populate là quá quá trình tự động thay thế các
    //  paths trong documents gốc bằng cách documents trong các documents khác.
    //  Chúng ta có thể gộp một hay nhiều document, objects hay tất cả object từ một query.
    const person = await Person.findById(id).populate("holyName");
    return res.status(200).json(person);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, message: error.message, code: error.code });
  }
}

// func test
//  SEARCH POERSON EXACT
//
// [GET] /person/search-exact
// lấy các query được chuyền vào url để tìm kiếm
// các tên của query phải khớp với các field của model.person
// @param id nhận request params id từ  url
// @return true => status 200 and object poerson
// @return false => status  code and message err
//
export async function searchExact(req, res, next) {
  var key = {};
  const searchQuery = req.query;

  if (!searchQuery) {
    return res.status(403).json({
      success: false,
      message: "key missing",
    });
  }

  key = searchQuery;

  Person.find(key)
    .then((person) => {
      if (!person) {
        return res.status(404).json({
          success: false,
          message: "person null",
        });
      }
      return res.status(200).json({
        count: person.length,
        person: person,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        success: false,
        message: "person null",
      });
    });
}

//
//  SEARCH POERSON QUICK
//
// [GET] /person/search-quick
// lấy các query được chuyền vào url để tìm kiếm
// các tên của query phải khớp với các field của model.person
// @param stTime tình thời gian bắt đầu func search
// @param reqSearchQuery nhận request query id từ  url,
//  tên của query phải giống với field của model.person
// @return true => status 200, time func, cout person, array object person
// @return false => status  code and message err
//
export async function searchQuick(req, res, next) {
  var stTime = Date.now();
  const reqSearchQuery = req.query.q;
  if (!reqSearchQuery) {
    return res.status(403).json({
      success: false,
      message: "key missing",
    });
  }

  // search Regex tìm kiếm từng chữ cái có trong
  var searchQueryRexExp = {
    $or: [
      { job: { $regex: reqSearchQuery.trim() } },
      { eduLevel: { $regex: reqSearchQuery.trim() } },
      { position: { $regex: reqSearchQuery.trim() } },
      { sex: { $regex: reqSearchQuery.trim() } },
      { identityCard: { $regex: reqSearchQuery.trim() } },
      { isEdu: { $regex: reqSearchQuery.trim() } },
      { qualification: { $regex: reqSearchQuery.trim() } },
      { foreignLanguage: { $regex: reqSearchQuery.trim() } },
      { ethnic: { $regex: reqSearchQuery.trim() } },
      { numberPhone: { $regex: reqSearchQuery.trim() } },
      { email: { $regex: reqSearchQuery.trim() } },
      { address: { $regex: reqSearchQuery.trim() } },
      { note: { $regex: reqSearchQuery.trim() } },
    ],
  };

  console.log("searchQueryRexExp");
  // console.info(searchQueryRexExp);
  console.log(JSON.stringify(searchQueryRexExp, null, " "));
  var searchQueryText = {
    $text: { $search: reqSearchQuery, $language: "en" },
  };

  try {
    const searchData = await Person.find(searchQueryRexExp);

    console.log("searchData.length: %s,", searchData.length);
    return res.status(200).json({
      count: searchData.length,
      time: (Date.now() - stTime) / 1000,
      searchData: searchData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

//
//  DELETE MULTIPLE PERSON
//
// [DELETE] /person/delete-multiple
// Xóa các person theo id của peron
// các id của person được truyền request.body.ids
// mẫu name req.body trong file /requestRestClient/person "### detele multiple"
// @param listIds nhận request body tên ids
// @return true => status 200 and status.deletedCount
// @return false => status  code and message err
//
export function deleteMultiple(req, res) {
  var listIds = req.body.ids;
  if (!listIds)
    return res.json({ success: false, message: "Request undefined" });

  Person.deleteMany({ _id: listIds })
    .then((status) => {
      return res.status(200).json({
        success: true,
        count: status.deletedCount,
        message: `Detele ${status.deletedCount} person successfully`,
      });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ success: false, message: err.message, code: err.code });
    });
  //  res.json({success: true, count: 2, message: `Detele ${2} successfully`});
}

//
//  CREAT OBJECT PERSON FROM REQUSET BODY
//
// tạo mới model.person chuyền vào cái request body
// xử lý các req.body.properties không giống với field model.person
// gán các req.body.properties vào đúng với tên field của các model.person
// @param person lưu các giá trị của person
// @return true =>  new model.person
// @return false  => false
//
function createObjectPerson(req_person) {
  var person = {};
  if (!req_person) return false; 
  
  person = new Person(req_person);

  person.name = {
    givenName: req_person.givenName,
    firstName: req_person.firstName,
  };

  person.baptism = {
    date: req_person.baptism_date,
    location: req_person.baptism_location,
    priest: req_person.baptism_priest,
    patron: req_person.baptism_patron,
  };
  person.confirmation = {
    date: req_person.confirmation_date,
    location: req_person.confirmation_location,
    priest: req_person.confirmation_priest,
    patron: req_person.confirmation_patron,
  };
  person.eucharist = {
    date: req_person.eucharist_date,
    location: req_person.eucharist_location,
    priest: req_person.eucharist_priest,
    patron: req_person.eucharist_patron,
  };
  person.holyOrder = {
    date: req_person.holyOrder_date,
    location: req_person.holyOrder_location,
    priest: req_person.holyOrder_priest,
    patron: req_person.holyOrder_patron,
  };
  return person;
}
