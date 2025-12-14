import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("🌱 Starting database seed...");

    // Clear existing data
    await prisma.userProgress.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.level.deleteMany();
    await prisma.log.deleteMany();
    await prisma.user.deleteMany();

    // Create users
    const adminPassword = await hash("admin123", 12);
    const teacherPassword = await hash("teacher123", 12);
    const studentPassword = await hash("student123", 12);

    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@learnenglish.com",
        passwordHash: adminPassword,
        role: "ADMIN",
      },
    });

    const teacher = await prisma.user.create({
      data: {
        name: "Sarah Teacher",
        email: "teacher@learnenglish.com",
        passwordHash: teacherPassword,
        role: "TEACHER",
      },
    });

    const student1 = await prisma.user.create({
      data: {
        name: "John Student",
        email: "student@learnenglish.com",
        passwordHash: studentPassword,
        role: "STUDENT",
      },
    });

    const student2 = await prisma.user.create({
      data: {
        name: "Emma Wilson",
        email: "emma.wilson@learnenglish.com",
        passwordHash: studentPassword,
        role: "STUDENT",
      },
    });

    const student3 = await prisma.user.create({
      data: {
        name: "Michael Chen",
        email: "michael.chen@learnenglish.com",
        passwordHash: studentPassword,
        role: "STUDENT",
      },
    });

    const student4 = await prisma.user.create({
      data: {
        name: "Sofia Rodriguez",
        email: "sofia.rodriguez@learnenglish.com",
        passwordHash: studentPassword,
        role: "STUDENT",
      },
    });

    // Create levels
    const levelA1 = await prisma.level.create({
      data: {
        name: "A1",
        description: "Beginner - Can understand and use familiar everyday expressions",
        order: 1,
      },
    });

    const levelA2 = await prisma.level.create({
      data: {
        name: "A2",
        description: "Elementary - Can communicate in simple and routine tasks",
        order: 2,
      },
    });

    const levelB1 = await prisma.level.create({
      data: {
        name: "B1",
        description: "Intermediate - Can deal with most situations while traveling",
        order: 3,
      },
    });

    // Create lessons
    const lesson1 = await prisma.lesson.create({
      data: {
        title: "Greetings and Introductions",
        description: "Learn how to greet people and introduce yourself in English",
        content: "In this lesson, you'll learn basic greetings like 'Hello', 'Good morning', and how to say 'My name is...'",
        levelId: levelA1.id,
        category: "Speaking",
        order: 1,
        duration: 15,
      },
    });

    const lesson2 = await prisma.lesson.create({
      data: {
        title: "Numbers 1-100",
        description: "Master counting from 1 to 100 in English",
        content: "Learn to count, tell time, and use numbers in everyday situations.",
        levelId: levelA1.id,
        category: "Vocabulary",
        order: 2,
        duration: 20,
      },
    });

    const lesson3 = await prisma.lesson.create({
      data: {
        title: "Present Simple Tense",
        description: "Understanding and using the present simple tense",
        content: "Learn how to form and use the present simple tense for habits, facts, and routines.",
        levelId: levelA1.id,
        category: "Grammar",
        order: 3,
        duration: 25,
      },
    });

    const lesson4 = await prisma.lesson.create({
      data: {
        title: "Past Simple Tense",
        description: "Learn to talk about past events and actions",
        content: "Master the past simple tense with regular and irregular verbs.",
        levelId: levelA2.id,
        category: "Grammar",
        order: 1,
        duration: 30,
      },
    });

    const lesson5 = await prisma.lesson.create({
      data: {
        title: "Making Requests and Offers",
        description: "Learn polite ways to ask for things and make offers",
        content: "Practice using 'Can I...?', 'Could you...?', 'Would you like...?' in everyday situations.",
        levelId: levelA2.id,
        category: "Speaking",
        order: 2,
        duration: 25,
      },
    });

    // Create exercises
    const ex1_1 = await prisma.exercise.create({
      data: {
        lessonId: lesson1.id,
        question: "How do you greet someone in the morning?",
        type: "MULTIPLE_CHOICE",
        correctAnswer: "Good morning",
        options: JSON.stringify(["Good morning", "Good night", "Goodbye", "See you later"]),
        points: 10,
        order: 1,
      },
    });

    await prisma.exercise.create({
      data: {
        lessonId: lesson1.id,
        question: "Complete: 'My name ___ John.'",
        type: "FILL_BLANK",
        correctAnswer: "is",
        points: 10,
        order: 2,
      },
    });

    await prisma.exercise.create({
      data: {
        lessonId: lesson2.id,
        question: "What comes after nineteen?",
        type: "MULTIPLE_CHOICE",
        correctAnswer: "twenty",
        options: JSON.stringify(["eighteen", "twenty", "thirty", "twelve"]),
        points: 10,
        order: 1,
      },
    });

    await prisma.exercise.create({
      data: {
        lessonId: lesson3.id,
        question: "Choose the correct form: 'She ___ to school every day.'",
        type: "MULTIPLE_CHOICE",
        correctAnswer: "goes",
        options: JSON.stringify(["go", "goes", "going", "went"]),
        points: 10,
        order: 1,
      },
    });

    await prisma.exercise.create({
      data: {
        lessonId: lesson3.id,
        question: "Complete: 'I ___ English every day.'",
        type: "FILL_BLANK",
        correctAnswer: "study",
        points: 10,
        order: 2,
      },
    });

    const ex4_1 = await prisma.exercise.create({
      data: {
        lessonId: lesson4.id,
        question: "Choose the past tense: 'I ___ to the park yesterday.'",
        type: "MULTIPLE_CHOICE",
        correctAnswer: "went",
        options: JSON.stringify(["go", "goes", "went", "going"]),
        points: 10,
        order: 1,
      },
    });

    // Create user progress
    await prisma.userProgress.createMany({
      data: [
        { userId: student1.id, lessonId: lesson1.id, completed: true, score: 20, timeSpent: 900 },
        { userId: student1.id, lessonId: lesson2.id, completed: false, score: 10, timeSpent: 300 },
        { userId: student1.id, lessonId: lesson3.id, completed: true, score: 20, timeSpent: 1200 },
        { userId: student2.id, lessonId: lesson1.id, completed: false, score: 10, timeSpent: 450 },
        { userId: student3.id, lessonId: lesson1.id, completed: true, score: 20, timeSpent: 800 },
        { userId: student3.id, lessonId: lesson2.id, completed: true, score: 10, timeSpent: 1000 },
        { userId: student3.id, lessonId: lesson3.id, completed: true, score: 20, timeSpent: 1500 },
        { userId: student3.id, lessonId: lesson4.id, completed: false, score: 10, timeSpent: 600 },
        { userId: student4.id, lessonId: lesson1.id, completed: true, score: 20, timeSpent: 700 },
        { userId: student4.id, lessonId: lesson2.id, completed: true, score: 10, timeSpent: 950 },
        { userId: student4.id, lessonId: lesson3.id, completed: true, score: 20, timeSpent: 1400 },
        { userId: student4.id, lessonId: lesson4.id, completed: true, score: 10, timeSpent: 1800 },
        { userId: student4.id, lessonId: lesson5.id, completed: false, score: 0, timeSpent: 200 },
      ],
    });

    // Create activity logs
    await prisma.log.createMany({
      data: [
        {
          userId: admin.id,
          action: "USER_REGISTERED",
          metadata: JSON.stringify({ role: "ADMIN", timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() }),
        },
        {
          userId: teacher.id,
          action: "USER_REGISTERED",
          metadata: JSON.stringify({ role: "TEACHER", timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() }),
        },
        {
          userId: student1.id,
          action: "USER_REGISTERED",
          metadata: JSON.stringify({ role: "STUDENT", timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() }),
        },
        {
          userId: admin.id,
          action: "USER_LOGIN",
          metadata: JSON.stringify({ timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() }),
        },
        {
          userId: student1.id,
          action: "LESSON_COMPLETED",
          metadata: JSON.stringify({ lessonId: lesson1.id, lessonTitle: "Greetings and Introductions", score: 20, timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() }),
        },
        {
          userId: student2.id,
          action: "EXERCISE_ATTEMPTED",
          metadata: JSON.stringify({ exerciseId: ex1_1.id, lessonId: lesson1.id, correct: true, timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() }),
        },
        {
          userId: teacher.id,
          action: "LESSON_CREATED",
          metadata: JSON.stringify({ lessonId: lesson5.id, lessonTitle: "Making Requests and Offers", timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() }),
        },
      ],
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      data: {
        users: 6,
        levels: 3,
        lessons: 5,
        exercises: 6,
        userProgress: 13,
        logs: 7,
      },
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    await prisma.$disconnect();
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
