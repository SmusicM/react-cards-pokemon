import React, { useEffect, useState } from "react";
import { v1 as uuid } from "uuid";

import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import useAxios from "./hooks/useAxios";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, setCards] = useState([]);
  const [deckId, setDeckId] = useState(null);
  const data = useAxios("https://deckofcardsapi.com/api/deck/new/", {});
  useEffect(() => {
    if (!deckId && data.response) {
      setDeckId(data.response.data.deck_id);
      console.log("console log for data response data deck_id", data.response.data.deck_id);
      console.log("console log for data response deck_id", data.response.deck_id);
    }
  }, [data.response, deckId]);

  console.log("console log for data response", data.response);

  //console.log("data response",data.response)
  //console.log("data response data",data.response.data)
  //console.log("data response cards",data.response.cards)
  //console.log("data response cards index 0",data.response.cards)

  const addCard = async () => {
    console.log("deckId", deckId);
    const cardData = useAxios(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw`,
      {}
    );
    if (cardData.response) {
      setCards((cards) => [
        ...cards,
        { ...cardData.response.cards[0], id: uuid() },
      ]);
    }
    if (cardData.isLoading) return <p>...loading</p>;
    if (cardData.error) return <p>Error:{cardData.error}</p>;
  };

  if (data.isLoading) return <p>...loading</p>;
  if (data.error) return <p>Error:{data.error}</p>;

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
