import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.SERVER_URL || "http://localhost:5500";

export async function GET() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth_session")?.value;

  if (!authCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const backendRes = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: {
        Cookie: `auth_session=${authCookie}`,
      },
      credentials: "include",
    });

    if (!backendRes.ok) {
      cookieStore.delete("auth_session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await backendRes.json();

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
