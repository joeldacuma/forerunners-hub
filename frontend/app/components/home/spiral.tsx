export const Spiral = ({
  size,
  ...style
}: { size: number } & React.CSSProperties) => {
  return (
    <div style={{ position: 'absolute', width: size, height: size, ...style }}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-spin-slow"
      >
        <defs>
          <linearGradient
            id="spiral-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
          </linearGradient>
        </defs>
        <path
          d="M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,50 50,10 100,10 Z"
          fill="none"
          stroke="url(#spiral-gradient)"
          strokeWidth="4"
          strokeDasharray="565"
          strokeDashoffset="565"
          className="animate-dash"
        />
        <path
          d="M100,30 C135,30 170,65 170,100 C170,135 135,170 100,170 C65,170 30,135 30,100 C30,65 65,30 100,30 Z"
          fill="none"
          stroke="url(#spiral-gradient)"
          strokeWidth="3"
          strokeDasharray="440"
          strokeDashoffset="440"
          className="animate-dash-reverse"
        />
        <path
          d="M100,50 C125,50 150,75 150,100 C150,125 125,150 100,150 C75,150 50,125 50,100 C50,75 75,50 100,50 Z"
          fill="none"
          stroke="url(#spiral-gradient)"
          strokeWidth="2"
          strokeDasharray="314"
          strokeDashoffset="314"
          className="animate-dash"
        />
      </svg>
    </div>
  )
}
