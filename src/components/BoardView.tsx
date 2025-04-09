import { Gallery } from "react-grid-gallery";
import { Board } from "@/api/boards";
import { ClipsListResponse } from "@/api/clips";
import { Section } from "./Section";
import { BoardItem } from "./BoardItem";
import { getGalleryImage } from "./getGalleryImage";
import { useState, useMemo } from "react";
import { List, AutoSizer, ListRowRenderer } from "react-virtualized";
import justifiedLayout from "justified-layout";

interface GalleryImage {
  src: string;
  width: number;
  height: number;
}

interface JustifiedGalleryProps {
  images: GalleryImage[];
  containerWidth: number;
}

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

const IMAGE_MARGIN = 8;
const TARGET_ROW_HEIGHT = 160;

function JustifiedGallery({ images, containerWidth }: JustifiedGalleryProps) {
  const aspectRatios = useMemo(
    () => images.map((img) => img.width / img.height),
    [images]
  );

  const layout = useMemo(() => {
    return justifiedLayout(aspectRatios, {
      containerWidth,
      targetRowHeight: TARGET_ROW_HEIGHT,
      boxSpacing: IMAGE_MARGIN,
    });
  }, [aspectRatios, containerWidth]);

  const rows: {
    aspectRatio: number;
    top: number;
    width: number;
    height: number;
    left: number;}[][] = []
  let currentRow = 0
  let currentTop: number | null = null
  layout.boxes.forEach(box => {
    const top = box.top

    if (currentTop === null) {
      currentTop = top
      rows.push([])
    } else if (top > currentTop) {
      currentRow += 1;
      currentTop = top;
      rows.push([])
    }

    rows[currentRow].push(box)
  });
  const rowCount = rows.length

  const rowHeights: number[] = rows.map(row => row[0].height + IMAGE_MARGIN)

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    const row = rows[index];

    return (
      <div key={key} style={{ ...style, position: "relative" }}>
        {row.map((box, i) => {
          const imageIndex = layout.boxes.indexOf(box);
          const img = images[imageIndex];
          
          return (
            <img
              key={i}
              src={img.src}
              style={{
                position: "absolute",
                left: box.left,
                top: 0,
                width: box.width,
                height: box.height,
                objectFit: "cover",
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <List
            width={width}
            height={height}
            rowCount={rowCount}
            rowHeight={({ index }) => rowHeights[index]}
            rowRenderer={rowRenderer}
          />
        );
      }}
    </AutoSizer>
  );
}

export const BoardView = ({
  boards,
  clipsResponse,
}: {
  boards: Board[]
  clipsResponse: ClipsListResponse['data']
}) => {
  const [useVirtualized, setUseVirtualized] = useState(false);
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
            style={!useVirtualized ? activeButtonStyle : buttonStyle}
            onClick={() => setUseVirtualized(false)}
          >
            Grid
          </button>
          <button
            style={useVirtualized ? activeButtonStyle : buttonStyle}
            onClick={() => setUseVirtualized(true)}
          >
            Virtualized
          </button>
        </div>
        {useVirtualized ? (
          <div style={{ height: 'calc(100vh - 200px)' }}>
            <JustifiedGallery
              images={images}
              containerWidth={window.innerWidth - 64}
            />
          </div>
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
