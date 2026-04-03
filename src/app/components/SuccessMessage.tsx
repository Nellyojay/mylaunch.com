import { CheckCircle } from "lucide-react";

type Props = {
  header: string | null;
  message: string | null;
  error: boolean;
}

export default function SuccessMessage({ header, message, error }: Props) {
  return (
    <div className={`m-2 p-2 ${error ? 'bg-red-50' : 'bg-green-50'} border border-green-200 rounded-xl flex items-center space-x-3 animate-in fade-in slide-in-from-top-2 duration-300`}>
      {!error && (<CheckCircle className="w-6 h-6 text-green-600 shrink-0" />)}
      <div>
        {header && (<p className={`font-semibold ${error ? 'text-red-500' : 'text-green-900'}`}>{header}</p>)}
        {message && (<p className={`text-sm ${error ? 'text-red-500' : 'text-green-700'}`}>{message}</p>)}
      </div>
    </div>
  )
}
