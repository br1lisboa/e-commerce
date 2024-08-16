"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface IQuantitySelector {
  quantity: number;
}

export function QuantitySelector({ quantity }: IQuantitySelector) {
  const [count, setCount] = useState(quantity);

  function handleIncrement() {
    if (count === 5) return;
    setCount(count + 1);
  }

  function handleDecrement() {
    if (count === 0) return;
    setCount(count - 1);
  }

  return (
    <div className="flex gap-4">
      <button onClick={handleDecrement}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 px-5 bg-gray-200 flex items-center justify-center rounded">
        {count}
      </span>

      <button onClick={handleIncrement}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
}
