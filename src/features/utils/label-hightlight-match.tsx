import React from "react";

export function highlightMatch(label: string, input: string) {
  if (!input) return label;

  const regex = new RegExp(`(${input})`, "i");
  const parts = label.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span
        key={index}
        className="bg-yellow-400"
      >
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}
