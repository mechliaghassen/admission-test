import { useRef } from 'react'
import '../styles/ImageUploader.css'

function ImageUploader({ onImageUpload }) {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onImageUpload(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          onImageUpload(event.target.result)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div className="image-uploader">
      <h2>Téléchargez une Image pour Commencer</h2>
      
      <div 
        className="upload-zone"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">📤</div>
        <p className="upload-text">Cliquez pour télécharger une image</p>
        <p className="upload-subtext">ou glissez-déposez une image ici</p>
        <p className="upload-hint">Formats acceptés: JPG, PNG, GIF, WebP</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div className="uploader-tips">
        <h3>💡 Conseils</h3>
        <ul>
          <li>Choisissez une image claire et de bonne résolution</li>
          <li>Les images carrées ou rectangulaires fonctionnent le mieux</li>
          <li>Vous pouvez ajouter jusqu'à 5 textes différents à votre image</li>
          <li>Téléchargez et partagez vos créations sur les réseaux sociaux</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageUploader
