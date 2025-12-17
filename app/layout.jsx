import "./globals.css";
import Background from "./components/Background";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Background />
        <div style={{ position: "relative", zIndex: 10 }}>
          {children}
        </div>
      </body>
    </html>
  );
}