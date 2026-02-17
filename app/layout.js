import './globals.css';
import ClientProviders from '@/components/ClientProviders';

export const metadata = {
  title: 'PortfolioPilot - Investment Tracker',
  description: 'Track your stock and IPO investments',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
