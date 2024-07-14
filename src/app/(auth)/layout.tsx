import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login Page",
  description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis molestias labore voluptatibus exercitationem quibusdam ut, natus voluptas temporibus, eligendi aliquid beatae, ratione voluptates?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>{children}</div>
  );
}
