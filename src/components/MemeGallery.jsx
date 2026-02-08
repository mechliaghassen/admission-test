import '../styles/MemeGallery.css'

function MemeGallery({ memes, onDeleteMeme }) {
  const handleDownload = (meme) => {
    const link = document.createElement('a')
    link.href = meme.image
    link.download = `meme-${meme.id}.png`
    link.click()
  }

  const handleShare = (meme) => {
    const canvas = document.createElement('canvas')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      
      canvas.toBlob((blob) => {
        if (navigator.share) {
          navigator.share({
            title: 'Mon Mème',
            text: 'Regardez mon mème créé avec le Générateur de Mèmes! 😂',
            files: [new File([blob], 'meme.png', { type: 'image/png' })]
          }).catch(err => console.log('Erreur de partage:', err))
        } else {
          alert('Partage non disponible sur votre navigateur. Téléchargez l\'image à la place!')
          handleDownload(meme)
        }
      })
    }
    
    img.src = meme.image
  }

  return (
    <div className="meme-gallery">
      <h2>Galerie de Mèmes</h2>
      
      {memes.length === 0 ? (
        <div className="empty-gallery">
          <div className="empty-icon">🖼️</div>
          <p>Votre galerie est vide</p>
          <p className="empty-hint">Créez votre premier mème pour le voir apparaître ici!</p>
        </div>
      ) : (
        <>
          <p className="gallery-info">Vous avez créé {memes.length} mème{memes.length > 1 ? 's' : ''}</p>
          <div className="gallery-grid">
            {memes.map(meme => (
              <div key={meme.id} className="gallery-item">
                <div className="meme-image-wrapper">
                  <img src={meme.image} alt="Mème" className="meme-image" />
                  <div className="meme-overlay">
                    <button 
                      className="btn-action download"
                      onClick={() => handleDownload(meme)}
                      title="Télécharger"
                    >
                      ⬇️
                    </button>
                    <button 
                      className="btn-action share"
                      onClick={() => handleShare(meme)}
                      title="Partager"
                    >
                      📤
                    </button>
                    <button 
                      className="btn-action delete"
                      onClick={() => onDeleteMeme(meme.id)}
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="meme-info">
                  <p className="meme-date">{meme.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MemeGallery
