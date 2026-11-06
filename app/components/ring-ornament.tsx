/** Fine botanical linework and the small diamond echo Samantha’s ring. */
export default function RingOrnament() {
  return (
    <svg className="ring-ornament" viewBox="0 0 70 48" width="70" height="48"
      fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M35 15L44 24L35 33L26 24ZM35 20L39 24L35 28L31 24Z" />
      <path d="M23 24C17 25 15 30 9 28C11 23 16 22 23 24ZM47 24C53 23 55 18 61 20C59 25 54 26 47 24ZM9 28C15 29 19 28 23 24M61 20C55 19 51 20 47 24" />
    </svg>
  );
}

export function RingCorners() {
  return (
    <span className="ring-corners" aria-hidden="true">
      {["top", "bottom"].map((corner) => (
        <svg key={corner} className={`ring-corner ring-corner-${corner}`}
          viewBox="0 0 100 100" width="100" height="100" fill="none"
          stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"
          strokeLinejoin="round" focusable="false">
          <path d="M14 86C34 75 26 49 46 35C64 22 82 25 85 10M30 64C19 60 16 46 23 40C29 34 39 36 40 44C41 51 32 53 30 48C29 45 32 43 34 45M49 34C43 22 53 13 62 16C72 20 66 30 60 27C57 25 59 22 61 22" />
          <path d="M34 60C36 48 45 45 52 47C49 50 49 55 45 58C42 61 39 61 34 60ZM44 39C48 37 51 32 56 34C58 28 65 29 70 31C64 39 55 44 44 39ZM27 73C30 79 40 80 48 75C43 68 34 66 27 73Z" />
          <path d="M36 58L48 49M47 38L66 32M30 73L44 75M19 84C31 81 37 85 46 83" strokeWidth=".65" />
          <path d="M76 16L80 20L76 24L72 20Z" strokeWidth=".9" />
        </svg>
      ))}
    </span>
  );
}
