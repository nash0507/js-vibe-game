# Overview

A modern web-based Rock-Paper-Scissors Monster Battle Game built with React, TypeScript, and Express. Players battle against randomly generated monsters in classic rock-paper-scissors combat, managing health points and accumulating scores while surviving as long as possible. The game features a polished gaming interface with real-time feedback, persistent high scores, and comprehensive game statistics.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks for local state, TanStack Query for server state
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system supporting light/dark themes
- **Typography**: Google Fonts (Inter, Fredoka One, JetBrains Mono) for gaming aesthetic

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints for game sessions and statistics
- **Error Handling**: Centralized middleware with structured error responses
- **Development**: Hot reload with Vite integration in development mode

## Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Neon serverless PostgreSQL (configured via DATABASE_URL)
- **Schema**: Game sessions table with player names, scores, health, and timestamps
- **Validation**: Zod schemas for runtime type validation
- **Development Fallback**: In-memory storage implementation for testing

## Game Logic & Features
- **Core Mechanics**: Turn-based rock-paper-scissors with health/damage system
- **Monster System**: Randomized monster names and mood states affecting gameplay
- **Scoring**: Points-based system with bonus mechanics and survival elements
- **Session Management**: Player name collection and game state persistence
- **Statistics**: High scores leaderboard and aggregate game statistics

## External Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Fonts**: Google Fonts CDN (Inter, Fredoka One, JetBrains Mono)
- **Icons**: Lucide React icon library
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Date Utilities**: date-fns for timestamp formatting
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions