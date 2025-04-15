import type { SVGProps } from "react";

const TransferIcon = ({ fill = "#F8F9FC", ...props }: SVGProps<SVGSVGElement>) => (
  <svg data-testid="transfer-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill={fill}
      fillRule="evenodd"
      d="M13.714 16.286a.857.857 0 0 0-.857-.857h-9.93l3.68-3.678a.858.858 0 1 0-1.213-1.214L.25 15.679a.857.857 0 0 0 0 1.214l5.143 5.142a.858.858 0 0 0 1.213-1.213l-3.68-3.679h9.93a.857.857 0 0 0 .857-.857ZM10.286 7.715a.857.857 0 0 1 .857-.857h9.93l-3.68-3.679a.858.858 0 1 1 1.213-1.213l5.143 5.142a.857.857 0 0 1 0 1.214l-5.143 5.142a.858.858 0 0 1-1.213-1.214l3.68-3.678h-9.93a.857.857 0 0 1-.857-.857Z"
      clipRule="evenodd"
    />
  </svg>
);
export default TransferIcon;
