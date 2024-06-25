export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-64 h-[24px] max-sm:w-48 max-sm:h-[14px] border-[#1E3D4B] border-[2px] rounded-full flex items-center"
      >
        <div
          className="bg-gradient-to-r from-[#EF7300] to-[#711081] h-[14px] max-sm:h-[8px] rounded-full mx-1"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  )
}
