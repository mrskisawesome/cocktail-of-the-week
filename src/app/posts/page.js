import { format } from "date-fns";
export const metadata = {
  title: "Cocktail List",
  description: "List of all our published cocktails",
};
export default async function CocktailList() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka"
  ); // call the API
  const cocktails = await response.json(); // parse the response as JSON
  const drinkIds = cocktails.drinks.map((cocktail) => cocktail.idDrink);

  return (
    <>
      <div>
        <h1>Weekly cocktail</h1>

        <ul className="detailOrg">
          {cocktails.drinks.map((cocktail) => (
            <div className="sidebyside" key={cocktail.idDrink}>
              <li className="grow">{cocktail.strDrink}</li>
              <img className="thumb" src={cocktail.strDrinkThumb} />
              <p className="date">
                {index === 0
                  ? format(new Date(), "MMMM d, yyyy", { weekStartsOn: 1 })
                  : format(
                      new Date(
                        new Date().setDate(new Date().getDate() - 7 * index)
                      ),
                      "MMMM d, yyyy",
                      { weekStartsOn: 1 }
                    )}
                {index > 0 && ` (Week ${index})`}
              </p>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
