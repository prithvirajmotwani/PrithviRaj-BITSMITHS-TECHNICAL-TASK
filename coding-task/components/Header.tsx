export default function Header() {
  return (
    <header className="bg-orange-600 text-white p-4 text-sm">
      <div className="max-w-4xl mx-auto flex justify-between">
        <div className="font-bold">Hacker News</div>
        <nav className="space-x-2">
          <a href="#" className="hover:underline">new</a>
          <a href="#" className="hover:underline">past</a>
          <a href="#" className="hover:underline">comments</a>
          <a href="#" className="hover:underline">ask</a>
          <a href="#" className="hover:underline">show</a>
          <a href="#" className="hover:underline">jobs</a>
          <a href="#" className="hover:underline">submit</a>
        </nav>
      </div>
    </header>
  );
}