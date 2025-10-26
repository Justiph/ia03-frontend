# IA03 Frontend

A React-based frontend application built with TypeScript, Vite, and Tailwind CSS.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd ia03-frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build
```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code linting

## Project Structure

```
src/
├── api/
│   ├── client.ts
│   └── user.ts
├── components/
│   ├── Button.tsx
│   ├── Notice.tsx
│   └── TextInput.tsx
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   └── SignUp.tsx
├── assets/
│   └── react.svg
├── App.tsx
├── index.css
└── main.tsx
```

## Features

- **User Authentication** - Login and registration forms
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript support
- **Modern React** - Uses React 19 with hooks
- **Form Handling** - React Hook Form with Zod validation
- **State Management** - TanStack Query for server state
- **Routing** - React Router DOM for navigation

## Technologies Used

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **TanStack Query** - Powerful data synchronization
- **React Router DOM** - Declarative routing

## API Integration

The frontend communicates with the backend API running on `http://localhost:3000`. Make sure the backend is running before starting the frontend.

## Styling

The application uses Tailwind CSS for styling. The main styles are defined in `src/index.css`.

## Environment Variables

If you need to configure API endpoints or other environment variables, create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Development

### Code Quality
- ESLint is configured for code linting
- TypeScript provides type checking
- Prettier can be used for code formatting

### Hot Reload
The development server supports hot module replacement (HMR) for fast development.

## Building for Production

1. Run `npm run build` to create a production build
2. The built files will be in the `dist` directory
3. Deploy the contents of the `dist` directory to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## License

This project is licensed under the MIT License.