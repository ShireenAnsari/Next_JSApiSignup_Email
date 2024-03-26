import User from '@/Models/User.Model';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
export const sendEmail=async({email,emailType,userId}:any)=>{
    try {

  const hashedToken=   await bcryptjs.hash(userId.toString(),10)
      // TODO:configure mail for usage
      if(emailType==='VERIFY'){
        
        await User.findByIdAndUpdate(userId,
          {VerifyToken:hashedToken,
            VerifyTokenExpiry:Date.now()+3600000

  }
          )
      }
      else if(emailType==='RESET')
      {
        await User.findByIdAndUpdate(userId,
          {forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry:Date.now()+3600000

  }
          )
       }
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });
          const mailOptions={
            from: 'shiri@gmail.com',
            to: email, // list of receivers
            subject:emailType==='VERIFY'?"Verify your Email":"Reset your Password", 
            html: "<b>Hello world?</b>", // html body
          }
  const mailResponse=   await transporter.sendMail(mailOptions)
  return mailResponse
          
        
    } catch (error:any) {
throw new Error(error.message)
        
    }
}