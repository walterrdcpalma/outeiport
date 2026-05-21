interface Props {
  onReset: () => void
}

export default function SuccessMessage({ onReset }: Props) {
  return (
    <div className="text-center py-12 space-y-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800">Request sent!</h2>
      <p className="text-slate-500 max-w-sm mx-auto">
        We've received your quote request and will be in touch shortly.
      </p>
      <button
        onClick={onReset}
        className="mt-4 text-blue-600 hover:underline text-sm font-medium"
      >
        Submit another request
      </button>
    </div>
  )
}
