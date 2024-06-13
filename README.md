# Community health tracking system

## Table of Contents

- [Dependencies](#dependencies)
- [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Style Guide](#style-guide)
  - [Colors](#colors)
  - [Fonts](#fonts)
  - [Sizes](#sizes)
  - [Effects](#effects)
  - [Usage](#usage)


# Dependencies:
- npm i nodemon
- npm i sqlite3
- npm i express-session
- npm i express
- npm i dotenv
- npm i multer

## Running the Server

 npm start

## Project Structure

- src/ - Source files for the application
- routes/ - API routes
- db/ - Database files and scripts
- public/ - Public like CSS, JS, images, icons
- views/ - EJS templates
- styles/ - CSS stylesheets
- js/ - Client-side JavaScript files
- .env - Environment variables file
- server.js - Main server file

## Database Setup

Make sure you have SQLite installed. 

# Style Guide

## Colors

- **Primary Color**: `#1e3a5f` (Dark blue)
- **Navbar Hover Color**: `#3e5b84` (Slightly lighter blue on hover)
- **Navbar Gold Color**: `#ffd700` (Gold text on hover)
- **Background Color**: `#ffffff` (Background color for most pages)
- **Text Color**: `#f0f0f0` (Light text color)
- **Border Color**: `#000000` (Black border color)
- **Profile Text Color**: `#000000` (Profile display text color)
- **Tab Background Color**: `#ffffff` (Background color for tabs)
- **Tab Hover Color**: `#cacaca` (Hover color for tabs)
- **Button Background Color**: `#000000` (Button background color)
- **Button Hover Color**: `#333333` (Button hover background color)
- **Body Background Color**: `#f0f0f0` (Background color for body)
- **Body Text Color**: `#333` (Text color for body)
- **Prescription Tab Background**: `#ffffff` (Background color for prescription tab)
- **Prescription Tab Shadow**: `0 10px 30px rgba(0, 0, 0, 0.1)` (Shadow for prescription tab)
- **Table Border Color**: `#ddd` (Border color for table)
- **Table Header Background**: `#f0f0f0` (Background color for table header)
- **Table Row Hover**: `#f9f9f9` (Background color for table row hover)

## Fonts

- **Primary Font**: `'Roboto', sans-serif`
- **Secondary Font**: `'Orbitron', sans-serif`

## Sizes

- **Base Font Size**: `16px`
- **Large Font Size**: `18px`
- **Standard Border Radius**: `8px`

## Effects

- **Box Shadow**: `0 10px 30px rgba(0, 0, 0, 0.5)`

## Usage

### Variables


- `--primary-color`: Used for primary elements like the navbar background.
- `--nav-hover-color`: Used for hover effects on the navbar.
- `--nav-gold-color`: Used for text on hover in the navbar.
- `--background-color`: Default background color for most pages.
- `--text-color`: Default text color.
- `--border-color`: Used for borders.
- `--profile-text-color`: Color for profile display text.
- `--tab-background-color`: Background color for tabs.
- `--tab-hover-color`: Hover color for tabs.
- `--button-background-color`: Default background color for buttons.
- `--button-hover-color`: Hover background color for buttons.
- `--font-family`: Primary font used throughout the application.
- `--font-family-secondary`: Secondary font used in specific elements.
- `--font-size-base`: Base font size for text.
- `--font-size-large`: Large font size for text.
- `--border-radius`: Standard border radius for rounded corners.
- `--box-shadow`: Box shadow effect for elements.
- `--body-background-color`: Background color for body.
- `--body-text-color`: Text color for body.
- `--prescription-tab-background`: Background color for prescription tab.
- `--prescription-tab-shadow`: Shadow for prescription tab.
- `--table-border-color`: Border color for table.
- `--table-header-background`: Background color for table header.
- `--table-row-hover`: Background color for table row hover.
