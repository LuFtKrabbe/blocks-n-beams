const stroke = '#1677ff';
const linecap = 'round';
const linejoin = 'round';
const strokeWidth = '2.5px';

const AboutUsSvg = () => (
  <svg width="25px" height="25px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g data-name="about-us" id="_about-us">
      <circle
        fill="none"
        stroke={stroke}
        strokeLinecap={linecap}
        strokeLinejoin={linejoin}
        strokeWidth={strokeWidth}
        cx="16"
        cy="13"
        r="5"
      />
      <path
        fill="none"
        stroke={stroke}
        strokeLinecap={linecap}
        strokeLinejoin={linejoin}
        strokeWidth={strokeWidth}
        d="M23,28A7,7,0,0,0,9,28Z"
      />
      <path
        fill="none"
        stroke={stroke}
        strokeLinecap={linecap}
        strokeLinejoin={linejoin}
        strokeWidth={strokeWidth}
        d="M24,14a5,5,0,1,0-4-8"
      />
      <path
        fill="none"
        stroke={stroke}
        strokeLinecap={linecap}
        strokeLinejoin={linejoin}
        strokeWidth={strokeWidth}
        d="M25,24h6a7,7,0,0,0-7-7"
      />
      <path
        fill="none"
        stroke={stroke}
        strokeLinecap={linecap}
        strokeLinejoin={linejoin}
        strokeWidth={strokeWidth}
        d="M12,6a5,5,0,1,0-4,8"
      />
      <path
        fill="none"
        stroke={stroke}
        strokeLinecap={linecap}
        strokeLinejoin={linejoin}
        strokeWidth={strokeWidth}
        d="M8,17a7,7,0,0,0-7,7H7"
      />
    </g>
  </svg>
);

export default AboutUsSvg;
