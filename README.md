# LearnEnglish - English Learning Platform

A modern, full-stack English learning platform built with Next.js 14, TypeScript, Prisma, and Ant Design. Features interactive lessons, exercises, and progress tracking for students learning English.

![Dashboard Overview](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

## ✨ Features

### 🎓 For Students
- **Structured Lessons**: Learn English through organized lessons by CEFR levels (A1, A2, B1, B2, C1, C2)
- **Interactive Exercises**: Practice with multiple-choice questions and fill-in-the-blank exercises
- **Progress Tracking**: Monitor your learning journey with detailed statistics and achievements
- **Level System**: Progress through beginner to advanced levels
- **Points & Streaks**: Stay motivated with gamification elements

### 👨‍💼 For Admins
- **Lesson Management**: Create and manage English lessons
- **User Management**: View and manage student accounts
- **Progress Monitoring**: Track student progress and performance
- **Activity Logs**: Monitor platform usage and student activity

### 🔐 Authentication & Security
- Secure authentication with NextAuth.js
- Role-based access control (STUDENT/ADMIN)
- Password hashing with bcrypt
- Protected API routes and middleware

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **UI Library**: Ant Design 5
- **Backend**: Next.js API Routes
- **Database**: Prisma 5 + SQLite (easily switchable to PostgreSQL)
- **Authentication**: NextAuth.js v5
- **Styling**: CSS Modules + Ant Design
- **Development**: TypeScript, ESLint

## 📸 Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard)

### Lessons Page
![Lessons](https://via.placeholder.com/800x400?text=Lessons+Page)

### Interactive Exercises
![Exercises](https://via.placeholder.com/800x400?text=Exercises)

### Progress Tracking
![Progress](https://via.placeholder.com/800x400?text=Progress+Tracking)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learnenglish
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   Generate a secure secret:
   ```bash
   openssl rand -base64 32
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Test Accounts

After seeding the database, you can use these accounts:

**Student Account:**
- Email: `student@learnenglish.com`
- Password: `student123`

**Admin Account:**
- Email: `admin@learnenglish.com`
- Password: `admin123`

## 📁 Project Structure

```
learnenglish/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeding script
├── src/
│   ├── app/
│   │   ├── (auth)/        # Authentication pages
│   │   ├── api/           # API routes
│   │   └── dashboard/     # Dashboard pages
│   ├── components/        # Reusable components
│   └── lib/               # Utilities and configurations
├── public/                # Static assets
└── package.json
```

## 🗄️ Database Schema

### Core Models
- **User**: Student and admin accounts
- **Level**: CEFR proficiency levels (A1-C2)
- **Lesson**: English learning lessons
- **Exercise**: Practice questions
- **UserProgress**: Learning progress tracking
- **Log**: Activity logging

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
```

## 🔧 Configuration

### Switching to PostgreSQL

To use PostgreSQL instead of SQLite:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/learnenglish"
   ```

3. Run migrations:
   ```bash
   npm run db:push
   npm run db:seed
   ```

## 🎯 Roadmap

- [ ] Add more exercise types (matching, ordering, etc.)
- [ ] Implement real-time progress updates
- [ ] Add lesson content editor for admins
- [ ] Implement certificate generation
- [ ] Add audio pronunciation exercises
- [ ] Mobile app version
- [ ] Social features (study groups, leaderboards)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- Portfolio: [your-portfolio.com](https://your-portfolio.com)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Ant Design](https://ant.design/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)

---

⭐ If you found this project helpful, please consider giving it a star!
