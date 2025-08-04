# 🌐 Mini LinkedIn – A Simple LinkedIn Clone

This is a mini LinkedIn-style social app built using **Next.js** for both frontend and backend. It includes core features like user authentication, post creation, and profile management — all written in a clean, scalable, and maintainable way.

---

## 🚀 Tech Stack

- **Frontend & Backend**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: Custom JWT-based auth (no third-party services)
- **Image Uploads**: [UploadThing](https://uploadthing.com/)
- **Database**: PostgreSQL in Supabase
- **ORM**: [Prisma](https://www.prisma.io/)

---

## 🔐 Authentication Features

- ✅ Sign Up with email & password
- ✅ Sign In with JWT tokens
- ✅ Email verification code
- ✅ Password reset code (via email)
- ✅ Secure password storage (hashed using bcrypt)

---

## 📝 Post Features

- ✍️ Create new posts
- 🔍 View all posts (feeds)
- 🖊️ Edit existing posts
- ❌ Delete posts

---

## 👤 Profile Features

- 🧑 Update name and bio
- 🖼️ Upload/change profile image
- 🏞️ Upload/change banner image

---

## 📦 Project Structure Highlights

- `app/`: Handles routing using Next.js App Router
- `components/`: UI components (e.g., PostCard, ProfileCard)
- `lib/`: Helper functions (JWT, auth, Prisma client, etc.)
- `api/`: API routes for auth, posts, and profile management
- `prisma/`: Prisma schema and seed logic

---

## 🛠️ Key Concepts Implemented

- ✅ Full-stack app using only Next.js
- ✅ Authentication from scratch (no NextAuth)
- ✅ JWT token management
- ✅ Password hashing (bcrypt)
- ✅ Form Validataion using React hook forms. 
- ✅ Used Typescript for type safety. 
- ✅ Sended only necessary data from the backend to increase perfomance of the system. 
- ✅ Scalable & modular codebase
- ✅ Responsive design (mobile to desktop)
- ✅ Clean UI using shadcn + Tailwind

---

## 🖼️ UI Design

Inspired by LinkedIn. Styled using:

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for components like buttons, cards, modals
- Fully **responsive** across devices

---

## 📸 Image Upload

Using **UploadThing** to securely upload and store:

- Profile image
- Banner image

---

## 📄 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/akshatthakur7424/linkedin
   cd linkedin-main

2. npm install

3. Set up environment variables - copy the variables from the env.local file to .env file ( make sure to first create account on these )
DATABASE_URL=
DIRECT_URL=
SECURITY_KEY= any_random_key_in_strings
OWNER_EMAIL=
OWNER_EMAIL_PASSWORD ( needs to create google app password from the given link ( https://myaccount.google.com/apppasswords ) ( first two factor authentication should be enabled ) )
UPLOADTHING_TOKEN=

4. Run Prisma migrations
npx prisma migrate dev --name init
npx prisma generate

5. npm run dev

6. open in browser: http://localhost:3000