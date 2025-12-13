import { UserRole, ItemStatus, TransactionStatus } from "@prisma/client";

// Re-export Prisma enums
export { UserRole, ItemStatus, TransactionStatus };

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Item types
export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  status: ItemStatus;
  images: string[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemWithOwner extends Item {
  owner: User;
}

// Transaction types
export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  itemId: string;
  amount: number;
  status: TransactionStatus;
  stripePaymentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionWithDetails extends Transaction {
  buyer: User;
  seller: User;
  item: Item;
}

// Form types
export interface ItemFormData {
  title: string;
  description: string;
  price: number;
  status: ItemStatus;
  images: string[];
}

export interface UserProfileFormData {
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
