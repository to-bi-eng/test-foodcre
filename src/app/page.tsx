"use client";
import React, { useEffect, useState } from "react";
import UserStatusCard from "@/components/Top-page/UserStatusCard";

export default function Home() {
  const [points, setPoints] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/points/current")
      .then((res) => res.json())
      .then((data) => {
        setPoints(data.points);
        setEmail(data.email);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <UserStatusCard name={email} points={points} coupons={0} />
  );
}