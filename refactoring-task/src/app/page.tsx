import Table, { Issue } from "./components/table";
import issuesData from "./constants/issues.json";

function Home() {
  const issues: Issue[] = issuesData as Issue[];
  return <Table issues={issues} />;
}

export default Home;
