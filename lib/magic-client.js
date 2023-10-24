import { Magic, RPCError, RPCErrorCode } from 'magic-sdk'


const createMagic = (key) => {
  return (
    typeof window !== "undefined" &&
    new Magic(key)
  )
}

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY)

// magic.auth 
// magic.auth.loginWithMagicLink({ email, redirectURI }) 
// magic.auth.loginWithSMS 
// magic.auth.loginWithCredential 
// magic.auth.loginWithEmailOTP 
// magic.auth.updateEmailWithUI 

// magic.user 
// magic.user.getIdToken 
// magic.user.generateIdToken 
// magic.user.getInfo 
// magic.user.isLoggedIn 
// magic.user.logout 
// magic.user.showSettings 
