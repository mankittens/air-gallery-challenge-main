import { Gallery } from "react-grid-gallery";
import { Board } from "@/api/boards";
import {  ClipsListResponse } from "@/api/clips";
import { Section } from "./Section";
import { BoardItem } from "./BoardItem";
import { getGalleryImage } from "./getGalleryImage";

export const BoardView = ({
  boards,
  clipsResponse,
}: {
  boards: Board[]
  clipsResponse: ClipsListResponse['data']
}) => (
  <div
    style={{
      padding: 32,
    }}
  >
    <Section length={boards.length} title="Boards">
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
      }}>
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
