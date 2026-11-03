import React from 'react'

export interface IconProps {
  className?: string
  size?: number
}

// 1. React 19
export const ReactIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none" className={className}>
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

// 2. TypeScript
export const TypeScriptIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <rect width="128" height="128" rx="20" fill="#3178C6" />
    <path d="M72.5 81.3c2.7 4.5 6.7 7.7 13.5 7.7 5.7 0 9.3-2.8 9.3-6.8 0-4.7-4.4-6.4-11.8-9.6-10.7-4.6-15.6-10.4-15.6-19.3 0-11 8.8-19.5 22.8-19.5 9.8 0 16.8 3.7 21 11.2l-9.8 6.3c-2.2-3.8-5.3-5.8-11.2-5.8-5.3 0-8.5 2.8-8.5 6.3 0 4.2 3.8 5.8 11.3 9 11.8 5.1 16.3 10.7 16.3 19.9 0 12.3-9.5 20.5-24.8 20.5-13.8 0-22.7-6-27.1-15.1l14.6-8.8zm-47.5-3.1V51.7h-18V39h49.5v12.7h-18v39H25z" fill="#FFF" />
  </svg>
)

// 3. Next.js
export const NextjsIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 180 180" fill="none" className={className}>
    <circle cx="90" cy="90" r="90" fill="#000" />
    <path d="M149.5 157.5L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.7 9.5-7.3z" fill="#FFF" />
    <rect x="115" y="54" width="12" height="72" fill="#FFF" />
  </svg>
)

// 4. Tailwind CSS
export const TailwindIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M24 10.5C18.6 10.5 15.2 13.2 13.8 18.6C16.1 15.3 19 14.1 22.5 15C24.5 15.5 25.9 17 27.5 18.6C30.1 21.2 33.1 24.3 39.3 24.3C44.7 24.3 48.1 21.6 49.5 16.2C47.2 19.5 44.3 20.7 40.8 19.8C38.8 19.3 37.4 17.8 35.8 16.2C33.2 13.6 30.2 10.5 24 10.5ZM13.8 24.3C8.4 24.3 5 27 3.6 32.4C5.9 29.1 8.8 27.9 12.3 28.8C14.3 29.3 15.7 30.8 17.3 32.4C19.9 35 22.9 38.1 29.1 38.1C34.5 38.1 37.9 35.4 39.3 30C37 33.3 34.1 34.5 30.6 33.6C28.6 33.1 27.2 31.6 25.6 30C23 27.4 20 24.3 13.8 24.3Z" fill="#38BDF8" transform="scale(0.85) translate(0, 4)" />
  </svg>
)

// 5. Node.js
export const NodejsIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M16 2.5L3.5 9.7V24.3L16 31.5L28.5 24.3V9.7L16 2.5Z" fill="#339933" />
    <path d="M16 4.3L26.7 10.5V22.9L16 29.1L5.3 22.9V10.5L16 4.3Z" fill="#215732" />
    <path d="M16 11.5C13.5 11.5 11.5 13.5 11.5 16C11.5 18.5 13.5 20.5 16 20.5C18.5 20.5 20.5 18.5 20.5 16C20.5 13.5 18.5 11.5 16 11.5Z" fill="#68A063" />
  </svg>
)

// 6. PostgreSQL
export const PostgresIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M32 4C16.5 4 4 16.5 4 32c0 15.5 12.5 28 28 28s28-12.5 28-28C60 16.5 47.5 4 32 4z" fill="#336791" />
    <path d="M43.5 20.5c-2.8-3.5-7.2-4.5-12.2-4.5s-10.4 1.5-13.8 5.5c-4.2 4.8-4.5 11.5-3.5 17.5 1 5.8 4 11 9 14.5 4 2.8 9.5 3.5 14 1.5 5.5-2.5 9-7.5 10.5-13.5 1.5-6 .2-15-4-21z" fill="#FFF" opacity="0.9" />
    <circle cx="26" cy="28" r="3" fill="#336791" />
    <circle cx="38" cy="28" r="3" fill="#336791" />
  </svg>
)

