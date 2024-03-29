import Link from "next/link";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "More details",
  description: "All the details for your chosen cocktail",
};

export default async function SinglePostPage({ params }) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`
  ); // call the API
  const details = await response.json(); // parse the response as JSON - called it details so clear it is different to previous page
  const comments =
    await sql`SELECT * FROM comments WHERE post_id = ${params.id}`;

  async function handleAddComment(formData) {
    "use server";
    const username = formData.get("username");
    const content = formData.get("content");

    await sql`INSERT INTO comments (username,content, post_id) VALUES (${username}, ${content}, ${params.id})`;
    revalidatePath(`/posts/${params.id}`);
  }

  return (
    <>
      <div className="detail-container">
        <h2>Cocktail #{params.id}</h2>
        <ul className="detailOrg">
          {details.drinks.map((detail) => (
            <div className="sidebyside" key={detail.idDrink}>
              <li className="grow">{detail.strDrink}</li>
              <img className="thumb" src={detail.strDrinkThumb} />

              <h3>Ingredients</h3>
              <div className="ingredients-container">
                <p>{detail.strMeasure1}</p>
                <p>{detail.strIngredient1},</p>

                {detail.strMeasure2 ? <p>{detail.strMeasure2}</p> : null}
                {detail.strIngredient2 ? <p>{detail.strIngredient2},</p> : null}

                {detail.strMeasure3 ? <p>{detail.strMeasure3}</p> : null}
                {detail.strIngredient3 ? <p>{detail.strIngredient3},</p> : null}

                {detail.strMeasure4 ? <p>{detail.strMeasure4}</p> : null}
                {detail.strIngredient4 ? <p>{detail.strIngredient4},</p> : null}

                {detail.strMeasure5 ? <p>{detail.strMeasure5}</p> : null}
                {detail.strIngredient5 ? <p>{detail.strIngredient5},</p> : null}

                {detail.strMeasure6 ? <p>{detail.strMeasure6}</p> : null}
                {detail.strIngredient6 ? <p>{detail.strIngredient6},</p> : null}

                {detail.strMeasure6 ? <p>{detail.strMeasure6}</p> : null}
                {detail.strIngredient6 ? <p>{detail.strIngredient6},</p> : null}

                {detail.strMeasure7 ? <p>{detail.strMeasure7}</p> : null}
                {detail.strIngredient7 ? <p>{detail.strIngredient7},</p> : null}

                {detail.strMeasure8 ? <p>{detail.strMeasure8}</p> : null}
                {detail.strIngredient8 ? <p>{detail.strIngredient8},</p> : null}

                {detail.strMeasure9 ? <p>{detail.strMeasure9}</p> : null}
                {detail.strIngredient9 ? <p>{detail.strIngredient9},</p> : null}

                {detail.strMeasure10 ? <p>{detail.strMeasure10}</p> : null}
                {detail.strIngredient10 ? (
                  <p>{detail.strIngredient10}</p>
                ) : null}
              </div>
              <div>
                <h3>Instructions</h3>
                <p>{detail.strInstructions}</p>
                <h3>Glass</h3>
                <p>{detail.strGlass}</p>
              </div>
              <form action={handleAddComment}>
                <h3>Add a comment</h3>
                <input name="username" placeholder="Username" />
                <textarea name="content" placeholder="Comment"></textarea>
                <button>Submit</button>
              </form>
              {comments.rows.map((comment) => {
                return (
                  <div key={comment.username}>
                    <h3>{comment.username}</h3>
                    <p>{comment.content}</p>
                  </div>
                );
              })}
              <nav>
                <Link href="/posts">Return to Cocktail List</Link>
              </nav>
            </div>
          ))}
          ;
        </ul>
      </div>
    </>
  );
}
