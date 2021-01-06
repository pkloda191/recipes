import React, { useEffect, useState } from 'react';
import { Container } from "shards-react";

const RecipeInstructions = (props) => {
  const [deals, setDeals] = useState([]);
  const [itemsWithDeals, setItemsWithDeals] = useState([])

  function getSpecials() {
    props.ingredients.forEach(item => props.specials.forEach(special => item.uuid === special.ingredientId ? setDeals(oldArray => [...oldArray, [item, { type: special.type, title: special.title, text: special.text }]]) : ''))
  }

  useEffect(() => {
    deals.splice(0, deals.length)
    itemsWithDeals.splice(0, itemsWithDeals.length)
    props.ingredients && getSpecials();
  }, [props.ingredients])

  useEffect(() => {
    deals.forEach(item => setItemsWithDeals(oldArray => [...oldArray, { uuid: item[0].uuid, title: item[1].title, type: item[1].type, text: item[1].text }]))
  }, [deals])

  return (
    <Container className='recipeInstructions list-group-item'>
      <h5>How to make {props.title}</h5>
      <div>{props.description}</div>
      <div>Prep Time: {props.prepTime} minutes</div>
      <div>Cook Time: {props.cookTime} minutes</div>
      <div>Serves: {props.servings} people</div>
      <br />
      <h6 className='textLeft'>You will need:</h6>
      <ul className='textLeft'>
        {props.ingredients && props.ingredients.map(ingredient =>
          <div>
            <li>{ingredient.amount} {ingredient.name} {ingredient.measurement}</li>
            {/* {itemsWithDeals && itemsWithDeals[0] && itemsWithDeals.forEach(item => item.uuid === ingredient.uuid ? <li>test</li> : <li>test 2 </li>)} */}
            {itemsWithDeals && itemsWithDeals[0] && itemsWithDeals[0].uuid === ingredient.uuid ? <li className='dealText'>{itemsWithDeals[0].type} deal: {itemsWithDeals[0].title}. {itemsWithDeals[0].text}</li> : ''}
            {itemsWithDeals && itemsWithDeals[1] && itemsWithDeals[1].uuid === ingredient.uuid ? <li className='dealText'>{itemsWithDeals[1].type} deal: {itemsWithDeals[1].title}. {itemsWithDeals[1].text}</li> : ''}
            {itemsWithDeals && itemsWithDeals[2] && itemsWithDeals[2].uuid === ingredient.uuid ? <li className='dealText'>{itemsWithDeals[2].type} deal: {itemsWithDeals[2].title}. {itemsWithDeals[2].text}</li> : ''}
          </div>
        )}
      </ul>

      <h6 className='textLeft'>Instructions</h6>
      <ol className='textLeft'>
        {props.directions && props.directions.map(step =>
          <li>{step.instructions}</li>
        )}
      </ol>
    </Container >
  )
}

export default RecipeInstructions;