// 7. Docker
export const DockerIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M46.7 20.5c-.8-.6-2.5-.5-3.7-.3-.6-2.8-2.5-5.1-5.3-6.5l-.8-.4-.4.8c-.8 1.5-.9 3.2-.5 4.8-1.5-.2-3.1.2-4.3 1-2.2-1.5-5-2-7.5-1.5v-3.7H21V11h-3.7v3.7H13.6V11H9.9v3.7H6.2V11H2.5v7.4c-1.5 1.5-2.5 3.5-2.5 5.8 0 7.8 6.3 14.1 14.1 14.1 9.8 0 17.8-5.3 22.3-13.1 3.5.2 6.8-.7 9.2-3.2.7-.8 1.4-1.7 1.1-2.5z" fill="#2496ED" />
  </svg>
)

// 8. Figma
export const FigmaIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 38 57" fill="none" className={className}>
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
  </svg>
)

// 9. Vite
export const ViteIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M29.9 5.8L16.7 29.5c-.3.5-.9.5-1.2 0L2.1 5.8c-.3-.6.1-1.3.8-1.2l13.1 2 13.1-2c.7-.1 1.1.6.8 1.2z" fill="#9333EA" />
    <path d="M21.7 2.3L11.5 8.1c-.4.2-.5.7-.3 1.1l3.5 6.7c.2.4.7.5 1.1.3l2.8-1.5c.4-.2.9 0 1 .4l1.2 3.8c.2.5.8.6 1.1.2l7.5-8.2c.4-.4.2-1.1-.3-1.2L22.9 8c-.5-.1-.8-.5-.7-1l.4-3.8c.1-.6-.5-1.1-1-1z" fill="#FBBF24" />
  </svg>
)

// 10. Framer Motion
export const FramerMotionIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
    <path d="M12 8l8 8H4z" fill="#FF0088" />
  </svg>
)

// 11. Git
export const GitIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21.6 10.6L13.4 2.4c-.8-.8-2.1-.8-2.8 0L8.4 4.6l3.6 3.6c.9-.3 1.9-.1 2.5.6.7.7.9 1.7.5 2.5l3.5 3.5c.9-.4 1.9-.2 2.5.5.9.9.9 2.5 0 3.4s-2.5.9-3.4 0c-.7-.7-.9-1.8-.4-2.7L13.3 12v4.8c.4.3.7.8.7 1.4 0 1.3-1.1 2.4-2.4 2.4s-2.4-1.1-2.4-2.4c0-.7.3-1.3.8-1.7V9.7c-.5-.4-.8-1-.8-1.7 0-.7.3-1.4.8-1.8L6.4 2.6 2.4 6.6c-.8.8-.8 2.1 0 2.8l8.2 8.2c.8.8 2.1.8 2.8 0l8.2-8.2c.8-.8.8-2 0-2.8z" fill="#F05032" />
  </svg>
)

// 12. Supabase
export const SupabaseIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13.2 23.7c-.6.8-1.9.4-1.9-.6V13.8H2.4c-.9 0-1.5-.9-1.1-1.7L10.8.3c.6-.8 1.9-.4 1.9.6v9.3h8.9c.9 0 1.5.9 1.1 1.7l-9.5 11.8z" fill="#3ECF8E" />
  </svg>
)

// 13. GraphQL
export const GraphQLIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z" stroke="#E10098" strokeWidth="1.8" />
    <circle cx="12" cy="2" r="2.2" fill="#E10098" />
    <circle cx="20.7" cy="7" r="2.2" fill="#E10098" />
    <circle cx="20.7" cy="17" r="2.2" fill="#E10098" />
    <circle cx="12" cy="22" r="2.2" fill="#E10098" />
    <circle cx="3.3" cy="17" r="2.2" fill="#E10098" />
    <circle cx="3.3" cy="7" r="2.2" fill="#E10098" />
  </svg>
)

// 14. Prisma
export const PrismaIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L3 21h18L12 2z" fill="#2D3748" />
    <path d="M12 2l-2 19h9L12 2z" fill="#0C344B" />
    <path d="M12 2l-6 19h6L12 2z" fill="#16A394" />
  </svg>
)

