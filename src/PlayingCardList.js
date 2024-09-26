import React, { useEffect, useState } from "react";
import { v1 as uuid } from "uuid";
//import axios from "axios"
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import useAxios from "./hooks/useAxios";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, setCards] = useState([]);
  const [deckId, setDeckId] = useState(null);
  const[url,setUrl] = useState(null)
  const data= useAxios("https://deckofcardsapi.com/api/deck/new/",{});
  useEffect(() => {
    if (!deckId && data.response) {
      setDeckId(data.response.data.deck_id);
      //console.log("console log for data response data deck_id 1", data.response.data.deck_id);
      //console.log("console log for data response deck_id 1", data.response.deck_id);
    }
  //}, [data.response.data.deck_id, deckId]);
}, [data.response, deckId]);
  //console.log("console log for data response", data.data.response);
console.log("console.log for data",data)

console.log("deckId",deckId)
//console.log(data.response.deck_id)
  console.log("data response",data.response)
  //console.log("data response data",data.response.data)
  //console.log("data response deck_id",data.response.deck_id)
  //console.log("data response cards index 0",data.response)
  //`https://deckofcardsapi.com/api/deck/${deckId}/draw`,{}
  const cardData = useAxios(url,{});
  console.log("cardData",cardData.response)
  useEffect(()=>{
    if(cardData.response){
      setCards((cards) => [
        ...cards,
        { ...cardData.response.data.cards[0], id: uuid() }
      ]);
      setUrl(null)
    }
  },[cardData.response])

  const addCard = async ()=>{
    if(deckId){
      setUrl(`https://deckofcardsapi.com/api/deck/${deckId}/draw`,{})
    }
  }

  //const addCard = async() => {
  //  console.log("deckId", deckId);
  //  if(!deckId)return;
  //  try{
  //    const cardData = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw`);
  //    //if (cardData.response) {
  //      setCards((cards) => [
  //        ...cards,
  //        { ...cardData.data.cards[0], id: uuid() }
  //      ]);
  //    //}
  //  }catch(e){
  //    console.error("error at add card: ",e)
  //  }
  //  
  //  
  //  //if (cardData.isLoading) return <p>...loading</p>;
  //  //if (cardData.error) return <p>Error:{cardData.error}</p>;
  //};

  //if (data.isLoading) return <p>...loading</p>;
  //if (data.error) return <p>Error:{data.error}</p>;

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={addCard}>Add a playing card!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map((cardData) => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
