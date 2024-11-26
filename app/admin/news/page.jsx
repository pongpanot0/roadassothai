import React from "react";

import dynamic from "next/dynamic";
const ComponentC = dynamic(() => import("@/components/Admin/News/NewsTable"), {
  ssr: false,
});

const page = () => {
  return (
    <div className="overflow-auto h-screen">
      <ComponentC />
    </div>
  );
};

export default page;
