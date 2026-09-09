export default function CallCard() {
  return (
    <svg viewBox="0 0 560 460" className="call-card-svg" role="img" aria-label="Illustration of an AI agent handling and booking an inbound call">
      <defs>
        <linearGradient id="cc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3F5EFF" />
          <stop offset="55%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#00C2A8" />
        </linearGradient>
      </defs>

      {/* backdrop shape */}
      <rect x="0" y="30" width="560" height="400" rx="18" fill="#12141C" />
      <circle cx="500" cy="60" r="130" fill="url(#cc-grad)" opacity="0.12" />

      {/* top bar */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#9296A6">
        <text x="32" y="70">INBOUND CALL</text>
        <circle className="cc-blink" cx="500" cy="65" r="4" fill="#00C2A8" />
        <text x="512" y="70" fill="#00C2A8">LIVE</text>
      </g>
      <line x1="32" y1="86" x2="528" y2="86" stroke="rgba(245,243,238,0.12)" />

      {/* caller row */}
      <circle cx="56" cy="126" r="18" fill="#2A2D3A" />
      <text x="56" y="131" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="14" fill="#F5F3EE">DM</text>
      <text x="88" y="122" fontFamily="Space Grotesk, sans-serif" fontWeight="600" fontSize="16" fill="#F5F3EE">Dana M.</text>
      <text x="88" y="140" fontFamily="Inter, sans-serif" fontSize="12.5" fill="#9296A6">HVAC — no cool, upstairs unit</text>

      {/* waveform */}
      <g className="cc-wave">
        {Array.from({ length: 22 }).map((_, i) => {
          const h = 10 + ((i * 29) % 34)
          return (
            <rect
              key={i}
              x={32 + i * 22.5}
              y={200 - h}
              width="9"
              height={h}
              rx="2"
              fill="url(#cc-grad)"
              style={{ animationDelay: `${(i % 6) * 0.11}s` }}
            />
          )
        })}
      </g>

      {/* checklist */}
      <g fontFamily="Inter, sans-serif" fontSize="13.5" fill="#DCDAD1">
        <g transform="translate(32,238)">
          <circle r="8" fill="rgba(0,194,168,0.18)" />
          <path d="M-3.5 0 L-1 2.5 L3.5 -3" stroke="#00C2A8" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="20" y="4">Return customer, verified</text>
        </g>
        <g transform="translate(32,272)">
          <circle r="8" fill="rgba(0,194,168,0.18)" />
          <path d="M-3.5 0 L-1 2.5 L3.5 -3" stroke="#00C2A8" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="20" y="4">Booked: Thursday, 2:00 PM</text>
        </g>
        <g transform="translate(32,306)">
          <circle r="8" fill="rgba(0,194,168,0.18)" />
          <path d="M-3.5 0 L-1 2.5 L3.5 -3" stroke="#00C2A8" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="20" y="4">Confirmation texted to customer</text>
        </g>
      </g>

      {/* estimate chip */}
      <g transform="translate(330,232)">
        <rect width="198" height="90" rx="10" fill="#1B1E29" stroke="rgba(245,243,238,0.1)" />
        <text x="18" y="28" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#9296A6">EST. JOB VALUE</text>
        <text x="18" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="600" fontSize="24" fill="#F5F3EE">$220&#8211;$340</text>
        <text x="18" y="76" fontFamily="Inter, sans-serif" fontSize="11.5" fill="#767B8C">based on job history</text>
      </g>

      <line x1="32" y1="352" x2="528" y2="352" stroke="rgba(245,243,238,0.12)" />
      <text x="32" y="378" fontFamily="IBM Plex Mono, monospace" fontSize="11.5" fill="#767B8C">Handled in 41s, no hold music, no voicemail.</text>
    </svg>
  )
}
