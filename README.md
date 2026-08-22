## Text Cleaner

A lightweight, privacy-focused web tool for cleaning copied text by removing unwanted noise, invisible characters, formatting artifacts, and unnecessary content.

Paste → Clean → Copy

🌐 Live Demo

Website: https://texclean.vercel.app/

Hosted on Vercel.

📖 About

Text Cleaner is a personal productivity project created to automate repetitive text-cleaning tasks.

Copied text can sometimes contain unwanted headers, invisible Unicode characters, excessive spacing, assessment-related artifacts, and inconsistent formatting. Text Cleaner provides a simple way to clean this content without manually editing it.

The core workflow is:

Paste Text → Select Mode → Clean → Copy Result

🎯 Aim

To provide a simple and efficient way to clean copied text while keeping the processing private and local to the user's device.

🎯 Objectives
Automate repetitive text-cleaning tasks.
Remove unwanted text noise and artifacts.
Remove selected invisible Unicode characters.
Normalize unnecessary spacing and formatting.
Provide multiple levels of cleaning.
Process user text entirely on the client side.
Provide a simple, fast, browser-based interface.
✨ Features

Three Cleaning Modes

Safe — conservative cleaning.
Balanced — removes common unwanted content.
Aggressive — performs more extensive cleaning.

Noise Removal
Removes configured unwanted text patterns and common artifacts.

Invisible Character Removal
Removes selected zero-width and invisible Unicode characters.

Space Cleanup
Normalizes repeated spaces and tabs.

Formatting Cleanup
Removes unnecessary blank lines, leading/trailing whitespace, and selected formatting inconsistencies.

Text Statistics
Displays character and word counts.

Client-Side Processing
Text is processed directly in the browser without requiring a text-processing backend.

🔒 Privacy

Privacy is a core design principle of Text Cleaner.

Your pasted text is processed locally using client-side JavaScript/TypeScript. The application's core cleaning functionality does not require uploading your text to a remote processing server.

Your Text
   ↓
Your Browser
   ↓
Local Processing
   ↓
Cleaned Text


The application does not require server-side storage for the text-cleaning process.

Note: Third-party services such as hosting, analytics, or browser extensions may have their own data-handling policies. The statement above applies to the application's core text-processing logic.

🧠 Cleaning Process

The cleaning pipeline performs operations such as:

Input
 ↓
Remove invisible characters
 ↓
Identify unwanted content
 ↓
Remove configured noise
 ↓
Normalize spaces
 ↓
Normalize formatting
 ↓
Remove excessive blank lines
 ↓
Trim whitespace
 ↓
Cleaned Output

🛠️ Technology
TypeScript
Web-based frontend
Client-side text processing
Vercel
Vite.

🚀 Run Locally
git clone https://github.com/mohammed-adnan-shakeel/assignment-text-cleaner.git
cd assignment-text-cleaner
npm install
npm run dev


Open the local development URL shown by the development server.

🗺️ Roadmap
 Custom cleaning rules
 User-defined cleaning presets
 Download cleaned text
 Drag-and-drop file support
 Improved mobile experience
 Additional text statistics
 More formatting options
📌 Project Status

Live and maintained for personal use.

The project may receive improvements and additional cleaning capabilities over time.

📄 License

This project is licensed under the MIT License.

See the LICENSE file for the complete license text.

The MIT License permits use, modification, distribution, and reuse of the software, subject to its conditions.

👤 Author

Created as a personal productivity and web-development project.

Author: MOHAMMED ADNAN SHAKEEL
