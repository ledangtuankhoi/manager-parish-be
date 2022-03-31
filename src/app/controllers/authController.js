import User from "../../models/user.js";
 import { compareSync, hashSync } from "bcrypt";
 import jwt from 'jsonwebtoken' 

export async function test_verify_token(req, res) {
  console.log(req.body);
  return res.json("asd");
}
export const updateRefreshAccessTokenForClient =  async (req, res) =>{
  // res.json(req.body);
  const refreshAccessToken = req.body.refresh_token;
  if (!refreshAccessToken)
    return res.sendStatus(403);

  User.findOne({ refreshAccessToken: refreshAccessToken })
    .then(user => { 
      if (!user) {
        console.log("user not exist");
        return res.sendStatus(403);
      } 

      try {
        jwt.verify(refreshAccessToken, process.env.REFRESH_ACCESS_TOKEN_SECRET);
        const token = registerToken(user._id);
        updateRefreshAccessTokenForDb(user._id, token.refreshAccessToken);
        return res.sendStatus(200);
      } catch (error) {
        console.log(error);
        return res.sendStatus(403);
      }
    });
}
export function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.sendStatus(403);
  }

  User.findOne({ username: username })
    .then(function (user) {
      if (!user) {
        console.log({ success: false, message: "Username not exist" });
        return res.json({ success: false, message: "Username not exist" });
      }

      if (compareSync(password, user.password) === false) {
        // return
        return res.json({
          success: false,
          message: "Password wrong",
        });
      }

      const id = user._id;

      const accessToken = registerToken(id);
      updateRefreshAccessTokenForDb(id, accessToken.refreshAccessToken);
      // return
      return res.json({
        success: true,
        message: "Login Success",
        accessToken,
      });
    })
    .catch(next);
}


export async function register(req, res, next) {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.sendStatus(403);
  }

  try {
    const hashPass = hashSync(password, 10);
    const user = new User({
      username: username,
      password: hashPass, 
    }); 
    await user.save();
    return res.json({ success: true, message: "register success" });
  } catch (err) {
    if (err.code == 11000) {
      console.log(err);
      return res.json({
        success: false,
        message: "Username already exists",
        code: 11000,
      });
    }
    console.log(err);
    return res.json({ success: false, message: "register failed" });
  }
}
export async function deleteAll(req, res, next) {
  try {
    await User.deleteMany({});
    res.json({ success: "true", message: "DELETE ALL success" });
  } catch (error) {
    console.error(error);
  }
}

function registerToken({ ...user }) {
  // craete JWT
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 10,
  });

  const refreshAccessToken = jwt.sign(
    { user },
    process.env.REFRESH_ACCESS_TOKEN_SECRET,
    {
      expiresIn: 60,
    }
  );
  return { accessToken, refreshAccessToken };
}

const updateRefreshAccessTokenForDb = async (id, refreshAccessToken)=> {
  if (!id || !refreshAccessToken)
    return console.log("id, refreshAccessToken not MISSING");

  try {
    const user = await User.findOne({ _id: id });
    user.refreshAccessToken = refreshAccessToken;
    await user.save();
  } catch (err) {
    return console.log(err);
  }
}
