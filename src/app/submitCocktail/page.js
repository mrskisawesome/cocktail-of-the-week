export default function submitCocktail() {
  return (
    <>
      <div>
        <h2>Submit your Recipe here</h2>
        <form className="form">
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
          <input name="username" id="username" placeholder="username" />
          <button type="submit">Add My Cocktail</button>
        </form>
      </div>
    </>
  );
}