// 15. Express
export const ExpressIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect width="32" height="32" rx="8" fill="#1e293b" />
    <path d="M8 21V11h6.5v2.2H10.5v1.8H14v2.2h-3.5v2H15V21H8zm9.5 0l2.7-4.5-2.5-4.5h2.8l1.3 2.5 1.3-2.5h2.8l-2.5 4.5 2.7 4.5h-2.8l-1.5-2.8-1.5 2.8h-2.7z" fill="#38bdf8" />
  </svg>
)

// 16. MongoDB
export const MongoIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 1.5C12 1.5 6 7 6 13.5C6 17.5 8.7 20.8 12 22.5C15.3 20.8 18 17.5 18 13.5C18 7 12 1.5 12 1.5Z" fill="#47A248" />
    <path d="M12 2v20c.3 0 .7 0 1-.2C15.8 20.5 18 17.5 18 13.5C18 7.3 12 2 12 2z" fill="#499D4A" />
  </svg>
)

// 17. Linux / Bash
export const LinuxIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#FCC624" />
    <circle cx="9" cy="10" r="1.5" fill="#000" />
    <circle cx="15" cy="10" r="1.5" fill="#000" />
    <ellipse cx="12" cy="15" rx="3.5" ry="2" fill="#E65100" />
    <circle cx="12" cy="14" r="1" fill="#FFF" />
  </svg>
)

// 18. AWS
export const AWSIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="6" fill="#232F3E" />
    <path d="M5 14c3.5 2.5 10.5 2.5 14 0" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 12l1 2.5-2.5.5" fill="#FF9900" />
  </svg>
)

// 19. Vercel (Official Canonical Vercel Triangle Vector)
export const VercelIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M24 22.525H0L12 1.475l12 21.05z" fill="#000" className="dark:fill-white" />
  </svg>
)

// 20. Netlify (Official Canonical Netlify Vector)
export const NetlifyIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6.49 19.04h-.23L5.13 17.9v-.23l1.73-1.71h1.2l.15.15v1.2L6.5 19.04ZM5.13 6.31V6.1l1.13-1.13h.23L8.2 6.68v1.2l-.15.15h-1.2L5.13 6.31Zm9.96 9.09h-1.65l-.14-.13v-3.83c0-.68-.27-1.2-1.1-1.23-.42 0-.9 0-1.43.02l-.07.08v4.96l-.14.14H8.9l-.13-.14V8.73l.13-.14h3.7a2.6 2.6 0 0 1 2.61 2.6v4.08l-.13.14Zm-8.37-2.44H.14L0 12.82v-1.64l.14-.14h6.58l.14.14v1.64l-.14.14Zm17.14 0h-6.58l-.14-.14v-1.64l.14-.14h6.58l.14.14v1.64l-.14.14ZM11.05 6.55V1.64l.14-.14h1.65l.14.14v4.9l-.14.14h-1.65l-.14-.13Zm0 15.81v-4.9l.14-.14h1.65l.14.13v4.91l-.14.14h-1.65l-.14-.14Z"
      fill="#00C7B7"
    />
  </svg>
)

// 21. Visual Studio Code (VS Code - Official Microsoft Ribbon Vector)
export const VSCodeIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"
      fill="#007ACC"
    />
  </svg>
)

// 22. Postman (Official Canonical Astronaut & Satellite Logo)
export const PostmanIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="11.5" fill="#FF6C37" />
    <path
      d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z"
      fill="#FFF"
    />
  </svg>
)

// 23. Google Lighthouse (Official Web Performance Vector)
export const LighthouseIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 0l5.5 3.5v5H20v3h-2.25l2 12.5H4.25l2-12.5H4v-3h2.5V3.53zm2.94 13.25l-6.22 2.26L8 20.04l7.5-2.75zM12 3.56L9.5 5.17V8.5h5V5.15Z" fill="#F44B21" />
  </svg>
)

