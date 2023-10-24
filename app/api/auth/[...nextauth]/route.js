import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '@models/user'
import { connectToDB } from '@utils/database'

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
   ],
   callbacks: {
      async session({ session }) {
         const sessionUser = await User.search().first({
            email: session.user.email
         })
         session.user.id = sessionUser._id.toString()
         return session
      },
      async signIn({ profile }) {
         try {
            await connectToDB()
            const allData = await User.search().returnAll({})
            console.log('---all redis server Data---', allData)
            //check if user exists
            const userExists = await User.search().first({
               email: profile.email
            })
            console.log(userExists)
            //if not, create new user
            if(!userExists) {
               console.log('new user')
               await User.save({
                  email: profile.email,
                  username: profile.name.replace(" ","").toLowerCase(),
                  image: profile.picture
               })
            }
   
            return true
         } catch (error) {
            console.log(error)
            return false
         }
      }
   }
})

export { handler as GET, handler as POST }