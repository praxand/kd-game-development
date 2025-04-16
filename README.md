# Breakout

A classic Breakout arcade game built using Laravel for backend logic (score tracking, user authentication) and Phaser 3 (JavaScript game framework) for the frontend gameplay. Players control a paddle to bounce a ball, breaking bricks to earn points.

## Run Locally

Clone the project

```bash
  git clone https://github.com/praxand/kd-game-development.git
```

Go to the project directory

```bash
  cd kd-game-development
```

Install dependencies

```bash
  composer install
  npm install
```

Setup environment

```bash
  cp .env.example .env
  php artisan key:generate
```

Build assets

```bash
  npm run build
```

Start development server

```bash
  php artisan serve
```
