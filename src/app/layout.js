import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const font = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Cocktail of the Week",
  description: "Your weekly Friday night inspo - a new cocktail every week",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <h1>Cocktail of the Week</h1>
        <h4>Get your Friday inspo here!</h4>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/posts">Cocktail List</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contributions">Your Contributions</Link>
          <Link href="/submitCocktail">Submit a recipe</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
