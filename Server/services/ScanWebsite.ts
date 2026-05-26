import axios from "axios";

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

export const scanWebsite = async (
  url: string
): Promise<ScanResult> => {

  try {

    const response = await axios.get(url);

    const headers = response.headers;

    const checks: SecurityCheck[] = [];

    let score = 100;

    if (url.startsWith("https://")) {

      checks.push({
        title: "HTTPS",
        status: "good",
        message: "HTTPS activé",
      });

    } else {

      checks.push({
        title: "HTTPS",
        status: "bad",
        message: "Le site n'utilise pas HTTPS",
      });

      score -= 30;
    }

    if (headers["content-security-policy"]) {

      checks.push({
        title: "Content Security Policy",
        status: "good",
        message: "CSP détectée",
      });

    } else {

      checks.push({
        title: "Content Security Policy",
        status: "bad",
        message: "CSP absente",
      });

      score -= 20;
    }

    if (
      headers["strict-transport-security"]
    ) {

      checks.push({
        title: "HSTS",
        status: "good",
        message: "HSTS activé",
      });

    } else {

      checks.push({
        title: "HSTS",
        status: "warning",
        message:
          "HSTS non configuré",
      });

      score -= 10;
    }

    if (headers["x-frame-options"]) {

      checks.push({
        title: "X-Frame-Options",
        status: "good",
        message: "Protection clickjacking active",
      });

    } else {

      checks.push({
        title: "X-Frame-Options",
        status: "warning",
        message:
          "Protection clickjacking absente",
      });

      score -= 10;
    }

    if (
      headers["x-content-type-options"]
    ) {

      checks.push({
        title: "X-Content-Type-Options",
        status: "good",
        message:
          "Protection MIME sniffing active",
      });

    } else {

      checks.push({
        title: "X-Content-Type-Options",
        status: "warning",
        message:
          "Protection MIME sniffing absente",
      });

      score -= 10;
    }

    if (
      headers["access-control-allow-origin"] === "*"
    ) {

      checks.push({
        title: "CORS",
        status: "warning",
        message:
          "CORS très permissif détecté",
      });

      score -= 10;

    } else {

      checks.push({
        title: "CORS",
        status: "good",
        message: "Politique CORS correcte",
      });
    }

    if (score < 0) {
      score = 0;
    }

    let summary = "";

    if (score >= 80) {

      summary =
        "Bonne sécurité globale";

    } else if (score >= 50) {

      summary =
        "Sécurité correcte mais améliorable";

    } else {

      summary =
        "Sécurité insuffisante";
    }

    return {
      score,
      summary,
      checks,
    };

  } catch (error) {

    console.error(error);

    return {
      score: 0,

      summary:
        "Impossible d'analyser ce site",

      checks: [
        {
          title: "Erreur",
          status: "bad",
          message:
            "Le site est inaccessible ou invalide",
        },
      ],
    };
  }
};