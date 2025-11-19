
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { title, description, Icon, path, color, hoverColor } = tool;

  return (
    <Link
      to={path}
      className={`group flex flex-col items-center justify-center p-6 text-center bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out`}
    >
      <div className={`mb-4 p-4 rounded-full transition-colors duration-300 ${color} ${hoverColor}`}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </Link>
  );
};

export default ToolCard;
