import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const progressRecords = await prisma.userProgress.findMany({
      include: {
        user: true,
        lesson: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    const data = progressRecords
      .filter((record) => record.lesson !== null)
      .map((record) => ({
        key: record.id,
        student: record.user.name,
        lesson: record.lesson!.title,
        status: record.completed ? "Completed" : "In Progress",
        score: record.score,
        timeSpent: `${Math.floor(record.timeSpent / 60)} min`,
      }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json([], { status: 500 });
  }
}
