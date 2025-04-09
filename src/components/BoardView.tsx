import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import { Board } from "@/api/boards";
import { ClipsListResponse } from "@/api/clips";

const Section = ({
  children,
  length,
  title,
}: {
  children: React.ReactNode
  length: number
  title: string
}) => {
  const [expanded, setExpanded] = useState(true)

  const toggle = () => setExpanded(x => !x)
  
  return (
  <div
    style={{
      marginBottom: 32,
    }}
  >
    <SectionTitleButton length={length} title={title} toggle={toggle} expanded={expanded} />
    {expanded && children}
  </div>
)}

const SectionTitleButton = ({
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
    style={{
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
    }}
  >
    {title} ({length})
    <div
      className="section-title-button-carrot"
    style={{
      width: 0,
      height: 0,
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '6px solid gray',
      opacity: 0,
      transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
      transition: 'transform 0.2s ease',
    }} />
  </button>
)

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
        {boards.map((board) => {
          const thumbnail = board.thumbnails?.[0]

          return (
            <div
              key={board.id}
              style={{
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
              }}
            >
              <div style={{
                background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7))",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}/>
              <span style={{
                color: 'white',
                cursor: "pointer",
                position: 'relative',
                padding: 10,
                zIndex: 1,
              }}>{board.title}</span>
            </div>
          )})
        }
      </div>
    </Section>
    <Section length={clipsResponse.total} title="Assets">
      <Gallery
        images={clipsResponse.clips.map(clip => ({
          src: clip.assets.image,
          width: clip.width,
          height: clip.height,
          customOverlay: (
            <div style={{
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7))",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "end",
              padding: 10,
            }}>
              <div style={{
                color: 'white',
                fontSize: 12,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
              }}>
                {clip.importedName}
              </div>
            </div>
          ),
        }))}
        enableImageSelection={false}
        margin={8}
        rowHeight={300}
        maxRows={Infinity}
      />
    </Section>
  </div>
)
