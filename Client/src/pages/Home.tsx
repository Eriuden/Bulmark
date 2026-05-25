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

  return (
    <div>Home</div>
  )
}
