import React from "react";
function widthCharCount(txt) {
  if (!txt) return 0;
  const thaiFullWidthCharRegex = /[^\u0E31\u0E34-\u0E3E\u0E47-\u0E4E]/g; // ไม่รวมสระบน/ล่าง
  return (txt.match(thaiFullWidthCharRegex) || []).length;
}

function wrapThaiText(segThaiTxt, maxLength, linebreak = "<br />") {
  const words = segThaiTxt.split("|");
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
const ThaiTextComponent = ({ lannow, data }) => {
  if (lannow === "TH") {
    return (
      <h2
        className="break-keep text-center leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: wrapThaiText(data[0]?.about_detail || "", 15, "<br />"),
        }}
      />
    );
  }

  return (
    <h2 className="break-keep text-justify leading-relaxed">
      {data[0]?.about_detail_en || ""}
    </h2>
  );
};

export default ThaiTextComponent;
