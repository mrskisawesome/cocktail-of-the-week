import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const metadata = {
  title: "Contributions",
  description: "Recipes from readers",
};

export default async function Contributions({ params }) {
  const posts = await sql`SELECT * FROM submissions`;

  return (
    <div>
      <h2>Your contributions</h2>
      <div className="submissions">
        {posts.rows.map((post) => {
          return (
            <Link
              key={post.id}
              className="head"
              href={`/contributions/${post.id}`}
            >
              <h3>{post.cocktail_name}</h3>
              <p>Ingredients: {post.ingredients}</p>
              <p>Instructions: {post.instructions}</p>
              <h5>Submitted by {post.username}</h5>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
