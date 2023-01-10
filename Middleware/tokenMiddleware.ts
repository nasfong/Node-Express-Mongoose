import jwt from 'jsonwebtoken'


export const tokenSign = ({ auth }) => {
  const token = jwt.sign({
    username: auth.username,
    id: auth._id,
    firstname: auth.firstname,
    lastname: auth.lastname,
    role: auth.role
  }, 'MERN', { expiresIn: '1h' })
  return token
}

export const tokenDecode = ({ token }) => {
  const decoded: any = jwt.verify(
    token,
    'MERN',
    { ignoreExpiration: true }
  )
  return decoded
}