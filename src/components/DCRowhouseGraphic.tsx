import React from 'react';

export const DCRowhouseGraphic: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg
      viewBox="0 0 900 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Washington DC Historic Rowhouses and Capitol Skyline"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B192C" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0B192C" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="rowhouse1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B94E48" />
          <stop offset="100%" stopColor="#873430" />
        </linearGradient>
        <linearGradient id="rowhouse2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9822B" />
          <stop offset="100%" stopColor="#A85B17" />
        </linearGradient>
        <linearGradient id="rowhouse3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3E62" />
          <stop offset="100%" stopColor="#0B192C" />
        </linearGradient>
        <linearGradient id="rowhouse4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#43766C" />
          <stop offset="100%" stopColor="#2D544C" />
        </linearGradient>
      </defs>

      {/* Sky subtle backdrop */}
      <rect x="0" y="0" width="900" height="280" fill="url(#skyGrad)" rx="16" />

      {/* Background Capitol Silhouette */}
      <g opacity="0.18">
        <path d="M780 180 V130 Q780 120 790 115 Q790 90 805 75 Q805 60 807 50 L808 35 L809 50 Q811 60 811 75 Q826 90 826 115 Q836 120 836 130 V180 Z" fill="#0B192C" />
        <rect x="750" y="150" width="116" height="30" fill="#0B192C" />
        <rect x="740" y="180" width="136" height="5" fill="#0B192C" />
      </g>

      {/* Ground Street line */}
      <line x1="20" y1="245" x2="880" y2="245" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="250" x2="880" y2="250" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="8 8" />

      {/* Rowhouse 1: Red Brick Victorian with Mansard Turret (Capitol Hill style) */}
      <g>
        <rect x="50" y="70" width="160" height="175" fill="url(#rowhouse1)" rx="2" />
        {/* Turret / Roof cornice */}
        <polygon points="45,70 130,20 135,20 145,70" fill="#2E3842" />
        <rect x="45" y="65" width="170" height="8" fill="#D1D5DB" rx="1" />
        <circle cx="90" cy="45" r="9" fill="#F1F5F9" />
        <circle cx="90" cy="45" r="7" fill="#2E3842" />
        
        {/* Windows level 3 */}
        <rect x="70" y="88" width="28" height="38" rx="14" fill="#FEF08A" stroke="#475569" strokeWidth="2" />
        <line x1="84" y1="88" x2="84" y2="126" stroke="#475569" strokeWidth="1.5" />
        <line x1="70" y1="107" x2="98" y2="107" stroke="#475569" strokeWidth="1.5" />

        <rect x="115" y="88" width="28" height="38" rx="14" fill="#FEF08A" stroke="#475569" strokeWidth="2" />
        <line x1="129" y1="88" x2="129" y2="126" stroke="#475569" strokeWidth="1.5" />
        <line x1="115" y1="107" x2="143" y2="107" stroke="#475569" strokeWidth="1.5" />

        <rect x="160" y="88" width="28" height="38" rx="14" fill="#FEF08A" stroke="#475569" strokeWidth="2" />
        <line x1="174" y1="88" x2="174" y2="126" stroke="#475569" strokeWidth="1.5" />

        {/* Windows level 2 */}
        <rect x="70" y="140" width="28" height="42" rx="4" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
        <line x1="84" y1="140" x2="84" y2="182" stroke="#475569" strokeWidth="1.5" />
        <rect x="115" y="140" width="28" height="42" rx="4" fill="#FEF08A" stroke="#475569" strokeWidth="2" />
        <line x1="129" y1="140" x2="129" y2="182" stroke="#475569" strokeWidth="1.5" />
        <rect x="160" y="140" width="28" height="42" rx="4" fill="#FEF08A" stroke="#475569" strokeWidth="2" />
        <line x1="174" y1="140" x2="174" y2="182" stroke="#475569" strokeWidth="1.5" />

        {/* English basement & Stoop */}
        <rect x="70" y="200" width="24" height="25" rx="3" fill="#334155" stroke="#475569" strokeWidth="2" />
        {/* Front Door with Transom */}
        <rect x="145" y="195" width="35" height="50" rx="3" fill="#1E293B" />
        <rect x="148" y="198" width="29" height="14" rx="2" fill="#FEF08A" opacity="0.8" />
        <circle cx="172" cy="225" r="2.5" fill="#E2E8F0" />
        {/* Stoop steps */}
        <polygon points="140,245 185,245 180,230 145,230" fill="#94A3B8" />
        <line x1="142" y1="237" x2="182" y2="237" stroke="#64748B" strokeWidth="1" />
      </g>

      {/* Rowhouse 2: Warm Ochre Italianate (Dupont/Shaw style) */}
      <g>
        <rect x="220" y="85" width="150" height="160" fill="url(#rowhouse2)" rx="2" />
        {/* Ornate Italianate Bracketed Cornice */}
        <rect x="215" y="80" width="160" height="10" fill="#F8FAFC" rx="1" />
        <rect x="220" y="74" width="150" height="6" fill="#475569" />
        <circle cx="235" cy="85" r="3" fill="#CBD5E1" />
        <circle cx="265" cy="85" r="3" fill="#CBD5E1" />
        <circle cx="295" cy="85" r="3" fill="#CBD5E1" />
        <circle cx="325" cy="85" r="3" fill="#CBD5E1" />
        <circle cx="355" cy="85" r="3" fill="#CBD5E1" />

        {/* Arched windows level 2 */}
        <rect x="240" y="105" width="26" height="40" rx="13" fill="#FEF08A" stroke="#1E293B" strokeWidth="2" />
        <rect x="282" y="105" width="26" height="40" rx="13" fill="#FEF08A" stroke="#1E293B" strokeWidth="2" />
        <rect x="324" y="105" width="26" height="40" rx="13" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />

        {/* Windows level 1 */}
        <rect x="240" y="155" width="26" height="40" rx="4" fill="#FEF08A" stroke="#1E293B" strokeWidth="2" />
        <rect x="282" y="155" width="26" height="40" rx="4" fill="#FEF08A" stroke="#1E293B" strokeWidth="2" />

        {/* Front Door */}
        <rect x="320" y="175" width="34" height="70" rx="3" fill="#0F172A" />
        <circle cx="328" cy="210" r="2.5" fill="#EAB308" />
        {/* Historic DC gas lamp */}
        <line x1="365" y1="210" x2="365" y2="190" stroke="#1E293B" strokeWidth="2" />
        <polygon points="360,190 370,190 367,180 363,180" fill="#FEF08A" stroke="#1E293B" strokeWidth="1" />
      </g>

      {/* Rowhouse 3: Midnight Federal Rowhouse (Georgetown style) */}
      <g>
        <rect x="380" y="60" width="165" height="185" fill="url(#rowhouse3)" rx="2" />
        {/* Dormer Windows on Gabled Roof */}
        <polygon points="380,60 462,25 545,60" fill="#334155" />
        {/* Dormer 1 */}
        <polygon points="410,50 425,35 440,50" fill="#F8FAFC" />
        <rect x="415" y="45" width="20" height="15" fill="#FEF08A" stroke="#1E293B" strokeWidth="1" />
        {/* Dormer 2 */}
        <polygon points="485,50 500,35 515,50" fill="#F8FAFC" />
        <rect x="490" y="45" width="20" height="15" fill="#FEF08A" stroke="#1E293B" strokeWidth="1" />

        {/* White lintels and sills */}
        {/* 3rd Floor */}
        <rect x="400" y="75" width="30" height="35" rx="3" fill="#FEF08A" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="447" y="75" width="30" height="35" rx="3" fill="#FEF08A" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="495" y="75" width="30" height="35" rx="3" fill="#FEF08A" stroke="#E2E8F0" strokeWidth="2" />

        {/* 2nd Floor */}
        <rect x="400" y="125" width="30" height="38" rx="3" fill="#FEF08A" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="447" y="125" width="30" height="38" rx="3" fill="#E2E8F0" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="495" y="125" width="30" height="38" rx="3" fill="#FEF08A" stroke="#E2E8F0" strokeWidth="2" />

        {/* 1st Floor & Grand Front Entrance */}
        <rect x="400" y="180" width="30" height="42" rx="3" fill="#FEF08A" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="447" y="180" width="30" height="42" rx="3" fill="#FEF08A" stroke="#E2E8F0" strokeWidth="2" />
        
        {/* Federal Portico / Transom Fanlight */}
        <path d="M490 190 Q510 175 530 190 Z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="1.5" />
        <rect x="495" y="190" width="30" height="55" rx="2" fill="#B91C1C" />
        <circle cx="520" cy="218" r="2.5" fill="#FEF08A" />
      </g>

      {/* Rowhouse 4: Forest Sage Bay-Front (Petworth/Bloomingdale style) */}
      <g>
        <rect x="555" y="80" width="160" height="165" fill="url(#rowhouse4)" rx="2" />
        <rect x="550" y="75" width="170" height="8" fill="#F1F5F9" rx="1" />
        {/* Projecting 2-story Bay Window */}
        <polygon points="575,95 635,95 645,210 565,210" fill="#24453E" opacity="0.4" />
        
        <rect x="580" y="100" width="22" height="35" rx="3" fill="#FEF08A" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="608" y="100" width="22" height="35" rx="3" fill="#FEF08A" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="670" y="100" width="26" height="35" rx="3" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />

        <rect x="580" y="150" width="22" height="38" rx="3" fill="#FEF08A" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="608" y="150" width="22" height="38" rx="3" fill="#FEF08A" stroke="#CBD5E1" strokeWidth="1.5" />
        
        {/* Front Porch with Pillars */}
        <rect x="655" y="170" width="55" height="75" fill="#1C332E" />
        <rect x="660" y="175" width="6" height="70" fill="#F8FAFC" />
        <rect x="700" y="175" width="6" height="70" fill="#F8FAFC" />
        <rect x="670" y="185" width="26" height="60" fill="#0F172A" />
        <circle cx="676" cy="215" r="2" fill="#E2E8F0" />
      </g>

      {/* DC Streetscape Elements: Trees, Bike Share, Bench */}
      {/* Historic Ginkgo / Cherry Blossom Street Tree */}
      <g>
        <path d="M740 245 C740 210 745 190 755 170 C750 140 760 110 780 90 C800 70 840 80 855 110 C870 140 850 180 830 190 C815 195 810 220 810 245 Z" fill="#2D5A27" opacity="0.85" />
        <circle cx="790" cy="115" r="14" fill="#E879F9" opacity="0.5" />
        <circle cx="835" cy="130" r="12" fill="#F472B6" opacity="0.6" />
        <circle cx="770" cy="140" r="15" fill="#FBCFE8" opacity="0.6" />
        {/* Trunk */}
        <path d="M775 245 L780 170 Q782 155 788 145" stroke="#4A3525" strokeWidth="7" strokeLinecap="round" />
      </g>

      {/* Street tree 2 */}
      <g>
        <path d="M25 245 L30 180 Q32 165 38 155" stroke="#4A3525" strokeWidth="6" strokeLinecap="round" />
        <circle cx="35" cy="150" r="28" fill="#3B7A32" opacity="0.8" />
        <circle cx="45" cy="140" r="16" fill="#F472B6" opacity="0.5" />
      </g>
    </svg>
  );
};
