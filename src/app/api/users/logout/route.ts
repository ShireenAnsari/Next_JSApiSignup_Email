import { connect } from "@/dbconfig/dbConfig";
import User from "@/Models/User.Model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
connect();
export async function GET(request: NextRequest) {
    try {

   const response=     NextResponse.json({
            message:"Logout successfully",
            success:true
        })
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        return response

        
    } catch (error:any) {
        console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}