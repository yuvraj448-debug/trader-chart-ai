import "./globals.css";
import Background from "./components/Background";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Background />
        {children}
      </body>
    </html>
  );
} 