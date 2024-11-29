import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Global Kokani Committees' Council",
  description: "Global Kokani Committees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children} <ToastContainer />
      </body>
    </html>
  );
}
