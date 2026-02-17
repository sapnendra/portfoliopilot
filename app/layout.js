import './globals.css';

export const metadata = {
  title: 'PortfolioPilot - Investment Tracker',
  description: 'Track your stock and IPO investments',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
