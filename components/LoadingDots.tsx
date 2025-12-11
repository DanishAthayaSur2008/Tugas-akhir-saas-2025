// components/LoadingDots.tsx
export default function LoadingDots({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-1 ${className}`}>
      <div style={{ width: 6, height: 6, background: "currentColor", borderRadius: 9999, animation: "dots 0.9s infinite" }} />
      <div style={{ width: 6, height: 6, background: "currentColor", borderRadius: 9999, animation: "dots 0.9s 0.15s infinite" }} />
      <div style={{ width: 6, height: 6, background: "currentColor", borderRadius: 9999, animation: "dots 0.9s 0.3s infinite" }} />
    </div>
  );
}
