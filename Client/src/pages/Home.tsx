
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

    setTimeout(() => {
      setScanResult(result);
      setLoading(false);
    }, 3500);
  };

  const getScoreColor = () => {
    if (!scanResult) return "#ffffff";

    if (scanResult.score >= 80) return "#22c55e";

    if (scanResult.score >= 50) return "#f59e0b";

    return "#ef4444";
  };

  const getStatusColor = (
    status: "good" | "warning" | "bad"
  ) => {
    switch (status) {
      case "good":
        return "#22c55e";

      case "warning":
        return "#f59e0b";

      case "bad":
        return "#ef4444";

      default:
        return "#ffffff";
    }
  };

  return (
    <div>Home</div>
  )
}
