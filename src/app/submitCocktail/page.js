import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default function submitCocktail() {
  async function handleAddCocktail(formData) {
    "use server";
    //get formdata
    const cocktail_name = formData.get("cocktail_name");
    const ingredients = formData.get("ingredients");
    const instructions = formData.get("instructions");
    const username = formData.get("username");

    //make the sql request
    await sql`INSERT INTO submissions (cocktail_name, ingredients, instructions, username) VALUES (${cocktail_name},${ingredients},${instructions},${username})`;
    // revalidate the path so the new item shows
    revalidatePath("/contributions");

    // take me to the home page
    redirect("/contributions");
  }
  return (
    <>
      <div>
        <h2>Submit your Recipe here</h2>
        <form action={handleAddCocktail}>
          <label htmlFor="cocktail_name">Name of Cocktail</label>
          <input
            name="cocktail_name"
            id="cocktail_name"
            placeholder="Name of Cocktail"
          />

          <label htmlFor="ingredients">Ingredients</label>
          <input
            name="ingredients"
            id="ingredients"
            placeholder="Ingredients"
          />

          <label htmlFor="instructions">Mixing instructions</label>
          <input
            name="instructions"
            id="instructions"
            placeholder="Instructions"
          />

          <label htmlFor="username">Submitted by:</label>
          <input name="username" id="username" placeholder="Username" />

          <button type="submit">Add My Cocktail</button>
        </form>
      </div>
    </>
  );
}
