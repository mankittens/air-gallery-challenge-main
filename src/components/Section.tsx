import { useState } from "react";
import { SectionTitleButton } from "./SectionTitleButton";

const style = {
  marginBottom: 32,
}

export const Section = ({
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
    style={style}
  >
    <SectionTitleButton length={length} title={title} toggle={toggle} expanded={expanded} />
    {expanded && children}
  </div>
)}