// 24. HTML5
export const HTML5Icon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2.5 1.5L4.4 22l7.6 2.1 7.6-2.1 1.9-20.5H2.5z" fill="#E34F26" />
    <path d="M12 22.3l6.2-1.7 1.6-17.3H12v19z" fill="#EF652A" />
    <path d="M12 9.5H8.2l-.3-3.2h8.3l.3-3.2H4.4l.8 9.6H12v-3.2zm0 6.4l-.1.02-3.5-.9-.2-2.5H5.2l.4 5.3 6.4 1.8v-3.7z" fill="#FFF" />
  </svg>
)

// 25. CSS3
export const CSS3Icon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2.5 1.5L4.4 22l7.6 2.1 7.6-2.1 1.9-20.5H2.5z" fill="#1572B6" />
    <path d="M12 22.3l6.2-1.7 1.6-17.3H12v19z" fill="#33A9DC" />
    <path d="M12 9.5H8.2l-.3-3.2h8.3l.3-3.2H4.4l.8 9.6H12v-3.2zm0 6.4l-.1.02-3.5-.9-.2-2.5H5.2l.4 5.3 6.4 1.8v-3.7z" fill="#FFF" />
  </svg>
)

// 25b. JavaScript (Official Yellow Badge)
export const JavaScriptIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#F7DF1E" />
    <path
      d="M6.5 17.5c.5.8 1.2 1.3 2.2 1.3 1.2 0 2-.7 2-2.1v-6.2h-2v6.2c0 .5-.2.8-.7.8-.4 0-.7-.3-.9-.6l-.6.6zm7.2-2.2c.5.8 1.3 1.3 2.4 1.3 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.2-1.9-1.7-1.7-.7-2.8-1.5-2.8-3.3 0-1.7 1.3-3 3.3-3 1.4 0 2.4.5 3.1 1.6l-1.4 1c-.4-.7-1-1-1.7-1-.8 0-1.4.5-1.4 1.1 0 .7.6 1.1 1.7 1.5 1.9.8 3 1.6 3 3.5 0 2-1.6 3.2-3.7 3.2-1.8 0-3-.7-3.7-2l1.6-.9z"
      fill="#000000"
    />
  </svg>
)

// 25c. PHP (Official Purple Oval Logo)
export const PHPIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" />
    <path
      d="M6.2 14.5l.8-4.5h2.2c1.2 0 2 .6 1.8 1.7-.2 1.2-1.2 1.7-2.3 1.7H7.4l-.5 2.1H6.2zm1.6-2.9h1.1c.6 0 1.1-.3 1.2-.8.1-.5-.2-.8-.8-.8H8.2l-.4 1.6zm4.8 2.9l.8-4.5h1.2l-.3 1.7h1.6c1.2 0 2 .6 1.8 1.7-.2 1.2-1.2 1.7-2.3 1.7H13.8l-.5 2.1h-1.2zm1.6-2.9h1.1c.6 0 1.1-.3 1.2-.8.1-.5-.2-.8-.8-.8h-1.1l-.4 1.6zm4.7 2.9l.8-4.5h1.2l-.3 1.9h.1c.3-.5.7-.8 1.3-.8.9 0 1.5.6 1.3 1.7-.2 1.2-1.2 1.7-2.3 1.7h-.6l-.5 2.1H17.3z"
      fill="#FFFFFF"
      fontWeight="bold"
    />
  </svg>
)

// 26. Redux / Zustand
export const ReduxIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="11" fill="#764ABC" />
    <path d="M12 6a6 6 0 100 12 6 6 0 000-12zm-3.5 6a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" fill="#FFF" />
    <circle cx="12" cy="12" r="2" fill="#764ABC" />
  </svg>
)

// 27. ESLint / Prettier
export const ESLintIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#4B32C3" />
    <path d="M12 5.5l6 3.5v7l-6 3.5-6-3.5v-7l6-3.5z" fill="#FFF" opacity="0.9" />
  </svg>
)

// 28. REST API
export const RestAPIIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="6" fill="#0284c7" />
    <path d="M5 8h14M5 12h10M5 16h14" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// 29. Web Security / OWASP
