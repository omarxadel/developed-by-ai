import React from "react";
import ItemCard from "./ItemCard";
import { getItems } from "@/lib/data/item";

const ItemList = async () => {
  const { data } = await getItems();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
