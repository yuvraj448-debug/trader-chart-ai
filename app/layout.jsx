import "./globals.css";
import Background from "./components/Background";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-y-auto">
        <Background />
        {children}
      </body>
    </html>
  );
}