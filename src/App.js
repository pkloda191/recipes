import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'
import { ListGroup, ListGroupItem } from "shards-react";
import "shards-ui/dist/css/shards.min.css"
import RecipeInstructions from './RecipeInstructions'

function App() {
  const [recipeList, setRecipeList] = useState([]);
  const [specialsList, setSpecialsList] = useState([]);

  const [renderMoreInfoBox, setRenderMoreInfoBox] = useState(false);
  const [whichRecipeToShow, setWhichRecipeToShow] = useState({}); // which details to pass in to the box

  useEffect(() => {
    // get list of recipes on mount
    axios.get('http://localhost:3001/recipes')
      .then(function (response) {
        setRecipeList(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })

    // get list of specials
    axios.get('http://localhost:3001/specials')
      .then(function (response) {
        setSpecialsList(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  function showRecipeDetails(e) {
    // if item clicked id = item id from recipe list, select the one you clicked
    recipeList.forEach(item => item.uuid === e ? setWhichRecipeToShow(item) : '')
    setRenderMoreInfoBox(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        Recipes
      </header>
      <h5>Click on a recipe to learn how to make it!</h5>
      <ListGroup className='listGroupStyle'>
        {recipeList.map((item) => (
          <div onClick={(e) => showRecipeDetails(e.target.id)}>
            <ListGroupItem id={item.uuid}><img src={`http://localhost:3001${item.images.small}`} alt={item.title}></img>
              <div>{item.title}</div></ListGroupItem>
          </div>
        ))}
      </ListGroup>
      {renderMoreInfoBox &&
        <RecipeInstructions
          title={whichRecipeToShow.title}
          description={whichRecipeToShow.description}
          prepTime={whichRecipeToShow.prepTime}
          cookTime={whichRecipeToShow.cookTime}
          servings={whichRecipeToShow.servings}
          ingredients={whichRecipeToShow.ingredients}
          directions={whichRecipeToShow.directions}
          specials={specialsList}
        />
      }

    </div>
  );
}

export default App;
