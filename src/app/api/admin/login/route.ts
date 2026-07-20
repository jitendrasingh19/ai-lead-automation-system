import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {email, password} = await request.json();

    // Example login logic (replace with actual authentication)
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
        });

        response.cookies.set("admin-token", process.env.ADMIN_TOKEN!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;
    }

  return NextResponse.json(
    {
      success: false,
      message: "Invalid email or password",
    },
    { status: 401 }
  );
}
