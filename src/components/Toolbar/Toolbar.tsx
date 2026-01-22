import type { Tools } from "../../types"

interface Props {
  tool: {currentTool: Tools, setCurrentTool: React.Dispatch<React.SetStateAction<Tools>>}
}

const Toolbar = ({tool}: Props) => {
  const {currentTool, setCurrentTool} = tool;

  return (
    <nav id='tools'></nav>
  )
}

export default Toolbar