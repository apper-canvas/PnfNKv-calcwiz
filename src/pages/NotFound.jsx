import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, AlertTriangle } from 'lucide-react'

function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6 p-6 rounded-full bg-accent/10 text-accent"
      >
        <AlertTriangle size={64} />
      </motion.div>
      
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-2">Page Not Found</p>
      <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium"
        >
          <Home size={18} />
          Back to Home
        </motion.button>
      </Link>
    </motion.div>
  )
}

export default NotFound