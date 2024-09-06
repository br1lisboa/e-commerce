"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface IQuantitySelector {
  quantity: number;
  onClickQuantity: (quantity: number) => void;
  maxQuantity?: number;
}

export function QuantitySelector({
  quantity,
  onClickQuantity,
  maxQuantity = 10,
}: IQuantitySelector) {
  function handleIncrement() {
    if (quantity === maxQuantity) return;
    onClickQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity === 1) return;
    onClickQuantity(quantity - 1);
  }

  return (
    <div className="flex gap-4">
      <button onClick={handleDecrement}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 px-5 bg-gray-200 flex items-center justify-center rounded">
        {quantity}
      </span>

      <button onClick={handleIncrement}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
}
