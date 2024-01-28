export const metadata = {
  title: "Contributions",
  description: "Recipes from readers",
};
import { sql } from "@vercel/postgres";
export default async function Contributions() {
  const posts = await sql`SELECT * FROM submissions`;
  return (
    <div>
      <h2>Your contributions</h2>
      <div className="submissions">
        {posts.rows.map((post) => {
          return (
            <div key={post.username} className="head">
              <h3>{post.cocktail_name}</h3>
              <p>Ingredients: {post.ingredients}</p>
              <p>Instructions: {post.instructions}</p>
              <h5>Submitted by {post.username}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