export const WebSecurityIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 5v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V5l-8-3z" fill="#2563EB" />
    <path d="M9 12l2 2 4-4" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// 30. Stripe API
export const StripeIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="6" fill="#635BFF" />
    <path d="M13.5 9.5c0-.8-.7-1.2-1.7-1.2-1.3 0-2.3.4-3.1 1l-.7-2c1-.7 2.4-1.1 3.9-1.1 3 0 4.8 1.4 4.8 4 0 3.3-4.5 2.8-4.5 4.2 0 .9.8 1.2 1.9 1.2 1.4 0 2.6-.5 3.4-1.1l.7 2c-1.1.8-2.6 1.3-4.2 1.3-3.2 0-5-1.5-5-4 .1-3.6 4.7-3 4.7-4.3z" fill="#FFF" />
  </svg>
)

// 31. Python (Official Dual Snake Logo in Blue & Yellow)
export const PythonIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.914 2c-5.485 0-5.143 2.378-5.143 2.378l.006 2.464h5.215v.74H4.536S2 7.29 2 12.802c0 5.514 2.21 5.328 2.21 5.328h1.318v-1.848s-.072-2.21 2.174-2.21h5.18v-.778H7.728s-1.834.03-1.834-1.782c0-1.81 1.776-1.782 1.776-1.782h9.432s2.574-.038 2.574-4.81c0-4.773-2.29-4.92-2.29-4.92H11.914zm-2.738 1.54a.972.972 0 11.002 1.944.972.972 0 01-.002-1.944z"
      fill="#3776AB"
    />
    <path
      d="M12.086 22c5.485 0 5.143-2.378 5.143-2.378l-.006-2.464h-5.215v-.74h7.456S22 16.71 22 11.198c0-5.514-2.21-5.328-2.21-5.328h-1.318v1.848s.072 2.21-2.174 2.21h-5.18v.778h5.154s1.834-.03 1.834 1.782c0 1.81-1.776 1.782-1.776 1.782H6.958s-2.574.038-2.574 4.81c0 4.773 2.29 4.92 2.29 4.92h5.402zm2.738-1.54a.972.972 0 11-.002-1.944.972.972 0 01.002 1.944z"
      fill="#FFD438"
    />
  </svg>
)

// 31b. FastAPI
export const FastAPIIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="11" fill="#009688" />
    <path d="M13 3L6 13h5l-2 8 9-11h-5l2-7z" fill="#FFF" />
  </svg>
)

// 32. Redis
export const RedisIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="6" fill="#DC382D" />
    <path d="M5 8l7-4 7 4-7 4-7-4zm0 4l7 4 7-4v4l-7 4-7-4v-4z" fill="#FFF" />
  </svg>
)

// 33. Flutter (Official Google Flutter Wing Vector)
export const FlutterIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.3 64.2L76.3 0h39.4L32.1 83.6zM76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z" fill="#40C4FF" />
    <path d="M81.6 93.9l-18.7 18.7 13.4 15.4 39.4-34.1z" fill="#01579B" />
    <path d="M81.6 93.9l34.1-34.8H76.3L42.2 93.5z" fill="#29B6F6" />
  </svg>
)

// 34. React Native (Official Cyan Atom with Mobile Badge)
export const ReactNativeIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="-12 -11 24 22" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.2" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1.1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

// 35. Google Auth (Official Google 4-Color Identity Logo)
export const GoogleAuthIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
)

// 36. Facebook Auth (Official Meta / Facebook Blue Identity Logo)
export const FacebookAuthIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#1877F2" />
    <path fill="#FFF" d="M22.5 18h-3v11h-4.5V18h-2.5v-3.8h2.5v-2.5c0-2.8 1.6-4.5 4.3-4.5 1.3 0 2.4.1 2.7.1v3.2h-1.9c-1.4 0-1.7.7-1.7 1.7v2h3.5l-.4 3.8z" />
  </svg>
)

