import jwt from 'jsonwebtoken'

export default  function verifyToken(req, res, next) {
    const header = req.header('Authorization')
    const token = header && header.split(' ')[1]
    
    if(!token) return res.sendStatus(401)

    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
         console.log(decoded);
        next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(403)
    }
}