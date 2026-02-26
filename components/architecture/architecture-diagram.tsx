'use client'

export function ArchitectureDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg 
        viewBox="0 0 1000 800" 
        className="w-full min-w-max"
        style={{ maxWidth: '1000px' }}
      >
        {/* Background */}
        <rect width="1000" height="800" fill="white" />

        {/* Title */}
        <text x="500" y="40" fontSize="28" fontWeight="bold" textAnchor="middle" fill="#000">
          Arquitectura del Sistema de 3 Capas
        </text>

        {/* LAYER 1: PRESENTACIÓN */}
        <g>
          {/* Background */}
          <rect x="50" y="100" width="250" height="300" rx="10" fill="#FFE5E5" stroke="#D31219" strokeWidth="2" />
          
          {/* Title */}
          <text x="175" y="135" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#D31219">
            CAPA 1: Presentación
          </text>

          {/* Content */}
          <text x="70" y="170" fontSize="13" fontWeight="bold" fill="#000">Frontend</text>
          <text x="70" y="190" fontSize="12" fill="#333">• Next.js 16</text>
          <text x="70" y="210" fontSize="12" fill="#333">• React 19</text>
          <text x="70" y="230" fontSize="12" fill="#333">• Tailwind CSS</text>

          <text x="70" y="260" fontSize="13" fontWeight="bold" fill="#000">Interfaces</text>
          <text x="70" y="280" fontSize="12" fill="#333">• Mobile Navigation</text>
          <text x="70" y="300" fontSize="12" fill="#333">• Report Forms</text>
          <text x="70" y="320" fontSize="12" fill="#333">• Task Dashboard</text>
          <text x="70" y="340" fontSize="12" fill="#333">• Admin Panel</text>
        </g>

        {/* Arrow 1 to 2 */}
        <path d="M 310 250 L 370 250" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* LAYER 2: LÓGICA */}
        <g>
          {/* Background */}
          <rect x="375" y="100" width="250" height="300" rx="10" fill="#FFF5E5" stroke="#B28A12" strokeWidth="2" />
          
          {/* Title */}
          <text x="500" y="135" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#B28A12">
            CAPA 2: Lógica
          </text>

          {/* Content */}
          <text x="395" y="170" fontSize="13" fontWeight="bold" fill="#000">TypeScript</text>
          <text x="395" y="190" fontSize="12" fill="#333">• Type System</text>
          <text x="395" y="210" fontSize="12" fill="#333">• Validación</text>

          <text x="395" y="240" fontSize="13" fontWeight="bold" fill="#000">AI Processing</text>
          <text x="395" y="260" fontSize="12" fill="#333">• Computer Vision</text>
          <text x="395" y="280" fontSize="12" fill="#333">• Priorización Auto</text>
          <text x="395" y="300" fontSize="12" fill="#333">• Asignación Smart</text>
          <text x="395" y="320" fontSize="12" fill="#333">• Cálc. Complejidad</text>

          <text x="395" y="350" fontSize="13" fontWeight="bold" fill="#000">Server Actions</text>
          <text x="395" y="370" fontSize="12" fill="#333">• CRUD Operations</text>
        </g>

        {/* Arrow 2 to 3 */}
        <path d="M 635 250 L 695 250" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* LAYER 3: DATOS */}
        <g>
          {/* Background */}
          <rect x="700" y="100" width="250" height="300" rx="10" fill="#E5F5E5" stroke="#2D8A3C" strokeWidth="2" />
          
          {/* Title */}
          <text x="825" y="135" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#2D8A3C">
            CAPA 3: Datos
          </text>

          {/* Content */}
          <text x="720" y="170" fontSize="13" fontWeight="bold" fill="#000">PostgreSQL</text>
          <text x="720" y="190" fontSize="12" fill="#333">• 100% Portable</text>
          <text x="720" y="210" fontSize="12" fill="#333">• RLS Security</text>

          <text x="720" y="240" fontSize="13" fontWeight="bold" fill="#000">Tablas Principales</text>
          <text x="720" y="260" fontSize="12" fill="#333">• Users / Workers</text>
          <text x="720" y="280" fontSize="12" fill="#333">• Reports</text>
          <text x="720" y="300" fontSize="12" fill="#333">• Tasks</text>
          <text x="720" y="320" fontSize="12" fill="#333">• Configuration</text>

          <text x="720" y="350" fontSize="13" fontWeight="bold" fill="#000">Características</text>
          <text x="720" y="370" fontSize="12" fill="#333">• Relaciones normalizadas</text>
        </g>

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#666" />
          </marker>
        </defs>

        {/* Bottom section: Data Flow */}
        <text x="500" y="450" fontSize="20" fontWeight="bold" textAnchor="middle" fill="#000">
          Flujo de Datos
        </text>

        {/* Flow steps */}
        <g>
          {/* Step 1 */}
          <circle cx="100" cy="520" r="25" fill="#D31219" />
          <text x="100" y="530" fontSize="18" fontWeight="bold" textAnchor="middle" fill="white">1</text>
          <text x="100" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#000">Usuario reporta</text>
          <text x="100" y="585" fontSize="11" textAnchor="middle" fill="#666">Imagen + Descripción</text>

          {/* Arrow */}
          <path d="M 130 520 L 210 520" stroke="#999" strokeWidth="2" markerEnd="url(#arrowhead2)" />

          {/* Step 2 */}
          <circle cx="260" cy="520" r="25" fill="#B28A12" />
          <text x="260" y="530" fontSize="18" fontWeight="bold" textAnchor="middle" fill="white">2</text>
          <text x="260" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#000">IA procesa</text>
          <text x="260" y="585" fontSize="11" textAnchor="middle" fill="#666">Análisis + Clasificación</text>

          {/* Arrow */}
          <path d="M 290 520 L 370 520" stroke="#999" strokeWidth="2" markerEnd="url(#arrowhead2)" />

          {/* Step 3 */}
          <circle cx="420" cy="520" r="25" fill="#2D8A3C" />
          <text x="420" y="530" fontSize="18" fontWeight="bold" textAnchor="middle" fill="white">3</text>
          <text x="420" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#000">Almacena BD</text>
          <text x="420" y="585" fontSize="11" textAnchor="middle" fill="#666">Prioridad + Asignación</text>

          {/* Arrow */}
          <path d="M 450 520 L 530 520" stroke="#999" strokeWidth="2" markerEnd="url(#arrowhead2)" />

          {/* Step 4 */}
          <circle cx="580" cy="520" r="25" fill="#D31219" />
          <text x="580" y="530" fontSize="18" fontWeight="bold" textAnchor="middle" fill="white">4</text>
          <text x="580" y="570" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#000">Dashboard</text>
          <text x="580" y="585" fontSize="11" textAnchor="middle" fill="#666">Coordinador notificado</text>
        </g>

        {/* Arrow marker 2 */}
        <defs>
          <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#999" />
          </marker>
        </defs>

        {/* Benefits */}
        <text x="500" y="680" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#000">
          Beneficios de esta Arquitectura
        </text>

        <g>
          <text x="100" y="730" fontSize="12" fill="#000">✓ Escalabilidad horizontal</text>
          <text x="100" y="750" fontSize="12" fill="#000">✓ Separación de responsabilidades</text>

          <text x="450" y="730" fontSize="12" fill="#000">✓ Fácil mantenimiento</text>
          <text x="450" y="750" fontSize="12" fill="#000">✓ Testing simplificado</text>

          <text x="750" y="730" fontSize="12" fill="#000">✓ Performance optimizado</text>
          <text x="750" y="750" fontSize="12" fill="#000">✓ Seguridad en capas</text>
        </g>
      </svg>
    </div>
  )
}
