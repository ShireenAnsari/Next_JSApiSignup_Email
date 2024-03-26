import {connect} from '@/dbconfig/dbConfig'
import User from '@/Models/User.Model'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs' 
import { sendEmail } from '@/helpers/Mailer'
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {username,email,password}=reqBody
        // validation
        console.log(reqBody);
        const existedUser=await User.findOne({email})
       if(existedUser)
       {
        return NextResponse.json({error:'User already exist'},{status:400})
       }
       const salt=await bcryptjs.genSalt()
       const hashedpassword=await bcryptjs.hash(password,salt)
      const newUser= new User({
        username,
        email,
        password:hashedpassword
       })
      const SavedUser= await newUser.save();
      console.log(SavedUser);
    //   send verification email
    await sendEmail({email,emailType:'VERIFY',userId:SavedUser?._id})

        return NextResponse.json({
            message:'User registered successfully',
            success:true,
            SavedUser
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}