import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const QuillEditor = dynamic(() => import('react-quill'), {
    ssr: false,
  });
// Function to calculate the width of Thai characters
function widthCharCount(txt) {
  if (!txt) return 0;
  const thaiFullWidthCharRegex = /[^\u0E31\u0E34-\u0E3E\u0E47-\u0E4E]/g; // Exclude Thai vowel marks
  return (txt.match(thaiFullWidthCharRegex) || []).length;
}

// Function to wrap Thai text with a linebreak
function wrapThaiText(segThaiTxt, maxLength, linebreak = "<br />") {
  if (!segThaiTxt) return ""; // Handle empty input
  const words = segThaiTxt.split("|"); // Split by custom delimiter
  let txt = "";
  let line = "";
  let linewlength = 0;

  for (let i = 0; i < words.length; i++) {
    const wlen = widthCharCount(words[i]);

    if (linewlength + wlen <= maxLength) {
      line += words[i];
      linewlength += wlen;
    } else {
      txt += line + linebreak;
      line = words[i];
      linewlength = wlen;
    }
  }

  if (linewlength > 0) {
    txt += line;
  }

  return txt;
}

// Component to render the Thai text
const RenderHTMLWithQuill = ({ content, maxThaiLineLength = 15 }) => {
  // Preprocess the content for Thai text
  const processedContent = wrapThaiText(content, maxThaiLineLength, "<br />");

  return (
    <div>
      {/* React Quill in read-only mode */}
      <QuillEditor value={processedContent} readOnly={true} theme="bubble" />
    </div>
  );
};

export default RenderHTMLWithQuill;
