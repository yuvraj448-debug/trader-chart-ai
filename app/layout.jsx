import "./globals.css";
import Background from "./components/Background";

export const metadata = {
  title: "Trader Chart AI",
  description: "AI-powered market chart analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">
        {/* LIVE BACKGROUND */}
        <Background />

        {/* PAGE CONTENT */}
        {children}
      </body>
    </html>
  );
}