export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          SalesBoard &nbsp;
          <code className="font-mono font-bold">v1.0</code>
        </p>
      </div>

      <div className="relative flex place-items-center my-16">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
          Sales<span className="text-blue-600">Board</span>
        </h1>
      </div>
    </main>
  );
}
