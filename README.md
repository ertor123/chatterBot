🤖 ChatterBot

A modern, AI-powered chatbot built with Next.js and OpenAI's GPT models. This application provides a clean, responsive chat interface for interacting with AI assistants.

This project is a part of the AI Developer Degree provided by LearnWeb3 [https://learnweb3.io/?invite-code=UU4ZBi2G]

✨ Features

- 💬 **Real-time Chat Interface** - Smooth, responsive chat experience
- 🧠 **OpenAI GPT Integration** - Powered by GPT-4o-mini for intelligent responses
- 🎨 **Modern UI** - Clean design with Tailwind CSS
- ⚡ **Fast Performance** - Built with Next.js 15 and React 19
- 🔒 **Secure API Handling** - Server-side API calls with proper error handling
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

🚀 Quick Start

Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/chatterbot.git
   cd chatterbot
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory:
   ```bash
   OPENAI_KEY=your_openai_api_key_here
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open your browser
   Navigate to [http://localhost:3000](http://localhost:3000)

🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Development**: ESLint, PostCSS

📁 Project Structure

```
chatterbot/
├── src/
│   └── app/
│       ├── api/
│       │   └── route.ts          # OpenAI API endpoint
│       ├── globals.css           # Global styles
│       ├── layout.tsx            # Root layout
│       └── page.tsx              # Main chat interface
├── .env.local                    # Environment variables
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

⚙️ Configuration

Changing the AI Model

Edit `src/app/api/route.ts` to change the OpenAI model:

```typescript
const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini", // Change this to your preferred model
  messages: body.messages,
});
```

Available models:
- `gpt-3.5-turbo` - Fast and cost-effective
- `gpt-4` - More capable but slower
- `gpt-4-turbo` - Balanced performance
- `gpt-4o-mini` - Latest optimized model (default)

Customizing the UI

The chat interface can be customized by editing `src/app/page.tsx`. Styling is handled with Tailwind CSS classes.

🙏 Acknowledgments

- [OpenAI](https://openai.com/) for providing the GPT API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework


