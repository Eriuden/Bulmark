
import { useState } from "react";

export const Home = () => {

type SecurityCheck = {
  title: string;
  status: "good" | "warning" | "bad";
  message: string;
};

type ScanResult = {
  score: number;
  summary: string;
  checks: SecurityCheck[];
};

const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [scanResult, setScanResult] = useState<ScanResult | null>(
    null
  );

  //const result

  const handleScan = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!url.trim()) return;

    setLoading(true);
    setScanResult(null);

    // Simulation backend
    setTimeout(() => {
      setScanResult(Result);
      setLoading(false);
    }, 3500);
  };

  return (
    <div>Home</div>
  )
}
