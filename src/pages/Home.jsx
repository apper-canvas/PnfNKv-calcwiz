import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import { Calculator, History, Settings } from 'lucide-react'

function Home() {
  const [activeTab, setActiveTab] = useState('calculator')
  
  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to Ical
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Your smart calculator for everyday calculations
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-surface-50 dark:bg-surface-800 rounded-2xl shadow-card dark:shadow-none border border-surface-200 dark:border-surface-700 overflow-hidden"
      >
        <div className="flex border-b border-surface-200 dark:border-surface-700">
          <TabButton 
            active={activeTab === 'calculator'} 
            onClick={() => setActiveTab('calculator')}
            icon={<Calculator size={18} />}
            label="Calculator"
          />
          <TabButton 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
            icon={<History size={18} />}
            label="History"
          />
          <TabButton 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
            icon={<Settings size={18} />}
            label="Settings"
          />
        </div>
        
        <div className="p-4">
          <AnimatePresence mode="wait">
            {activeTab === 'calculator' && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <MainFeature />
              </motion.div>
            )}
            
            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[500px] flex flex-col items-center justify-center"
              >
                <div className="text-center p-6">
                  <History size={48} className="mx-auto mb-4 text-surface-400" />
                  <h3 className="text-xl font-medium mb-2">Calculation History</h3>
                  <p className="text-surface-500 dark:text-surface-400">
                    Your recent calculations will appear here
                  </p>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[500px] flex flex-col items-center justify-center"
              >
                <div className="text-center p-6">
                  <Settings size={48} className="mx-auto mb-4 text-surface-400" />
                  <h3 className="text-xl font-medium mb-2">Calculator Settings</h3>
                  <p className="text-surface-500 dark:text-surface-400">
                    Customize your calculator experience
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors relative
        ${active 
          ? 'text-primary dark:text-primary-light' 
          : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
        }`}
    >
      {icon}
      {label}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )
}

export default Home