// 37. Hostinger (Official Signature Purple Logo)
export const HostingerIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#673DE6"
      d="M16.415 0v7.16l5.785 3.384V2.949zM1.8 0v11.237h18.815L14.89 8.09l-7.457-.003V3.024zm14.615 20.894v-5.019l-7.514-.005c.007.033-5.82-3.197-5.82-3.197l19.119.091V24zM1.8 13.551v7.343l5.633 2.949v-6.988z"
    />
  </svg>
)

// 38. Laravel (Official Framework Logo)
export const LaravelIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.637 6.438a.952.952 0 00-.472-.416l-8.599-4.94a.97.97 0 00-.97 0L8.742 3.86a.958.958 0 00-.472.827v3.292l-2.072 1.189a.952.952 0 00-.472-.416L.83 5.811a.97.97 0 00-.97 0 .958.958 0 00-.472.827v9.882c0 .343.18.66.472.827l4.896 2.812a.97.97 0 00.97 0l4.896-2.812a.958.958 0 00.472-.827v-3.292l2.072-1.189a.952.952 0 00.472.416l4.896 2.812a.97.97 0 00.97 0l4.896-2.812a.958.958 0 00.472-.827V7.265a.958.958 0 00-.472-.827z"
      fill="#FF2D20"
    />
  </svg>
)

// 39. MySQL (Official Dolphin Logo)
export const MySQLIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.48 7.37c-.31-.22-.86-.55-1.57-.75-1.28-.35-2.61-.25-3.81.25-.5.21-.99.51-1.42.87-1.16.98-1.84 2.37-1.92 3.88-.08 1.48.42 2.92 1.39 4.02 1.15 1.3 2.83 2.01 4.56 1.94 1.48-.06 2.9-.66 3.97-1.7.35-.34.66-.72.92-1.13.12-.19.14-.42.06-.63-.08-.21-.26-.37-.47-.42l-1.37-.34c-.23-.06-.48.01-.65.17-.61.59-1.38.97-2.22 1.09-.97.14-1.94-.09-2.73-.66-.75-.54-1.21-1.35-1.3-2.27 1.76-.04 3.52-.39 5.16-1.02.32-.12.53-.41.53-.75.03-1.01-.33-1.99-1.1-2.55zm-4.74 3.09c.14-.92.62-1.74 1.37-2.31.54-.41 1.2-.64 1.88-.67.43-.02.85.07 1.23.26.47.23.77.67.81 1.19-1.63.63-3.41.98-5.29 1.53z"
      fill="#00758F"
    />
    <circle cx="18" cy="11.5" r="1.5" fill="#F29111" />
  </svg>
)

// 40. RASA (Official Conversational AI Logo)
export const RasaIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#5A189A" />
    <path
      d="M7 6.5h5a4 4 0 014 4v0a4 4 0 01-4 4H7v-8z"
      fill="#FFFFFF"
    />
    <path
      d="M12.5 14.5l4 4.5h-3.2l-2.8-4.5h2z"
      fill="#FF9E00"
    />
    <circle cx="12" cy="10.5" r="1.8" fill="#5A189A" />
  </svg>
)

// 41. Cloudinary (Official Media Cloud Logo)
export const CloudinaryIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
      fill="#3448C5"
    />
    <path
      d="M14 13.5a2 2 0 11-4 0 2 2 0 014 0z"
      fill="#FFFFFF"
    />
    <path
      d="M12 9.5a4 4 0 00-4 4h1.5a2.5 2.5 0 015 0H16a4 4 0 00-4-4z"
      fill="#38BDF8"
    />
  </svg>
)

