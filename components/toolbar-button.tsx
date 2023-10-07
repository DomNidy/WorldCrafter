export default function ToolbarButton({
  variant = "default",
  onClickCallback,
  isSelected,
  children,
}: {
  variant: "destructive" | "default";
  onClickCallback: () => any;
  isSelected: boolean;
  children: any;
}) {
  return (
    <button
      onClick={onClickCallback}
      className={`
      w-10 rounded-full p-2
      ${isSelected ? " border-[2px] border-gray-500" : ""}
      ${variant === "default" && "bg-gray-800 hover:bg-gray-700"}
      ${variant === "destructive" && "bg-red-800 hover:bg-red-700"}
    aspect-square`}
    >
      {children}
    </button>
  );
}
