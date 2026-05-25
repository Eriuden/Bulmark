
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

  return (
    <div>Home</div>
  )
}
