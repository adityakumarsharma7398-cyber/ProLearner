import { useState } from 'react'
import Header from './components/Header.jsx'
import Dashboard from './views/Dashboard.jsx'
import KnowledgeMapView from './views/KnowledgeMapView.jsx'
import JourneyView from './views/JourneyView.jsx'
import TopicView from './views/TopicView.jsx'
import { generateRoadmap } from './engine/generateRoadmap.js'
import { completeTopic } from './engine/progress.js'
import { loadRoadmap, saveRoadmap, clearRoadmap } from './storage.js'

export default function App() {
  const [route, setRoute] = useState({ view: 'dashboard', topicId: null })
  const [roadmap, setRoadmap] = useState(loadRoadmap)
  const [created, setCreated] = useState(false)

  const navigate = (view, topicId = null) => {
    setRoute({ view, topicId })
    window.scrollTo({ top: 0 })
  }
  const openTopic = (id) => navigate('topic', id)

  const createRoadmap = (form) => {
    const next = generateRoadmap(form)
    saveRoadmap(next)
    setRoadmap(next)
    setCreated(true)
    navigate('dashboard')
  }

  const resetRoadmap = () => {
    clearRoadmap()
    setRoadmap(null)
    setCreated(false)
    navigate('dashboard')
  }

  // Called by the quiz on a passing score. Returns { xpAwarded } (0 if already completed).
  const passTopic = (topicId) => {
    const { roadmap: next, xpAwarded } = completeTopic(roadmap, topicId)
    if (next !== roadmap) {
      saveRoadmap(next)
      setRoadmap(next)
    }
    return { xpAwarded }
  }

  const { view, topicId } = route
  return (
    <>
      <Header view={view} onNavigate={navigate} />
      <main>
        {view === 'dashboard' && <Dashboard roadmap={roadmap} justCreated={created} onCreate={createRoadmap} onReset={resetRoadmap} onNavigate={navigate} onOpenTopic={openTopic} />}
        {view === 'map' && <KnowledgeMapView roadmap={roadmap} onNavigate={navigate} onOpenTopic={openTopic} />}
        {view === 'journey' && <JourneyView roadmap={roadmap} onNavigate={navigate} onOpenTopic={openTopic} />}
        {view === 'topic' && <TopicView key={topicId} roadmap={roadmap} topicId={topicId} onPass={passTopic} onNavigate={navigate} onOpenTopic={openTopic} />}
      </main>
      <footer className="site-footer">
        <div className="container">ProLearner (working name) - early prototype</div>
      </footer>
    </>
  )
}
