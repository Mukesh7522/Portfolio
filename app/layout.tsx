import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mukesh Sridharan | Data Analyst Portfolio",
  description: "Data Automation Specialist focused on converting complex operations into intelligent, self-running automation ecosystems. Building Python-PostgreSQL data pipelines and high-impact Power BI dashboards.",
  keywords: ["Data Analyst", "Data Automation", "Python", "Power BI", "SQL", "PostgreSQL", "Data Pipeline", "Business Intelligence"],
  authors: [{ name: "Mukesh Sridharan" }],
  openGraph: {
    title: "Mukesh Sridharan | Data Analyst Portfolio",
    description: "Data Automation Specialist | Building Intelligent Data Ecosystems",
    url: "https://mukesh7522.github.io/Portfolio",
    siteName: "Mukesh Sridharan Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukesh Sridharan | Data Analyst Portfolio",
    description: "Data Automation Specialist | Building Intelligent Data Ecosystems",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="animated-bg" />
        <div className="scroll-progress" id="scroll-progress" />
        {children}
      </body>
    </html>
  );
}

