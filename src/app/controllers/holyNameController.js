import HolyName from "../../models/HolyName.js";

export function delete_all(req, res, next) {
  HolyName.deleteMany({})
    .then(() => {
      console.log('delete_all HolyName successfully');
      return res.status(200).json({ success: true, message: 'delete_all HolyName successfully' });
    })
    .catch(err => {
      console.log('delete_all HolyName error: ');
      return res.json({ success: false, message: 'delete_all HolyName error:', code: err.code });
    });
}

export async function create(req, res, next) {
  const req_holy_name = req.body;
  if (!req_holy_name)
    return res.json({ success: false, message: 'request undefined', code: 403 });
  const newHolyName = new HolyName({
    name: req_holy_name.name,
    saintsDay: req_holy_name.saintsDay,
    description: req_holy_name.description
  });

  console.log(newHolyName);
  await newHolyName.save()
    .then(HolyName => {
      console.log("create HolyName successfully");
      return res.status(201).json(HolyName);

    })
    .catch(err => {
      res.json({ success: false, message: "create HolyName failed", code: err.code });
      return console.log(err);
    });
}



export async function detailOne(req, res, next) {
  const id = req.params.id;
  const req_holyName = req.body;
  var update_holyName = {};
  if (!id || !req_holyName)
    return res.json({
      success: false,
      message: "holyName not exist",
      code: 403,
    });

  HolyName.findById(id)
    .then(function (holyName) {
      if (!holyName) {
        return res.json({
          success: false,
          message: "holyName not exist",
          code: 403,
        });
      } 
      console.log("get one holyName successfully");
      return res.status(200).json(holyName);
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