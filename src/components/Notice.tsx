// src/components/Notice.tsx
export default function Notice({
  type = 'info',
  message,
}: {
  type?: 'info' | 'success' | 'error';
  message: string;
}) {
  const map = {
    success: { wrap: 'bg-green-50 border-green-200 text-green-800', icon: '✔︎' },
    error: { wrap: 'bg-red-50 border-red-200 text-red-800', icon: '⚠︎' },
    info: { wrap: 'bg-blue-50 border-blue-200 text-blue-800', icon: 'ℹ︎' },
  } as const;

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`rounded-lg border p-3 text-sm flex items-start gap-2 ${map[type].wrap}`}
    >
      <span className="mt-0.5">{map[type].icon}</span>
      <div>{message}</div>
    </div>
  );
}