// Master brand icon resolver: matches EVERY tech name with 100% authentic brand identity
export const getTechBrandIcon = (name: string, size = 20): React.ReactElement => {
  const norm = name.toLowerCase()

  // 0. Laravel, MySQL, RASA, Cloudinary (Barangay Natumolan Capstone Architecture)
  if (norm.includes('laravel')) return <LaravelIcon size={size} />
  if (norm.includes('mysql') || norm.includes('sql')) return <MySQLIcon size={size} />
  if (norm.includes('rasa')) return <RasaIcon size={size} />
  if (norm.includes('cloudinary')) return <CloudinaryIcon size={size} />

  // 1. VS Code (Check first before generic code/terminal)
  if (norm.includes('vs code') || norm.includes('vscode') || norm === 'code') {
    return <VSCodeIcon size={size} />
  }

  // 2. Postman
  if (norm.includes('postman')) {
    return <PostmanIcon size={size} />
  }

  // 3. Netlify
  if (norm.includes('netlify')) {
    return <NetlifyIcon size={size} />
  }

  // 4. Vercel
  if (norm.includes('vercel')) {
    return <VercelIcon size={size} />
  }

  // 5. Flutter
  if (norm.includes('flutter')) {
    return <FlutterIcon size={size} />
  }

  // 6. React Native
  if (norm.includes('react native') || norm.includes('native')) {
    return <ReactNativeIcon size={size} />
  }

  // 7. Google Auth
  if (norm.includes('google')) {
    return <GoogleAuthIcon size={size} />
  }

  // 8. Facebook Auth
  if (norm.includes('facebook') || norm.includes('meta')) {
    return <FacebookAuthIcon size={size} />
  }

  // 9. Hostinger & VPS Hosting
  if (norm.includes('hostinger') || norm.includes('vps')) {
    return <HostingerIcon size={size} />
  }

  // 10. Web Performance (Lighthouse)
  if (norm.includes('performance') || norm.includes('lighthouse') || norm.includes('vitals')) {
    return <LighthouseIcon size={size} />
  }

  // 11. Web Security
  if (norm.includes('security') || norm.includes('owasp')) {
    return <WebSecurityIcon size={size} />
  }

  // 7. Core Frontend & Frameworks
  if (norm.includes('react')) return <ReactIcon size={size} />
  if (norm.includes('typescript') || norm.includes('ts')) return <TypeScriptIcon size={size} />
  if (norm.includes('next')) return <NextjsIcon size={size} />
  if (norm.includes('tailwind')) return <TailwindIcon size={size} />
  if (norm.includes('node')) return <NodejsIcon size={size} />
  if (norm.includes('postgre') || norm.includes('psql')) return <PostgresIcon size={size} />
  if (norm.includes('docker')) return <DockerIcon size={size} />
  if (norm.includes('figma')) return <FigmaIcon size={size} />
  if (norm.includes('vite')) return <ViteIcon size={size} />
  if (norm.includes('motion') || norm.includes('framer')) return <FramerMotionIcon size={size} />
  if (norm.includes('git')) return <GitIcon size={size} />
  if (norm.includes('supabase') || norm.includes('firebase')) return <SupabaseIcon size={size} />
  if (norm.includes('graphql')) return <GraphQLIcon size={size} />
  if (norm.includes('prisma')) return <PrismaIcon size={size} />
  if (norm.includes('express')) return <ExpressIcon size={size} />
  if (norm.includes('mongo')) return <MongoIcon size={size} />
  if (norm.includes('linux') || norm.includes('bash') || norm.includes('terminal')) return <LinuxIcon size={size} />
  if (norm.includes('aws') || norm.includes('cloud')) return <AWSIcon size={size} />
  if (norm.includes('html')) return <HTML5Icon size={size} />
  if (norm.includes('css')) return <CSS3Icon size={size} />
  if (norm.includes('javascript') || norm === 'js') return <JavaScriptIcon size={size} />
  if (norm.includes('php')) return <PHPIcon size={size} />
  if (norm.includes('zustand') || norm.includes('redux')) return <ReduxIcon size={size} />
  if (norm.includes('eslint') || norm.includes('prettier')) return <ESLintIcon size={size} />
  if (norm.includes('rest') || norm.includes('api')) return <RestAPIIcon size={size} />
  if (norm.includes('stripe')) return <StripeIcon size={size} />
  if (norm.includes('python') || norm === 'py') return <PythonIcon size={size} />
  if (norm.includes('fastapi')) return <FastAPIIcon size={size} />
  if (norm.includes('redis')) return <RedisIcon size={size} />

  // Fallback
  return <ReactIcon size={size} />
}
