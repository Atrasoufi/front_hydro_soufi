import { NextResponse } from "next/server";
import { apiUrl } from "../../../lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(apiUrl("/leads/api/consultation/"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body?.name ?? "",
        phone: body?.phone ?? "",
        email: body?.email ?? "",
        subject: body?.subject ?? "",
        message: body?.message ?? "",
      }),
      cache: "no-store",
    });

    const text = await response.text();
    let data: unknown = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text || null;
    }

    return NextResponse.json(data ?? {}, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { detail: "ارتباط با سرور انجام نشد. لطفاً دوباره تلاش کنید." },
      { status: 502 },
    );
  }
}
