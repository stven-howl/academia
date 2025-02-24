import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <Link to="/trend_charts">Trend Charts</Link>
      </div>
    </div>
  );
}