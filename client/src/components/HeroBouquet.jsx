import React from 'react';

export default function HeroBouquet({ className = '' }) {
  return (
    <svg
      viewBox="0 0 320 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Stems */}
      <g opacity="0.85">
        <path d="M160 400 C158 340, 140 300, 135 260" stroke="#5A7A50" strokeWidth="3" strokeLinecap="round"/>
        <path d="M160 400 C162 335, 170 290, 175 255" stroke="#6A8A60" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M160 400 C155 350, 125 310, 110 275" stroke="#5A7A50" strokeWidth="2" strokeLinecap="round"/>
        <path d="M160 400 C165 345, 190 305, 200 265" stroke="#6A8A60" strokeWidth="2" strokeLinecap="round"/>
        <path d="M160 400 C150 355, 115 320, 95 290"  stroke="#7A9A70" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M160 400 C170 350, 205 315, 220 280" stroke="#7A9A70" strokeWidth="1.8" strokeLinecap="round"/>
      </g>

      {/* Leaves */}
      <g opacity="0.70">
        <ellipse cx="120" cy="310" rx="18" ry="8" transform="rotate(-35 120 310)" fill="#7A9A70"/>
        <ellipse cx="195" cy="305" rx="16" ry="7" transform="rotate(30 195 305)"  fill="#6A8A60"/>
        <ellipse cx="105" cy="285" rx="14" ry="6" transform="rotate(-50 105 285)" fill="#9AB890"/>
        <ellipse cx="210" cy="285" rx="13" ry="5.5" transform="rotate(45 210 285)" fill="#8AA880"/>
        <ellipse cx="140" cy="325" rx="12" ry="5" transform="rotate(-25 140 325)" fill="#8AA880"/>
        <ellipse cx="180" cy="320" rx="11" ry="5" transform="rotate(20 180 320)"  fill="#9AB890"/>
      </g>

      {/* ── Blooms ── */}

      {/* Sunflower yellow gerbera – center */}
      <g>
        <circle cx="155" cy="230" r="30" fill="#F8D878" opacity="0.55"/>
        <ellipse cx="155" cy="230" rx="24" ry="22" fill="#E8A020" opacity="0.75"/>
        <ellipse cx="150" cy="225" rx="13" ry="12" fill="#F5DC90" opacity="0.85"/>
        <circle  cx="155" cy="229" r="7"  fill="#8B4A10" opacity="0.55"/>
        <circle  cx="155" cy="229" r="3.5" fill="#5A2A08" opacity="0.5"/>
      </g>

      {/* Burnt orange dahlia – upper right */}
      <g>
        <circle cx="196" cy="213" r="23" fill="#E07840" opacity="0.50"/>
        <ellipse cx="196" cy="211" rx="18" ry="17" fill="#C8581A" opacity="0.68"/>
        <ellipse cx="194" cy="208" rx="10" ry="9"  fill="#F0A878" opacity="0.80"/>
        <ellipse cx="197" cy="213" rx="5.5" ry="5" fill="#FAD0B0" opacity="0.90"/>
      </g>

      {/* Deep crimson rose – upper left */}
      <g>
        <circle cx="114" cy="224" r="22" fill="#C04060" opacity="0.45"/>
        <ellipse cx="114" cy="222" rx="17" ry="16" fill="#8B1A2A" opacity="0.62"/>
        <ellipse cx="112" cy="219" rx="10" ry="9"  fill="#E08090" opacity="0.75"/>
        <ellipse cx="115" cy="222" rx="5.5" ry="5" fill="#FAC0C8" opacity="0.85"/>
      </g>

      {/* Coral pink bloom – top center */}
      <g>
        <circle cx="160" cy="192" r="19" fill="#E87878" opacity="0.45"/>
        <ellipse cx="160" cy="190" rx="14" ry="13" fill="#E07070" opacity="0.62"/>
        <ellipse cx="158" cy="188" rx="8"  ry="7.5" fill="#F5B0B0" opacity="0.80"/>
        <circle  cx="160" cy="190" r="3.5" fill="#FDE0E0" opacity="0.90"/>
      </g>

      {/* Golden amber ranunculus – right */}
      <g>
        <circle cx="211" cy="250" r="17" fill="#F0C060" opacity="0.52"/>
        <ellipse cx="211" cy="248" rx="13" ry="12" fill="#E8A020" opacity="0.68"/>
        <ellipse cx="209" cy="246" rx="7.5" ry="7" fill="#FAD878" opacity="0.82"/>
        <circle  cx="211" cy="248" r="3.5" fill="#FFF0B0" opacity="0.90"/>
      </g>

      {/* Peach rose – left */}
      <g>
        <circle cx="94" cy="257" r="17" fill="#F8C898" opacity="0.55"/>
        <ellipse cx="94" cy="255" rx="13" ry="12" fill="#E8A070" opacity="0.68"/>
        <ellipse cx="92" cy="253" rx="7.5" ry="7" fill="#FAD8B8" opacity="0.82"/>
        <circle  cx="94" cy="254" r="3"   fill="#FFF0E0" opacity="0.90"/>
      </g>

      {/* Small filler blooms */}
      <g opacity="0.65">
        <circle cx="130" cy="200" r="4"   fill="#FAF0D0"/>
        <circle cx="125" cy="208" r="3"   fill="#F8E0A0"/>
        <circle cx="186" cy="198" r="3.5" fill="#FAF0D0"/>
        <circle cx="191" cy="205" r="2.5" fill="#F8D0B0"/>
        <circle cx="79"  cy="248" r="3"   fill="#FAF0D0"/>
        <circle cx="231" cy="245" r="3"   fill="#FAF0D0"/>
        <circle cx="140" cy="195" r="2.5" fill="#F8E8C0"/>
        <circle cx="176" cy="195" r="2.5" fill="#F8E8C0"/>
        <circle cx="226" cy="255" r="2.5" fill="#FAF0D0"/>
        <circle cx="81"  cy="265" r="2"   fill="#F8D0C0"/>
      </g>

      {/* Eucalyptus accent sprigs */}
      <g opacity="0.58">
        <ellipse cx="140" cy="198" rx="10" ry="4" transform="rotate(-60 140 198)" fill="#7A9A70"/>
        <ellipse cx="186" cy="200" rx="9"  ry="3.5" transform="rotate(55 186 200)" fill="#8AA880"/>
        <ellipse cx="226" cy="260" rx="8"  ry="3" transform="rotate(40 226 260)"  fill="#9AB890"/>
        <ellipse cx="77"  cy="250" rx="8"  ry="3" transform="rotate(-40 77 250)"  fill="#9AB890"/>
      </g>

      {/* Ribbon wrap */}
      <g>
        <path d="M140 355 Q155 340, 160 350 Q165 340, 180 355" stroke="#E8A020" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M145 362 Q158 348, 162 358 Q166 348, 175 362" stroke="#F0C060" strokeWidth="2"   fill="none" strokeLinecap="round"/>
        <path d="M148 340 C142 365, 155 375, 148 400"          stroke="#E8A020" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M172 340 C178 365, 165 375, 172 400"          stroke="#F0C060" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}
