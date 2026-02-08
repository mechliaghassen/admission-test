import '../styles/TextOverlay.css'

function TextOverlay({ text, onUpdate }) {
  const handleTextChange = (e) => {
    onUpdate({ text: e.target.value })
  }

  const handleSizeChange = (e) => {
    onUpdate({ size: parseInt(e.target.value) })
  }

  const handleColorChange = (e) => {
    onUpdate({ color: e.target.value })
  }

  const handleXChange = (e) => {
    onUpdate({ x: parseInt(e.target.value) })
  }

  const handleYChange = (e) => {
    onUpdate({ y: parseInt(e.target.value) })
  }

  const handleFontWeightChange = (e) => {
    onUpdate({ fontWeight: e.target.value })
  }

  return (
    <div className="text-overlay-controls">
      <h3>Propriétés du Texte</h3>

      <div className="control-group">
        <label htmlFor="text-input">Texte:</label>
        <input
          id="text-input"
          type="text"
          value={text.text}
          onChange={handleTextChange}
          maxLength={50}
          className="text-input"
        />
      </div>

      <div className="control-group">
        <label htmlFor="size-input">Taille ({text.size}px):</label>
        <input
          id="size-input"
          type="range"
          min="20"
          max="150"
          value={text.size}
          onChange={handleSizeChange}
          className="slider"
        />
      </div>

      <div className="control-group">
        <label htmlFor="color-input">Couleur:</label>
        <div className="color-picker-wrapper">
          <input
            id="color-input"
            type="color"
            value={text.color}
            onChange={handleColorChange}
            className="color-input"
          />
          <span className="color-text">{text.color}</span>
        </div>
      </div>

      <div className="control-group">
        <label htmlFor="font-weight-input">Style de Police:</label>
        <select
          id="font-weight-input"
          value={text.fontWeight}
          onChange={handleFontWeightChange}
          className="select-input"
        >
          <option value="normal">Normal</option>
          <option value="bold">Gras</option>
          <option value="900">Ultra Gras</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="x-input">Position Horizontale ({text.x}%):</label>
        <input
          id="x-input"
          type="range"
          min="0"
          max="100"
          value={text.x}
          onChange={handleXChange}
          className="slider"
        />
      </div>

      <div className="control-group">
        <label htmlFor="y-input">Position Verticale ({text.y}%):</label>
        <input
          id="y-input"
          type="range"
          min="0"
          max="100"
          value={text.y}
          onChange={handleYChange}
          className="slider"
        />
      </div>
    </div>
  )
}

export default TextOverlay
