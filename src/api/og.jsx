import { ImageResponse } from "@vercel/og";

export default async function handler(req, res) {
  const title = "Plananny - A simple events organizer calendar";
  const description =
    "Plananny - A simple events organizer calendar for all your scheduling needs.";

  // Generate the Open Graph image
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f6f6",
          width: 1200,
          height: 630,
        }}
      >
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );

  res.setHeader("Content-Type", "image/png");
  res.send(imageResponse);
}
