import React from 'react';

interface MarkdownRendererProps {
  text: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ text }) => {
  if (!text) return null;

  // Regex to split by **bolded** text, keeping the delimiters for processing
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // It's a bold part, render it as <strong>
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        // It's a normal text part
        return part;
      })}
    </>
  );
};

export default MarkdownRenderer;