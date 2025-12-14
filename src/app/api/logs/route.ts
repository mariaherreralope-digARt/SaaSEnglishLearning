import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const logs = await prisma.log.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const data = logs.map((log) => ({
      key: log.id,
      user: log.user.name,
      action: log.action.replace(/_/g, " "),
      timestamp: new Date(log.createdAt).toLocaleString(),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json([], { status: 500 });
  }
}
