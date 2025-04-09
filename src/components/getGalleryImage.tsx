import { Clip } from "@/api/clips"

const overlayStyle = {
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7))",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "end",
    padding: 10,
  } as const
  
  const titleStyle = {
    color: 'white',
    fontSize: 12,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  } as const
  
  export const getGalleryImage = (clip: Clip) => ({
    src: clip.assets.image,
    width: clip.width,
    height: clip.height,
    customOverlay: (
      <div style={overlayStyle}>
        <div style={titleStyle}>
          {clip.importedName}
        </div>
      </div>
    ),
  })