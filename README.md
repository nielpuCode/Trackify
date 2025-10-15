# Trackify

A simple task management web app using **Next.js (App Router)**, **Prisma ORM**, **NextAuth**, and **MySQL (XAMPP)** for submission of Online Recruitment Test

---

## 1. Tech Stack

- Next.js 15 (App Router)
- Prisma ORM
- NextAuth.js (For Authentication)
- MySQL (via XAMPP)
- Tailwind CSS
- JavaScript

---

## 2. Prerequisites

Make sure these are installed:

- Node.js v18 or above
- XAMPP (for Apache and MySQL)
- Git

---

## 3. Setup Guide

### Step 1 – Clone Project

```bash
git clone https://github.com/nielpuCode/Trackify.git
cd Trackify
```

### Step 2 – Install Dependencies

```bash
npm install
npm install next next-auth @prisma/client prisma @next-auth/prisma-adapter bcryptjs lucide-react react-hot-toast
```

### Step 3 – Setup MySQL Database

1. Start **Apache** and **MySQL** in XAMPP.
2. Go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
3. Create a database named:

   ```
   team_task_tracker
   ```

### Step 4 – Create `.env` File

In the root folder, create a `.env` file and add:

```env
DATABASE_URL="mysql://root:@localhost:3306/team_task_tracker"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

> If your phpmyadmin MySQl has a password, add it after `root:` (example: `mysql://root:password@localhost:3306/team_task_tracker`)

### Step 5 – Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## 4. Run the App

```bash
npm run dev
```

Then open:
[http://localhost:3000](http://localhost:3000)

---

## 5. Usage

- Go to `/page/signup` to create an account.
- Go to `/page/login` to log in.
- After logging in, you’ll be redirected to `/dashboard`.

## 6. Auth Protection

Routes `/` and `/page/dashboard` are protected.
If not logged in, user will be redirected to `/page/login`.
