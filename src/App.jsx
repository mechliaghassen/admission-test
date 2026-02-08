import { useState } from 'react'
import './App.css'
import ImageUploader from './components/ImageUploader'
import MemeEditor from './components/MemeEditor'
import MemeGallery from './components/MemeGallery'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home') 
  const [uploadedImage, setUploadedImage] = useState(null)
  const [memes, setMemes] = useState(() => {
    const saved = localStorage.getItem('memes')
    return saved ? JSON.parse(saved) : []
  })

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData)
    setCurrentScreen('editor')
  }

  const handleSaveMeme = (memeData) => {
    const newMeme = {
      id: Date.now(),
      image: memeData,
      timestamp: new Date().toLocaleString()
    }
    const updatedMemes = [newMeme, ...memes]
    setMemes(updatedMemes)
    localStorage.setItem('memes', JSON.stringify(updatedMemes))
    setCurrentScreen('home')
    setUploadedImage(null)
  }

  const handleDeleteMeme = (id) => {
    const updatedMemes = memes.filter(meme => meme.id !== id)
    setMemes(updatedMemes)
    localStorage.setItem('memes', JSON.stringify(updatedMemes))
  }

  const handleBackToHome = () => {
    setCurrentScreen('home')
    setUploadedImage(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 Générateur de Mèmes</h1>
        <nav className="nav-buttons">
          <button 
            onClick={() => setCurrentScreen('home')}
            className={`nav-btn ${currentScreen === 'home' ? 'active' : ''}`}
          >
            Accueil
          </button>
          <button 
            onClick={() => setCurrentScreen('gallery')}
            className={`nav-btn ${currentScreen === 'gallery' ? 'active' : ''}`}
          >
            Galerie ({memes.length})
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentScreen === 'home' && (
          <ImageUploader onImageUpload={handleImageUpload} />
        )}

        {currentScreen === 'editor' && uploadedImage && (
          <MemeEditor 
            image={uploadedImage} 
            onSaveMeme={handleSaveMeme}
            onBack={handleBackToHome}
          />
        )}

        {currentScreen === 'gallery' && (
          <MemeGallery 
            memes={memes}
            onDeleteMeme={handleDeleteMeme}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 Générateur de Mèmes - Créez, Téléchargez et Partagez vos Mèmes</p>
      </footer>
    </div>
  )
}

export default App
