import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trash2, 
  RotateCcw, 
  Percent, 
  Divide, 
  X, 
  Minus, 
  Plus, 
  Equal, 
  Clock, 
  Save
} from 'lucide-react'

function MainFeature() {
  const [displayValue, setDisplayValue] = useState('0')
  const [storedValue, setStoredValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [memory, setMemory] = useState(0)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  
  // Handle digit input
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit)
    }
  }
  
  // Handle decimal point
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.')
      setWaitingForOperand(false)
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.')
    }
  }
  
  // Clear display
  const clearDisplay = () => {
    setDisplayValue('0')
  }
  
  // Clear all
  const clearAll = () => {
    setDisplayValue('0')
    setStoredValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }
  
  // Handle operations
  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(displayValue)
    
    if (storedValue === null) {
      setStoredValue(inputValue)
    } else if (operation) {
      const result = performCalculation(storedValue, inputValue, operation)
      setDisplayValue(String(result))
      setStoredValue(result)
      
      // Add to history
      addToHistory(`${storedValue} ${getOperationSymbol(operation)} ${inputValue} = ${result}`)
    }
    
    setWaitingForOperand(true)
    setOperation(nextOperation)
  }
  
  // Calculate result
  const calculateResult = () => {
    if (storedValue === null || operation === null) return
    
    const inputValue = parseFloat(displayValue)
    const result = performCalculation(storedValue, inputValue, operation)
    
    // Add to history
    addToHistory(`${storedValue} ${getOperationSymbol(operation)} ${inputValue} = ${result}`)
    
    setDisplayValue(String(result))
    setStoredValue(null)
    setOperation(null)
    setWaitingForOperand(true)
  }
  
  // Perform calculation based on operation
  const performCalculation = (firstOperand, secondOperand, operation) => {
    switch (operation) {
      case 'add':
        return firstOperand + secondOperand
      case 'subtract':
        return firstOperand - secondOperand
      case 'multiply':
        return firstOperand * secondOperand
      case 'divide':
        return firstOperand / secondOperand
      case 'percent':
        return (firstOperand * secondOperand) / 100
      default:
        return secondOperand
    }
  }
  
  // Get operation symbol for history
  const getOperationSymbol = (op) => {
    switch (op) {
      case 'add': return '+'
      case 'subtract': return '-'
      case 'multiply': return '×'
      case 'divide': return '÷'
      case 'percent': return '%'
      default: return ''
    }
  }
  
  // Add to calculation history
  const addToHistory = (calculation) => {
    setHistory(prev => [
      { id: Date.now(), calculation },
      ...prev.slice(0, 9) // Keep only last 10 items
    ])
  }
  
  // Memory functions
  const memoryStore = () => {
    setMemory(parseFloat(displayValue))
  }
  
  const memoryRecall = () => {
    setDisplayValue(String(memory))
    setWaitingForOperand(false)
  }
  
  // Toggle sign
  const toggleSign = () => {
    const value = parseFloat(displayValue)
    setDisplayValue(String(-value))
  }
  
  // Calculate percentage
  const percentage = () => {
    const value = parseFloat(displayValue)
    setDisplayValue(String(value / 100))
  }
  
  // Format display value
  const formatDisplayValue = (value) => {
    const stringValue = String(value)
    const [integer, decimal] = stringValue.split('.')
    
    if (decimal === undefined) return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    
    return `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimal}`
  }
  
  return (
    <div className="calculator-container">
      {/* Display */}
      <div className="relative mb-4">
        <motion.div 
          className="p-4 h-24 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex flex-col items-end justify-center overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs text-surface-500 mb-1">
            {storedValue !== null && `${storedValue} ${getOperationSymbol(operation)}`}
          </div>
          <div className="text-3xl font-semibold tracking-tight overflow-x-auto scrollbar-hide w-full text-right">
            {formatDisplayValue(displayValue)}
          </div>
        </motion.div>
        
        {/* Memory indicator */}
        {memory !== 0 && (
          <div className="absolute top-2 left-3 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
            M
          </div>
        )}
        
        {/* History toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowHistory(!showHistory)}
          className="absolute top-2 right-3 p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-500"
          aria-label="Toggle history"
        >
          <Clock size={16} />
        </motion.button>
      </div>
      
      {/* History panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 overflow-hidden"
          >
            <div className="p-3 rounded-xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 max-h-40 overflow-y-auto scrollbar-hide">
              {history.length > 0 ? (
                <ul className="space-y-2">
                  {history.map((item) => (
                    <li 
                      key={item.id}
                      className="text-sm text-surface-600 dark:text-surface-400 flex justify-between"
                    >
                      <span>{item.calculation}</span>
                      <button 
                        onClick={() => setDisplayValue(item.calculation.split(' = ')[1])}
                        className="text-primary dark:text-primary-light hover:underline"
                      >
                        Use
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-surface-500 text-center py-2">No calculation history yet</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Memory buttons */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={clearAll}
          className="calc-button-clear"
        >
          AC
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={clearDisplay}
          className="calc-button-function"
        >
          C
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={percentage}
          className="calc-button-function"
        >
          <Percent size={20} />
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOperation('divide')}
          className={`calc-button-operation ${operation === 'divide' ? 'ring-2 ring-primary dark:ring-primary-light' : ''}`}
        >
          <Divide size={20} />
        </motion.button>
      </div>
      
      {/* Number pad and operations */}
      <div className="grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => inputDigit(7)}
          className="calc-button-number"
        >
          7
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => inputDigit(8)}
          className="calc-button-number"
        >
          8
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => inputDigit(9)}
          className="calc-button-number"
        >
          9
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOperation('multiply')}
          className={`calc-button-operation ${operation === 'multiply' ? 'ring-2 ring-primary dark:ring-primary-light' : ''}`}
        >
          <X size={20} />
        </motion.button>
        
        {/* Row 2 */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => inputDigit(4)}
          className="calc-button-number"
        >
          4
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => inputDigit(5)}
          className="calc-button-number"
        >
          5
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => inputDigit(6)}
          className="calc-button-number"
        >
          6
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOperation('subtract')}
          className={`calc-button-operation ${operation === 'subtract' ? 'ring-2 ring-primary dark:ring-primary-light' : ''}`}
        >
          <Minus size={20} />
        </motion.button>
        
        {/* Row 3 */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => inputDigit(1)}
          className="calc-button-number"
        >
          1
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => inputDigit(2)}
          className="calc-button-number"
        >
          2
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => inputDigit(3)}
          className="calc-button-number"
        >
          3
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOperation('add')}
          className={`calc-button-operation ${operation === 'add' ? 'ring-2 ring-primary dark:ring-primary-light' : ''}`}
        >
          <Plus size={20} />
        </motion.button>
        
        {/* Row 4 */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={toggleSign}
          className="calc-button-number"
        >
          +/-
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => inputDigit(0)}
          className="calc-button-number"
        >
          0
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={inputDecimal}
          className="calc-button-number"
        >
          .
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={calculateResult}
          className="calc-button-equals"
        >
          <Equal size={20} />
        </motion.button>
      </div>
      
      {/* Memory functions */}
      <div className="grid grid-cols-4 gap-2 mt-2">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={memoryStore}
          className="calc-button-function text-sm"
          title="Memory Store"
        >
          <Save size={16} className="mr-1" /> MS
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={memoryRecall}
          className="calc-button-function text-sm"
          disabled={memory === 0}
          title="Memory Recall"
        >
          <RotateCcw size={16} className="mr-1" /> MR
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setMemory(memory + parseFloat(displayValue))}
          className="calc-button-function text-sm"
          title="Memory Add"
        >
          M+
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setMemory(0)}
          className="calc-button-function text-sm"
          disabled={memory === 0}
          title="Memory Clear"
        >
          <Trash2 size={16} className="mr-1" /> MC
        </motion.button>
      </div>
    </div>
  )
}

export default MainFeature