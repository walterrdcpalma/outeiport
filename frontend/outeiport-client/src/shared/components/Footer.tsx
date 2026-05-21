export default function Footer() {
  return (
    <footer className="bg-blue-950 text-slate-400 text-sm mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Outeiport. All rights reserved.</p>
        <p className="text-xs text-slate-500">
          ISV values are estimates only — final amounts depend on official inspection.
        </p>
      </div>
    </footer>
  )
}
