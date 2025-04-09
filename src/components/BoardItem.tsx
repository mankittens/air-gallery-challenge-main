import { Board } from "@/api/boards";
import { memoize } from "lodash";

const getStyle = memoize((thumbnail: string | undefined) => ({
  backgroundImage: `url(${thumbnail})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "150px",
  aspectRatio: 1,
  position: "relative",
  display: "flex",
  alignItems: "end",
  borderRadius: 2,
  overflow: "hidden",
} as const))

const gradientStyle = {
  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7))",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const

const titleStyle = {
  color: 'white',
  cursor: "pointer",
  position: 'relative',
  padding: 10,
  zIndex: 1,
} as const

export const BoardItem = ({board}: {board: Board}) => {
  const thumbnail = board.thumbnails?.[0]

  return (
    <div
      key={board.id}
      style={getStyle(thumbnail)}
    >
      <div style={gradientStyle}/>
      <span style={titleStyle}>{board.title}</span>
    </div>
  )
}
