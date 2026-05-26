
import { useState } from "react";
import axios from "axios"

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

    const result = axios.post("/api/scan")

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
    <div>
        <div>
            <form
          className="scan-form"
          onSubmit={handleScan}
        >
          <input
            type="text"
            placeholder="https://monsite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button type="submit">
            Analyser
          </button>
        </form>
        </div>

        {loading && (
            <section className="loading-section">

            <div className="loader"></div>

            <h2>Analyse en cours...</h2>

            <div className="loading-steps">

                <p>✓ Vérification HTTPS</p>

                <p>✓ Analyse des headers HTTP</p>

                <p>✓ Inspection des cookies</p>

                <p>✓ Calcul du score sécurité</p>

            </div>

            </section>
        )}

        {!loading && scanResult && (
            <section className="results-section">

            <div className="score-card">

                <h2>Score de sécurité</h2>

                <div
                className="security-score"
                style={{
                    color: getScoreColor(),
                }}
                >
                {scanResult.score}
                <span>/100</span>
                </div>

                <p className="score-summary">
                {scanResult.summary}
                </p>

            </div>

            <div className="checks-container">

                <h3>Résultats détaillés</h3>

                {scanResult.checks.map(
                (check, index) => (
                    <div
                    key={index}
                    className="check-card"
                    >
                    <div className="check-header">

                        <h4>{check.title}</h4>

                        <span
                        className="status-dot"
                        style={{
                            backgroundColor:
                            getStatusColor(
                                check.status
                            ),
                        }}
                        ></span>

                    </div>

                    <p>{check.message}</p>

                    </div>
                )
                )}

            </div>

            <div className="explanations-section">

                <h3>
                Pourquoi ces résultats sont importants ?
                </h3>

                <div className="explanation-card">

                <h4>
                    Content Security Policy (CSP)
                </h4>

                <p>
                    Une politique CSP aide à protéger
                    votre site contre les attaques XSS
                    en limitant les scripts exécutables.
                </p>

                </div>

                <div className="explanation-card">

                <h4>Cookies sécurisés</h4>

                <p>
                    Les attributs SameSite, Secure et
                    HttpOnly réduisent les risques de
                    vol de session utilisateur.
                </p>

                </div>

            </div>

            </section>
        )}
    </div>
  )
}
