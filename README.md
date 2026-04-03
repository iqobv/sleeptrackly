# Sleep duration tracker

The app allows to track the sleep duration. You can start the sleep timer, end it and view the statistics. Statistics are grouped by week. You can also create challenges like todo for every day or week.

## Features

- Track sleep duration
- Group statistics by week
- Create challenges like todo for every day or week
- View statistics
- Authentication via Google OAuth
- Responsive design
- Light and dark mode
- Avatar upload

## Stack

[![Node.js](https://img.shields.io/badge/Node.js-22.17.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.15.0-2D374A?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.6-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![SCSS](https://img.shields.io/badge/SCSS-1.92.1-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Passport](https://img.shields.io/badge/Passport-0.7.0-34E27A?logo=passport&logoColor=white)](https://www.passportjs.org/)
[![Redis](https://img.shields.io/badge/Redis-7.4-DC382D?logo=redis&logoColor=white)](https://redis.io/)

### Installation

1. Clone the repository

```bash
git clone https://github.com/iqobv/sleep-tracker.git
```

2. Install dependencies

```bash
cd sleep-tracker
```

```bash
cd server
npm install
copy .env.example .env
```

```bash
cd client
npm install
copy .env.example .env
```

3. Create project on [Google](https://console.cloud.google.com/projectcreate)

- Open [Google Console](https://console.cloud.google.com/projectcreate);
- Fill in the form;
- After creation, open "Credentials" tab and create "Create OAuth client ID". In redirect URIs, add "http://localhost:3000/api/v1/auth/google/callback". After creation, copy "Client secret", "Client ID" and paste them in the "[.env](./server/.env)" file;

4. Run the server

```bash
cd server
docker-compose -f .\docker-compose.local.yml -p sleeptrackly up -d
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

5. Run the client

```bash
cd client
npm run dev
```
