import { Gallery } from "react-grid-gallery";
import { Board } from "@/api/boards";
import { ClipsListResponse } from "@/api/clips";
import { Section } from "./Section";
import { BoardItem } from "./BoardItem";
import { getGalleryImage } from "./getGalleryImage";
import { Masonry } from "masonic";
import { useState } from "react";

const style = {
  padding: 32,
} as const

const boardsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
} as const

const buttonContainerStyle = {
  marginBottom: 16,
  display: 'flex',
  gap: 8,
  alignItems: 'center',
} as const

const buttonStyle = {
  fontSize: 12,
  padding: '4px 8px',
  borderRadius: 4,
  border: '1px solid lightgray',
  backgroundColor: 'white',
} as const

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'blue',
  color: 'white',
  borderColor: 'blue',
} as const

export const BoardView = ({
  boards,
  clipsResponse,
}: {
  boards: Board[]
  clipsResponse: ClipsListResponse['data']
}) => {
  const [useMasonic, setUseMasonic] = useState(false);
  const images = clipsResponse.clips.map(getGalleryImage);

  return (
    <div style={style}>
      <Section length={boards.length} title="Boards">
        <div style={boardsStyle}>
          {boards.map((board) => (
            <BoardItem key={board.id} board={board} />
          ))}
        </div>
      </Section>
      <Section length={clipsResponse.total} title="Assets">
        <div style={buttonContainerStyle}>
          <button
            style={!useMasonic ? activeButtonStyle : buttonStyle}
            onClick={() => setUseMasonic(false)}
          >
            Grid
          </button>
          <button
            style={useMasonic ? activeButtonStyle : buttonStyle}
            onClick={() => setUseMasonic(true)}
          >
            Masonry
          </button>
        </div>
        {useMasonic ? (
          <Masonry
            // Experimental: has issues rendering newly loaded assets, but is much faster; does not use the same grid layout as Air
            items={images}
            columnGutter={8}
            columnWidth={300}
            overscanBy={2}
            render={({ data }) => (
              <img
                src={data.src}
                alt=""
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            )}
          />
        ) : (
          <Gallery
            images={images}
            enableImageSelection={false}
            margin={8}
            rowHeight={300}
            maxRows={Infinity}
          />
        )}
      </Section>
    </div>
  );
}
