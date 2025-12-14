// Type definitions for the application
// Note: With PostgreSQL, we use string types instead of enums
// Role types: "STUDENT" | "ADMIN"
// Status types: "DRAFT" | "PUBLISHED" | "SOLD" (for lessons/items)
// Transaction status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"

export type UserRole = "STUDENT" | "ADMIN";
export type LessonStatus = "DRAFT" | "PUBLISHED";
export type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
