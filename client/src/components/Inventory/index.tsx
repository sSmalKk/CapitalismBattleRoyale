import InventoryGrid from 'components/itemGrid';
import React from 'react';

interface StorageItem {
  name: string;
  value: number;
  x: number;
  y: number;
  img: string;
}

interface Item {
  name: string;
  value: number;
  x: number;
  y: number;
  img: string;
  innerimg: string;
  storage: StorageItem[];
}

interface Props {
  topleft: Item[];
  topright: Item[];
  topmid: Item[];
  bottomleft: Item[];
  bottommid: Item[];
  bottomright: Item[];
}

const Inventory: React.FC<Props> = ({ bottomleft, bottomright, bottommid, topleft, topright, topmid }) => {
  return (
    <div
      style={{
        zIndex: 99,
        position: 'fixed', // Define a posição fixa
      }}
    >
      <div style={{ justifyContent: 'center' }} className="bg-white border border-solid border-black-900 flex">
        <InventoryGrid equippedItems={topleft} hasClose={false} />
        <InventoryGrid equippedItems={topmid} hasClose={false} />
        <InventoryGrid equippedItems={topright} hasClose={false} />
      </div>
      <div style={{ justifyContent: 'center' }} className="bg-white border border-solid border-black-900 flex">
        <InventoryGrid equippedItems={bottomleft} hasClose={false} />
        <InventoryGrid equippedItems={bottommid} hasClose={false} />
        <InventoryGrid equippedItems={bottomright} hasClose={false} />
      </div>
    </div>
  );
};

export default Inventory;
