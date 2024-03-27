import { connect } from "@/dbconfig/dbConfig";
import User from "@/Models/User.Model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // validation
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not existed" },
        { status: 400 }
      );
    }
    console.log("User existed");
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //  ! exclimentory to assure that variable will come
    const token = JWT.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Logged IN success",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
