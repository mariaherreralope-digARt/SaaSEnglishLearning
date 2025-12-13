import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.userProgress.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.level.deleteMany();
  await prisma.log.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Cleared existing data");

  // Create users
  const adminPassword = await hash("admin123", 12);
  const studentPassword = await hash("student123", 12);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@learnenglish.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  const student = await prisma.user.create({
    data: {
      name: "John Student",
      email: "student@learnenglish.com",
      passwordHash: studentPassword,
      role: "STUDENT",
    },
  });

  console.log("✅ Created users (admin@learnenglish.com / admin123, student@learnenglish.com / student123)");

  // Create levels (CEFR)
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

  console.log("✅ Created CEFR levels (A1, A2, B1)");

  // Create lessons for A1
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

  // Create lesson for A2
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

  console.log("✅ Created sample lessons");

  // Create exercises for Lesson 1
  await prisma.exercise.create({
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

  // Create exercises for Lesson 2
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

  // Create exercises for Lesson 3
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

  console.log("✅ Created sample exercises");

  // Create some progress for the student
  await prisma.userProgress.create({
    data: {
      userId: student.id,
      lessonId: lesson1.id,
      completed: true,
      score: 20,
      timeSpent: 900, // 15 minutes
    },
  });

  await prisma.userProgress.create({
    data: {
      userId: student.id,
      lessonId: lesson2.id,
      completed: false,
      score: 10,
      timeSpent: 300, // 5 minutes
    },
  });

  console.log("✅ Created sample progress");

  // Create activity logs
  await prisma.log.create({
    data: {
      userId: admin.id,
      action: "USER_REGISTERED",
      metadata: JSON.stringify({
        role: "ADMIN",
        timestamp: new Date().toISOString(),
      }),
    },
  });

  await prisma.log.create({
    data: {
      userId: student.id,
      action: "USER_REGISTERED",
      metadata: JSON.stringify({
        role: "STUDENT",
        timestamp: new Date().toISOString(),
      }),
    },
  });

  await prisma.log.create({
    data: {
      userId: student.id,
      action: "LESSON_COMPLETED",
      metadata: JSON.stringify({
        lessonId: lesson1.id,
        score: 20,
        timestamp: new Date().toISOString(),
      }),
    },
  });

  console.log("✅ Created activity logs");
  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📚 Test Accounts:");
  console.log("   Admin: admin@learnenglish.com / admin123");
  console.log("   Student: student@learnenglish.com / student123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
