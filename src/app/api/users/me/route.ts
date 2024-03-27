import {connect} from '@/dbconfig/dbConfig'
import { GetData_from_token } from '@/helpers/getdatafromToken'
import User from '@/Models/User.Model'
import {NextRequest,NextResponse} from 'next/server'

connect()
export async function POST(request:NextRequest){
    try {
      const userId= await GetData_from_token(request)
  const user=  await  User.findOne({_id:userId}).select('-password -username')
  if(!user)
  {
    return NextResponse.json({error:'Error fetching user'},{status:500})
  }
  return NextResponse.json({
    message:"User found",
    data:user
  })

// extract data from token

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}