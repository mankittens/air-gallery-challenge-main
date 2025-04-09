import { Gallery } from "react-grid-gallery";
import { Board } from "@/api/boards";
import {  ClipsListResponse } from "@/api/clips";
import { Section } from "./Section";
import { BoardItem } from "./BoardItem";
import { getGalleryImage } from "./getGalleryImage";

const style = {
  padding: 32,
} as const

const boardsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
} as const

export const BoardView = ({
  boards,
  clipsResponse,
}: {
  boards: Board[]
  clipsResponse: ClipsListResponse['data']
}) => (
  <div
    style={style}
  >
    <Section length={boards.length} title="Boards">
      <div style={boardsStyle}>
        {boards.map((board) => (
          <BoardItem key={board.id} board={board} />
        ))}
      </div>
    </Section>
    <Section length={clipsResponse.total} title="Assets">
      <Gallery
        images={clipsResponse.clips.map(getGalleryImage)}
        enableImageSelection={false}
        margin={8}
        rowHeight={300}
        maxRows={Infinity}
      />
    </Section>
  </div>
)
