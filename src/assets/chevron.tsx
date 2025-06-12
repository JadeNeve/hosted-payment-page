export default function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 12L0 8H8L4 12ZM4 0L8 4H0L4 0Z"
        fill="#0A1628"
      />
    </svg>
  );
}