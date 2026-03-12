interface HighlightedTextProps {
  text: string;
  highlightedQuery: string;
}

function HighlightedText({ text, highlightedQuery }: HighlightedTextProps) {
  if (!text || !highlightedQuery) return text;

  const lowerTitle = text.toLowerCase();
  const lowerHighlightedQuery = highlightedQuery.toLowerCase();
  const indexOfQuery = lowerTitle.indexOf(lowerHighlightedQuery);

  if (indexOfQuery === -1) return text;

  const before = text.slice(0, indexOfQuery);
  const highlightQuery = text.slice(
    indexOfQuery,
    indexOfQuery + highlightedQuery.length,
  );
  const after = text.slice(indexOfQuery + highlightedQuery.length);

  return (
    <p>
      <span>{before}</span>
      <span className="bg-yellow-300">{highlightQuery}</span>
      <span>{after}</span>
    </p>
  );
}

export default HighlightedText;
