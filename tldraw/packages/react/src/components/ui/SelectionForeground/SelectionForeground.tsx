import { TLResizeCorner, TLResizeEdge, TLRotateCorner } from '@tldraw/core'
import { observer } from 'mobx-react-lite'
import { SVGContainer } from '~components'
import { useApp } from '~hooks'
import type { TLReactShape } from '~lib'
import type { TLSelectionComponentProps } from '~types'
import { CornerHandle, EdgeHandle } from './handles'
import { RotateCornerHandle } from './handles/RotateCornerHandle'

export const SelectionForeground = observer(function SelectionForeground<S extends TLReactShape>({
  bounds,
  showResizeHandles,
  showRotateHandles,
  shapes,
}: TLSelectionComponentProps<S>) {
  const app = useApp()
  let { width, height } = bounds
  const zoom = app.viewport.camera.zoom

  const size = 8 / zoom
  const targetSize = 6 / zoom

  const canResize = shapes.length === 1 ? shapes[0].canResize : [true, true]

  const editing = !!app.editingShape

  // when editing, make the selection a bit larger
  width = editing ? width + 2 : width
  height = editing ? height + 2 : height

  return (
    <SVGContainer style={{ transform: editing ? 'translate(-1px, -1px)' : 'none' }}>
      <rect
        className="tl-bounds-fg"
        width={Math.max(width, 1)}
        height={Math.max(height, 1)}
        rx={editing ? 8 : 0}
        ry={editing ? 8 : 0}
        pointerEvents="none"
      />
      <EdgeHandle
        x={targetSize * 2}
        y={0}
        width={width - targetSize * 4}
        height={0}
        targetSize={targetSize}
        edge={TLResizeEdge.Top}
        disabled={!canResize[1]}
        isHidden={!showResizeHandles}
      />
      <EdgeHandle
        x={width}
        y={targetSize * 2}
        width={0}
        height={height - targetSize * 4}
        targetSize={targetSize}
        edge={TLResizeEdge.Right}
        disabled={!canResize[0]}
        isHidden={!showResizeHandles}
      />
      <EdgeHandle
        x={targetSize * 2}
        y={height}
        width={width - targetSize * 4}
        height={0}
        targetSize={targetSize}
        edge={TLResizeEdge.Bottom}
        disabled={!canResize[1]}
        isHidden={!showResizeHandles}
      />
      <EdgeHandle
        x={0}
        y={targetSize * 2}
        width={0}
        height={height - targetSize * 4}
        targetSize={targetSize}
        edge={TLResizeEdge.Left}
        disabled={!canResize[0]}
        isHidden={!showResizeHandles}
      />
      <RotateCornerHandle
        cx={0}
        cy={0}
        targetSize={targetSize}
        corner={TLRotateCorner.TopLeft}
        isHidden={!showRotateHandles}
      />
      <RotateCornerHandle
        cx={width + targetSize * 2}
        cy={0}
        targetSize={targetSize}
        corner={TLRotateCorner.TopRight}
        isHidden={!showRotateHandles}
      />
      <RotateCornerHandle
        cx={width + targetSize * 2}
        cy={height + targetSize * 2}
        targetSize={targetSize}
        corner={TLRotateCorner.BottomRight}
        isHidden={!showRotateHandles}
      />
      <RotateCornerHandle
        cx={0}
        cy={height + targetSize * 2}
        targetSize={targetSize}
        corner={TLRotateCorner.BottomLeft}
        isHidden={!showRotateHandles}
      />
      {canResize?.every(r => r) && (
        <>
          <CornerHandle
            cx={0}
            cy={0}
            size={size}
            targetSize={targetSize}
            corner={TLResizeCorner.TopLeft}
            isHidden={!showResizeHandles}
          />
          <CornerHandle
            cx={width}
            cy={0}
            size={size}
            targetSize={targetSize}
            corner={TLResizeCorner.TopRight}
            isHidden={!showResizeHandles}
          />
          <CornerHandle
            cx={width}
            cy={height}
            size={size}
            targetSize={targetSize}
            corner={TLResizeCorner.BottomRight}
            isHidden={!showResizeHandles}
          />
          <CornerHandle
            cx={0}
            cy={height}
            size={size}
            targetSize={targetSize}
            corner={TLResizeCorner.BottomLeft}
            isHidden={!showResizeHandles}
          />
        </>
      )}
    </SVGContainer>
  )
})
