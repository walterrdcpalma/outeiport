export default function Footer() {
  return (
    <footer className="bg-blue-950 text-slate-400 text-sm mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Outeiport. Todos os direitos reservados.</p>
        <p className="text-xs text-slate-500">
          Os valores de ISV apresentados são estimativas — o valor final depende de inspeção oficial.
        </p>
      </div>
    </footer>
  )
}
