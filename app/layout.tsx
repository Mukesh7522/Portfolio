import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mukesh Sridharan',
  description:
    'Data Engineer specializing in production-grade ETL pipelines, PostgreSQL data warehousing, and self-service analytics platforms. Architecting unified data systems delivering ₹12L+ annual cost savings.',
  keywords: [
    'Data Engineer', 'ETL Pipelines', 'PostgreSQL', 'Apache Airflow',
    'FastAPI', 'React', 'Python', 'Data Analytics', 'Data Warehouse',
    'dbt', 'Orchestration',
  ],
  authors: [{ name: 'Mukesh Sridharan' }],
  openGraph: {
    title: 'Mukesh Sridharan',
    description: 'Data Engineering & Orchestration Specialist | Building Production-Grade Pipelines',
    url: 'https://mukesh7522.github.io/Portfolio',
    siteName: 'Mukesh Sridharan Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mukesh Sridharan',
    description: 'Data Engineering & Orchestration Specialist | Building Production-Grade Pipelines',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338bdf8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 20V4l8 8 8-8v16' /%3E%3C/svg%3E" />
      </head>
      <body>
        <div id="scroll-progress" />
        {children}
      </body>
    </html>
  )
}
