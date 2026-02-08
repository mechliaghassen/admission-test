import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import TextOverlay from './TextOverlay'
import '../styles/MemeEditor.css'

function MemeEditor({ image, onSaveMeme, onBack }) {
  const canvasRef = useRef(null)
  const [texts, setTexts] = useState([
    { id: 1, text: 'Texte Supérieur', x: 50, y: 30, size: 40, color: '#FFFFFF', fontWeight: 'bold' }
  ])
  const [selectedTextId, setSelectedTextId] = useState(1)
  const [nextId, setNextId] = useState(2)

  // Redraw canvas when texts change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      // Draw all texts
      texts.forEach(textObj => {
        drawText(ctx, textObj, canvas.width)
      })
    }

    img.src = image
  }, [texts, image])

  const drawText = (ctx, textObj, canvasWidth) => {
    ctx.font = `${textObj.fontWeight} ${textObj.size}px Impact`
    ctx.fillStyle = textObj.color
    ctx.textAlign = 'center'
    ctx.lineWidth = 2
    ctx.strokeStyle = '#000000'

    const textX = (canvasWidth * textObj.x) / 100
    const textY = (textObj.y / 100) * ctx.canvas.height

    // Draw text with outline
    ctx.strokeText(textObj.text, textX, textY)
    ctx.fillText(textObj.text, textX, textY)
  }

  const handleAddText = () => {
    if (texts.length >= 5) {
      alert('Maximum 5 textes autorisés')
      return
    }

    const newText = {
      id: nextId,
      text: 'Nouveau Texte',
      x: 50,
      y: 30 + (texts.length * 15),
      size: 40,
      color: '#FFFFFF',
      fontWeight: 'bold'
    }

    setTexts([...texts, newText])
    setSelectedTextId(newText.id)
    setNextId(nextId + 1)
  }

  const handleUpdateText = (id, updates) => {
    setTexts(texts.map(text => 
      text.id === id ? { ...text, ...updates } : text
    ))
  }

  const handleDeleteText = (id) => {
    if (texts.length <= 1) {
      alert('Vous devez conserver au moins un texte')
      return
    }
    setTexts(texts.filter(text => text.id !== id))
    if (selectedTextId === id) {
      setSelectedTextId(texts.find(t => t.id !== id)?.id)
    }
  }

  const handleDownloadMeme = async () => {
    try {
      const canvas = canvasRef.current
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `meme-${Date.now()}.png`
      link.click()
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
    }
  }

  const handleSaveMeme = async () => {
    const canvas = canvasRef.current
    const memeData = canvas.toDataURL('image/png')
    onSaveMeme(memeData)
  }

  const handleShareSocial = (platform) => {
    const canvas = canvasRef.current
    const memeData = canvas.toDataURL('image/png')
    
    // Convert canvas to blob for sharing
    canvas.toBlob((blob) => {
      if (navigator.share) {
        navigator.share({
          title: 'Mon Mème',
          text: `Regardez mon mème créé avec le Générateur de Mèmes! 😂`,
          files: [new File([blob], 'meme.png', { type: 'image/png' })]
        }).catch(err => console.log('Erreur de partage:', err))
      } else {
        // Fallback: Copy to clipboard or download
        alert(`Partage ${platform} - Image prête à être téléchargée et partagée!`)
        handleDownloadMeme()
      }
    })
  }

  return (
    <div className="meme-editor">
      <div className="editor-container">
        <div className="canvas-section">
          <h2>Aperçu en Temps Réel</h2>
          <canvas ref={canvasRef} className="meme-canvas" />
        </div>

        <div className="controls-section">
          <div className="controls-header">
            <h2>Éditeur de Texte</h2>
            <button className="btn-back" onClick={onBack}>← Retour</button>
          </div>

          <div className="text-list">
            <h3>Textes ({texts.length}/5)</h3>
            <div className="texts-container">
              {texts.map(text => (
                <div
                  key={text.id}
                  className={`text-item ${selectedTextId === text.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTextId(text.id)}
                >
                  <span className="text-preview">{text.text.substring(0, 20)}</span>
                  <button 
                    className="btn-delete-text"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteText(text.id)
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-add-text" onClick={handleAddText}>
              + Ajouter un Texte
            </button>
          </div>

          {selectedTextId && (
            <TextOverlay
              text={texts.find(t => t.id === selectedTextId)}
              onUpdate={(updates) => handleUpdateText(selectedTextId, updates)}
            />
          )}

          <div className="action-buttons">
            <button className="btn-primary" onClick={handleSaveMeme}>
              💾 Enregistrer dans la Galerie
            </button>
            <button className="btn-secondary" onClick={handleDownloadMeme}>
              ⬇️ Télécharger l'Image
            </button>
            
            <div className="share-buttons">
              <h4>Partager sur:</h4>
              <button 
                className="btn-share facebook"
                onClick={() => handleShareSocial('Facebook')}
                title="Partager sur Facebook"
              >
                f
              </button>
              <button 
                className="btn-share twitter"
                onClick={() => handleShareSocial('Twitter')}
                title="Partager sur Twitter"
              >
                𝕏
              </button>
              <button 
                className="btn-share whatsapp"
                onClick={() => handleShareSocial('WhatsApp')}
                title="Partager sur WhatsApp"
              >
                💬
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemeEditor
