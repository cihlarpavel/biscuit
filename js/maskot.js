// Maskotka: holka s culíkem v mikině, drží sušenku. Kreslená jako SVG, ať je ostrá na každém displeji.
// nalada: 'radost' | 'mrk' | 'hmm'

export function maskot(velikost = 120, nalada = 'radost') {
  const oci = nalada === 'mrk'
    ? `<circle cx="50" cy="52" r="3.4" fill="#3b2a3f"/><path d="M66 52 q4 -3 8 0" stroke="#3b2a3f" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
    : `<circle cx="50" cy="52" r="3.4" fill="#3b2a3f"/><circle cx="70" cy="52" r="3.4" fill="#3b2a3f"/>
       <circle cx="51.2" cy="50.8" r="1.1" fill="#fff"/><circle cx="71.2" cy="50.8" r="1.1" fill="#fff"/>`;
  const pusa = nalada === 'hmm'
    ? `<path d="M55 66 q5 -2 10 0" stroke="#3b2a3f" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
    : `<path d="M53 63 q7 8 14 0" stroke="#3b2a3f" stroke-width="2.4" fill="#ff8fab" stroke-linecap="round"/>`;
  return `<svg class="maskot" width="${velikost}" height="${velikost}" viewBox="0 0 120 120" aria-hidden="true">
    <!-- culík -->
    <path d="M78 22 q26 -6 24 22 q-2 18 -14 26 q8 -18 -2 -30 z" fill="#8a4b2f"/>
    <circle cx="80" cy="24" r="5" fill="#ff6fae"/>
    <!-- mikina -->
    <path d="M28 120 q2 -30 32 -32 q30 2 32 32 z" fill="#b69cff"/>
    <path d="M52 90 l8 10 l8 -10" stroke="#9a7cf0" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <!-- hlava -->
    <ellipse cx="60" cy="56" rx="25" ry="26" fill="#ffd9c2"/>
    <path d="M34 54 q-2 -30 26 -32 q28 2 26 30 q-8 -14 -26 -16 q-16 2 -26 18 z" fill="#8a4b2f"/>
    <path d="M44 32 q10 8 22 4" stroke="#a65f3d" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${oci}
    <ellipse cx="44" cy="61" rx="4.5" ry="3" fill="#ffadc6" opacity=".8"/>
    <ellipse cx="76" cy="61" rx="4.5" ry="3" fill="#ffadc6" opacity=".8"/>
    ${pusa}
    <!-- sušenka v ruce -->
    <circle cx="94" cy="96" r="15" fill="#e6a65d" stroke="#c9843a" stroke-width="2"/>
    <circle cx="89" cy="91" r="2.2" fill="#5b3424"/><circle cx="99" cy="93" r="2.2" fill="#5b3424"/>
    <circle cx="92" cy="101" r="2.2" fill="#5b3424"/><circle cx="100" cy="102" r="1.8" fill="#5b3424"/>
    <path d="M106 90 a15 15 0 0 1 -2 14 l-6 -4 z" fill="#fff7ef"/>
    <ellipse cx="82" cy="103" rx="6" ry="5" fill="#ffd9c2"/>
    <!-- jiskřička -->
    <path d="M18 30 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 z" fill="#ffc94d"/>
  </svg>`;
}

// Čmáranice na pozadí: srdíčka, hvězdičky, jiskry, sušenky a vlnky. Jedna dlaždice se opakuje.
export const POZADI = (() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
  <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" opacity=".55">
    <path d="M30 42 c-8 -10 -22 0 -12 12 l12 12 l12 -12 c10 -12 -4 -22 -12 -12z" stroke="#ff8fbf"/>
    <path d="M160 30 l4 11 l11 4 l-11 4 l-4 11 l-4 -11 l-11 -4 l11 -4z" stroke="#c4a7ff"/>
    <circle cx="170" cy="150" r="14" stroke="#f0b46e"/><circle cx="165" cy="146" r="1.6" fill="#f0b46e"/><circle cx="175" cy="153" r="1.6" fill="#f0b46e"/>
    <path d="M40 160 q10 -10 20 0 t20 0 t20 0" stroke="#7fd8c4"/>
    <path d="M100 95 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z" stroke="#ffc94d"/>
    <path d="M200 100 c-5 -6 -13 0 -7 7 l7 7 l7 -7 c6 -7 -2 -13 -7 -7z" stroke="#c4a7ff"/>
    <circle cx="80" cy="30" r="3" stroke="#7fd8c4"/><circle cx="125" cy="190" r="3" stroke="#ff8fbf"/>
    <path d="M20 110 l6 0 m-3 -3 l0 6" stroke="#ffc94d"/><path d="M120 150 l6 0 m-3 -3 l0 6" stroke="#ff8fbf"/>
  </g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();
