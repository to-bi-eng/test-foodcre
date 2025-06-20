"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

// type UserCardProps = {
//   // propsは不要ですが、将来の拡張用に残してもOK
// };

function CustomSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 64,
          height: 64,
          mb: 2,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 12,
              height: 12,
              bgcolor: "#fff",
              borderRadius: "50%",
              opacity: 0.7 - i * 0.08,
              transform: `rotate(${i * 45}deg) translate(0, -28px)`,
              animation: "spinnerFade 1s linear infinite",
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
        <style>
          {`
            @keyframes spinnerFade {
              0% { opacity: 0.7; }
              50% { opacity: 0.2; }
              100% { opacity: 0.7; }
            }
          `}
        </style>
      </Box>
      <Typography sx={{ color: "#fff", fontSize: 28, fontWeight: "bold", letterSpacing: 2 }}>
        読み込み中・・・
      </Typography>
    </Box>
  );
}

export default function UserStatusCard() {
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

  if (loading)
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
        <CustomSpinner />
      </Card>
    );

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