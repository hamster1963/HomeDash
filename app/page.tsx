"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 检查当前页面是否是 https://home.buycoffee.top
    console.log("window.location.href", window.location.href);
    if (
      window.location.href === "https://home.buycoffee.top" ||
      window.location.href === "http://localhost:3000/"
    ) {
      // 跳转到 /home/main
      router.push("/home/main");
    }
  }, [router]);
  return <></>;
}
