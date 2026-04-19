import { ImageResponse } from "next/og";

import { siteContent } from "@/content/siteContent";

export const alt = "Marin Civil Studio - Ingeniería civil premium";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #11141a 10%, #171c24 56%, #222d3c 100%)",
          padding: "64px",
          color: "#e8edf3",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "24px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#bfd0e2",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "#94adc7",
            }}
          />
          Ingeniería civil premium
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "980px" }}>
          <div style={{ fontSize: "66px", lineHeight: 1.08, fontWeight: 700 }}>{siteContent.brand.name}</div>
          <div style={{ fontSize: "34px", lineHeight: 1.3, color: "#a7b3c2" }}>
            Dirección técnica y control de obra para decisiones con menor riesgo.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "25px", color: "#bfd0e2" }}>
          <div>{siteContent.brand.tagline}</div>
          <div>marincivilstudio.com</div>
        </div>
      </div>
    ),
    size,
  );
}
