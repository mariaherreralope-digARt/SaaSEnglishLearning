import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      include: { level: true },
      orderBy: { order: "asc" },
    });

    const data = lessons.map((lesson) => ({
      key: lesson.id,
      title: lesson.title,
      level: lesson.level.name,
      category: lesson.category,
      duration: lesson.duration,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json([], { status: 500 });
  }
}
