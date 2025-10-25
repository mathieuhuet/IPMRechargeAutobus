import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    viewBox="0 0 400 210"
    height={props.size}
    style={props.style}
    onClick={props.onClick}
    {...props}
  >
    <rect
      width={100}
      height={30}
      fill="#4455ff"
      rx={0}
      ry={0}
      transform="translate(233.598 120)"
    />
    <rect
      width={30}
      height={90}
      fill="#4455ff"
      rx={0}
      ry={0}
      transform="translate(233.598 60)"
    />
    <rect
      width={30}
      height={30}
      fill="#4455ff"
      rx={0}
      ry={0}
      transform="translate(233.598 180)"
    />
    <rect
      width={30}
      height={90}
      fill="#4455ff"
      rx={0}
      ry={0}
      transform="translate(71.005 60)"
    />
    <ellipse
      fill="#004638"
      rx={8.643}
      ry={4.07}
      transform="matrix(1.18343 0 0 1.40214 137.661 148.845)"
    />
    <rect
      width={30}
      height={30}
      fill="#004638"
      rx={0}
      ry={0}
      transform="translate(71.005 180)"
    />
    <rect
      width={30}
      height={59.102}
      fill="#004638"
      rx={0}
      ry={0}
      transform="matrix(.81915 .57358 -.87344 1.2474 174.394 60)"
    />
    <rect
      width={30}
      height={59.102}
      fill="#004638"
      rx={0}
      ry={0}
      transform="matrix(.81915 -.57358 .87344 1.2474 76.48 77.207)"
    />
    <rect
      width={336.458}
      height={30}
      fill="#82bf00"
      rx={0}
      ry={0}
      transform="matrix(1.18885 0 0 1 0 150)"
    />
    <rect
      width={30}
      height={141.463}
      fill="#004638"
      rx={0}
      ry={0}
      transform="matrix(1 0 0 1.06035 174.393 60)"
    />
    <rect
      width={30}
      height={93.75}
      fill="#004638"
      rx={0}
      ry={0}
      transform="matrix(1 0 0 1.6 303.598 60)"
    />
  </svg>
)
export default SvgComponent