import { TriangleAlert } from "lucide-react";
import React from "react";

type CardErrorProps = {
  title: string;
};

export const CardError: React.FC<CardErrorProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-2">
      <TriangleAlert size={16} className="text-gray-500" />
      <h3 className="text-sm text-gray-500">{title}</h3>
    </div>
  );
};
