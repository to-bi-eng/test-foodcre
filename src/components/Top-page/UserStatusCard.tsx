"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

type UserCardProps = {
  // propsは不要ですが、将来の拡張用に残してもOK
};

export default function UserStatusCard(props: UserCardProps) {
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
    <Card
      sx={{
        maxWidth: 380,
        margin: "16px auto",
        backgroundColor: "#4b4b4b",
        color: "#fff",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", marginBottom: 2, marginLeft: 2 }}
        >
          {email}
        </Typography>
        <Box sx={{ marginY: 2, marginX: 5 }}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            現在の所有ポイント：
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: 2,
              textAlign: "right",
            }}
          >
            {points}ポイント
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            所持クーポン枚数：
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "right",
            }}
          >
            0枚
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}