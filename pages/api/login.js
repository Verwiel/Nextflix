import jwt from "jsonwebtoken"
import { magicAdmin } from '@/lib/magic-server'
import { isNewUser, createNewUser } from "../../lib/db/hasura"
import { setTokenCookie } from "../../lib/cookies"

export default async function login(req, res) {
  try {
    // Grab the DID token from our headers and parse it
    const didToken = magicAdmin.utils.parseAuthorizationHeader(
      req.headers.authorization,
    )
    // Validate the token
    magicAdmin.token.validate(didToken)

    const metadata = await magicAdmin.users.getMetadataByToken(didToken)
    // Create JWT
    const jwtToken = jwt.sign(
      {
        ...metadata,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${metadata.issuer}`,
        },
      },
      process.env.JWT_SECRET
    )

    // Check if User exists in DB and create if they dont
    const isNewUserQuery = await isNewUser(jwtToken, metadata.issuer)
    isNewUserQuery && (await createNewUser(jwtToken, metadata))
    setTokenCookie(jwtToken, res)

    res.status(200).json({ authenticated: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
