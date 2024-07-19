"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTH_COOKIE_HTTP_ONLY,
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_SECURE,
} from "../constants";

export async function getAuthUser() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (token) {
    return verifyUser(token);
  }
}

export async function verifyUser(token) {
  if (token === "123") {
    return { ok: true, user: { name: "John Doe" } };
  }
}

export async function login(email, password) {
  if (email && password) {
    cookies().set(AUTH_COOKIE_NAME, "123", {
      httpOnly: AUTH_COOKIE_HTTP_ONLY,
      secure: AUTH_COOKIE_SECURE,
      maxAge: AUTH_COOKIE_MAX_AGE,
      path: "/",
    });

    return { ok: true, user: { name: "John Doe", token: "123" } };
  }
}

export async function register(email, password) {
  if (email && password) {
    cookies().set(AUTH_COOKIE_NAME, "123", {
      httpOnly: AUTH_COOKIE_HTTP_ONLY,
      secure: AUTH_COOKIE_SECURE,
      maxAge: AUTH_COOKIE_MAX_AGE,
      path: "/",
    });
    return { ok: true, user: { name: "John Doe", token: "123" } };
  }
}

export async function logout() {
  cookies().delete(AUTH_COOKIE_NAME);
  redirect("/");
}
