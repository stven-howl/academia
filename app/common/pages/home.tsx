import { redirect } from "react-router";

export function loader() {
  return redirect(`/trend_charts`);
}

export function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}