import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const SolutionRenderer = ({ content }) => (
  <div className="prose max-w-none text-gray-700">
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  </div>
);

export default SolutionRenderer;