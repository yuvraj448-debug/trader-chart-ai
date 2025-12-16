import "./globals.css";
import Background from "./components/Background";

export const metadata = {
  title: "Trader Chart AI",
  description: "AI-powered chart analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* BACKGROUND MUST LIVE HERE */}
        <Background />

        {/* MAIN CONTENT */}
        <main className="app-content">
          {children}
        </main>
      </body>
    </html>
  );
}