import { cookies } from "next/headers";

export async function verifySession() {
  const sessionCookie = cookies().get("auth_session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/auth/me`, {
      headers: {
        Cookie: `auth_session=${sessionCookie}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      cookies().delete("auth_session");
      return null;
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    return null;
  }
}
