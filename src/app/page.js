import Image from "next/image";
import homeBar from "@/../public/homebar.webp";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <h2>Home</h2>
      <p>Welcome to your weekly dose of At Home Cocktail inspo.</p>
      <p>
        Click <Link href="/posts">here </Link>to find our weekly suggestions
      </p>
      <p>
        Want to add your own recipe?{" "}
        <Link href="/submitCocktail">Click here </Link>
      </p>

      <Image
        src={homeBar}
        alt="an example home bar setup"
        placeholder="blur"
        width={400}
        height={400}
        className="home"
      />
    </div>
  );
}
