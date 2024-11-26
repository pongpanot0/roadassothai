"use client";

import dynamic from "next/dynamic";

// Import Components แบบ Dynamic
const Hero = dynamic(() => import("@/components/Hero"));
const Activitynews = dynamic(() => import("@/components/Activitynews"), {
  ssr: false, // ปิดการทำงานฝั่ง Server หาก Component ไม่จำเป็นต้อง SSR
});
const Eletther = dynamic(() => import("@/components/Eletther"));
const Mapshow = dynamic(() => import("@/components/Mapshow"));

export default function Home() {
  return (
    <>
      <Hero />
      <Activitynews />
      <Eletther />
      <Mapshow />
    </>
  );
}
