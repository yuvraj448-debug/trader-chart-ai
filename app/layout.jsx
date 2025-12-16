import "./globals.css";
import Background from "./components/Background";

export const metadata = {
  title: "Trader Chart AI",
  description: "AI chart analysis for traders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Background />
        <main style={{ position: "relative", zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}