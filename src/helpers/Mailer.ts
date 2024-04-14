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
       var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "4034ad8c22695a",
          pass: "78745f041e19ff"
        }
      });
          const mailOptions={
            from: 'shiri@gmail.com',
            to: email, // list of receivers
            subject:emailType==='VERIFY'?"Verify your Email":"Reset your Password", 
            html: `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to ${emailType==='VERIFY'?'verify your email':'reset your password'} or copy and paste the link below in your browser <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
          }
  const mailResponse=   await transport.sendMail(mailOptions)
  return mailResponse
          
        
    } catch (error:any) {
throw new Error(error.message)
        
    }
}