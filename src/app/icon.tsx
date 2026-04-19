import { ImageResponse } from "next/og";

export const size = {
  width: 192,
  height: 192,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "38px",
          background: "linear-gradient(145deg, #94adc7 0%, #bfd0e2 44%, #283241 100%)",
          color: "#0f1319",
          fontWeight: 800,
          fontSize: 84,
          letterSpacing: "-0.06em",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        MC
      </div>
    ),
    size,
  );
}
