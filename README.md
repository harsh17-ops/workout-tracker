# Workout Tracker App

A modern workout tracking application built with Next.js, MongoDB, and React. Track your exercises, monitor progress, and maintain your fitness journey.

## Features

- 🏋️ **Workout Logging**: Record exercises, sets, reps, and weights
- 📊 **Progress Tracking**: Visualize your fitness progress with charts
- 👤 **User Authentication**: Secure signup and login system
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔒 **Data Security**: Secure password hashing and data protection

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Authentication**: bcryptjs for password hashing
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harsh17-ops/workout-tracker.git
   cd workout-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file and add mongodb_uri


```

## Project Structure

```
workout-tracker/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── signup/
│   ├── log/
│   ├── progress/
│   └── page.tsx
├── components/
├── lib/
│   └── mongodb.js
├── models/
│   └── User.js
├── public/
├── .env.local
├── .gitignore
└── package.json
```

## API Routes

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/workouts` - Fetch user workouts
- `POST /api/workouts` - Create new workout

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Environment Variables on Vercel**
   - Go to Project Settings → Environment Variables
   - Add `MONGODB_URI` with your MongoDB connection string

## Usage

1. **Sign Up**: Create a new account
2. **Log Workouts**: Add exercises with sets, reps, and weights
3. **Track Progress**: View your workout history and progress charts
4. **Monitor Stats**: Analyze your fitness journey over time

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/harsh17-ops/workout-tracker](https://github.com/harsh17-ops/workout-tracker)

---

Made with ❤️ for fitness enthusiasts
