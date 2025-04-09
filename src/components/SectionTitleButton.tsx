import { memoize } from "lodash"

const buttonStyle = {
  borderRadius: 4,
  color: 'gray',
  fontSize: 12,
  fontWeight: "bold",
  marginBottom: 12,
  marginLeft: -12,
  padding: '4px 12px',
  textTransform: "uppercase",
  display: 'flex',
  alignItems: 'center',
  gap: 8,
} as const

const getCarrotStyle = memoize((expanded: boolean) => ({
  width: 0,
  height: 0,
  borderLeft: '4px solid transparent',
  borderRight: '4px solid transparent',
  borderTop: '6px solid gray',
  opacity: 0,
  transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
  transition: 'transform 0.2s ease',
} as const))

export const SectionTitleButton = ({
  length,
  title,
  toggle,
  expanded,
}: {
  length: number
  title: string
  toggle: () => void
  expanded: boolean
}) => (
  <button
    className="section-title-button"
    onClick={toggle}
    style={buttonStyle}
  >
    {title} ({length})
    <div
      className="section-title-button-carrot"
      style={getCarrotStyle(expanded)}
    />
  </button>
)


