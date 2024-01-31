import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function IndividualContributions({ params }) {
  // Fetch the post
  const post = await sql`SELECT * FROM submissions WHERE id = ${params.id}`;
  // Fetch comments
  const comments = await sql`SELECT * FROM cocktail_comments`;

  async function handleAddComment(formData) {
    "use server";
    const username = formData.get("username");
    const content = formData.get("content");

    await sql`INSERT INTO cocktail_comments (username, content, post_id) VALUES (${username}, ${content}, ${params.id})`;
    revalidatePath(`/contributions/${params.id}`);
  }

  return (
    <div className="submissions">
      {post.rows.map((post) => (
        <div key={post.id} className="head" href={`/contributions/${post.id}`}>
          <h2>{post.cocktail_name}</h2>
          <p>Ingredients: {post.ingredients}</p>
          <p>Instructions: {post.instructions}</p>
          <h5>Submitted by {post.username}</h5>
          <form action={handleAddComment}>
            <p>Add a comment</p>
            <input name="username" placeholder="Username" />
            <textarea name="content" placeholder="Comment"></textarea>
            <button>Submit</button>
          </form>
        </div>
      ))}
      {comments.rows.map((comment) => (
        <div key={comment.username}>
          <h3>{comment.username}</h3>
          <p>{comment.content}</p>
          <nav>
            <Link href="/contributions">Return to Reader Contributions</Link>
          </nav>
        </div>
      ))}
    </div>
  );
}
