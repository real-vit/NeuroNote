import React, { useState, useRef, useEffect } from 'react';
import {Sparkles, Check, Users, Phone, Bold, Italic, Image, Save, Plus, Minus, Mic, Clipboard, X, FileText, Heading , Book, Search, BrainCircuit} from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { motion } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { createWorker } from 'tesseract.js';
import Navbar from './NavBar.jsx';


pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


const Collabs = () => {
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const[isHeading, setIsHeading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUploadSidebar, setShowUploadSidebar] = useState(false);
  const [uploadedText, setUploadedText] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const smallCanvasRef = useRef(null);
  const bigCanvasRef = useRef(null);
  const recognitionRef = useRef(null);
  const sidebarRef = useRef(null);
  const fileInputRef = useRef(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const workerRef = useRef(null);
  const [showTeamSidebar, setShowTeamSidebar] = useState(false);
  const [teamMessages, setTeamMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers] = useState([
  { id: 1, name: 'Alice', online: true },
  { id: 2, name: 'Bob', online: true },
  { id: 3, name: 'Charlie', online: false },
  ]);
  const [joinCode] = useState('TEAM-' + Math.random().toString(36).substring(2, 7).toUpperCase());
  const [userId] = useState('user-' + Math.random().toString(36).substring(2, 9));
  const [copySuccess, setCopySuccess] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const [showAISidebar, setShowAISidebar] = useState(false);

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(joinCode);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 5000);
  };


  useEffect(() => {
    if (smallCanvasRef.current) {
      smallCanvasRef.current.style.fontSize = `${fontSize}px`;
      document.execCommand('defaultParagraphSeparator', false, 'p');
    }
  }, []);

  useEffect(() => {
    if (bigCanvasRef.current) {
      bigCanvasRef.current.style.fontSize = `${fontSize}px`;
      document.execCommand('defaultParagraphSeparator', false, 'p');
    }
  }, []);

  useEffect(() => {
    const initializeOCR = async () => {
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      workerRef.current = worker;
    };
    initializeOCR();

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleBold = () => {
    document.execCommand('bold', false);
    setIsBold(!isBold);
  };

  const handleItalic = () => {
    document.execCommand('italic', false);
    setIsItalic(!isItalic);
  };

  const handleHeading = () => {
    document.execCommand('formatBlock', false, '<h1>');
    setIsHeading(!isHeading);
};



  const handleFontSizeIncrease = () => {
    setFontSize((prev) => prev + 2);
  };

  const handleFontSizeDecrease = () => {
    setFontSize((prev) => Math.max(8, prev - 2));
  };

  const handleSaveAsPDF = () => {
    const canvasContent = canvasRef.current;
    const options = {
      margin: 10,
      filename: 'canvas.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(canvasContent).set(options).save();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && smallCanvasRef.current) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.className = 'max-w-full h-auto my-2';
        img.alt = 'uploaded';

        smallCanvasRef.current.appendChild(img);

        const br = document.createElement('br');
        smallCanvasRef.current.appendChild(br);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    setShowSidebar(true);
    if (!recognitionRef.current) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setRecordedText(transcript);
      };

      recognitionRef.current.onend = () => {
        setRecording(false);
        clearInterval(timerRef.current);
      };
    }

    setRecording(true);
    setElapsedTime(0);
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    recognitionRef.current.start();
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handlePasteRecordedText = () => {
    if (smallCanvasRef.current && recordedText) {
      const textNode = document.createTextNode(recordedText);
      smallCanvasRef.current.appendChild(textNode);

      const br = document.createElement('br');
      smallCanvasRef.current.appendChild(br);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProcessing(true);
    setError('');
    setShowUploadSidebar(true);

    try {
      if (file.type === 'application/pdf') {
        await extractTextFromPDF(file);
      } else if (file.type.startsWith('image/')) {
        await extractTextFromImage(file);
      }
    } catch (err) {
      setError('Error processing file. Please try again.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (event) => {
        try {
          const pdf = await pdfjsLib.getDocument(event.target.result).promise;
          let textContent = '';
          const totalPages = pdf.numPages;

          for (let i = 1; i <= totalPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            textContent += content.items.map(item => item.str).join(' ') + '\n';
            setOcrProgress(Math.round((i / totalPages) * 100));
          }
          
          setUploadedText(textContent);
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const extractTextFromImage = async (file) => {
    try {
      const worker = workerRef.current;
      const { data } = await worker.recognize(file, {
        onProgress: (progress) => {
          setOcrProgress(Math.round(progress * 100));
        }
      });
      return data.text;
    } catch (err) {
      setError('Error recognizing text from image');
      throw err;
    }
  };

  const handlePasteExtractedText = () => {
    if (smallCanvasRef.current && uploadedText) {
      const textNode = document.createTextNode(uploadedText);
      smallCanvasRef.current.appendChild(textNode);
      const br = document.createElement('br');
      smallCanvasRef.current.appendChild(br);
    }
  };

  const handlePushToBigCanvas = () => {
    if (smallCanvasRef.current && bigCanvasRef.current) {
      // Get the HTML content from small canvas
      const smallCanvasContent = smallCanvasRef.current.innerHTML;
      
      // Create the JSON object using joinCode instead of roomId
      const pushData = {
        userId: userId,
        roomId: joinCode, // Using joinCode instead of a separate roomId
        html: smallCanvasContent
      };
      
      // Log the JSON string to console
      console.log('Push Data:', JSON.stringify(pushData, null, 2));
      
      // Continue with the original functionality
      bigCanvasRef.current.innerHTML += smallCanvasContent;
      smallCanvasRef.current.innerHTML = ''; // Clear small canvas
    }
  };

  const handleSparklesClick = () => {
    setShowAISidebar(true);
  };

  return (
    <>
    <Navbar/>
    <div className="flex h-screen">
      {/* Sidebar */}
     
      <div className="mt-16 md:mt-20 fixed top-0 left-0 w-16 md:w-20 bg-gray-100 p-4 space-y-4 border-r border-gray-200 h-screen">
   <button
  className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
  onClick={() => setShowTeamSidebar(!showTeamSidebar)}
  title="My Team"
>
  <Users className="w-4 h-4 md:w-6 md:h-6" />
</button>
  
  <button
    className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/50 text-black hover:bg-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 shadow-sm"
    onClick={handleSaveAsPDF}
    title="Save as PDF"
  >
    <Save className="w-4 h-4 md:w-6 md:h-6" />
  </button>

  <label className="flex flex-col gap-2">
    <div
      className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/50 text-black hover:bg-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
      title="Upload Image"
    >
      <Image className="w-4 h-4 md:w-6 md:h-6" />
    </div>
    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
  </label>

  <button
    className={`w-8 h-8 md:w-12 md:h-12 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm ${
      recording ? 'bg-red-500 text-white' : 'bg-white/50 text-black hover:bg-gray-500 hover:text-white'
    }`}
    onClick={recording ? handleStopRecording : handleStartRecording}
    title={recording ? 'Stop Recording' : 'Start Recording'}
  >
    <Mic className="w-4 h-4 md:w-6 md:h-6" />
  </button>

  <button
    className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/50 text-black hover:bg-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
    onClick={() => fileInputRef.current.click()}
    title="Upload File"
  >
    <FileText className="w-4 h-4 md:w-6 md:h-6" />
  </button>
  <input
    type="file"
    accept="application/pdf, image/*"
    className="hidden"
    onChange={handleFileUpload}
    ref={fileInputRef}
  />
  <div className="relative flex items-center justify-center">
      {/* Static Gradient Circle */}
      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 absolute" />
      
      {/* Button on Top */}
      <button 
      className="relative z-10 w-7 h-7 md:w-11 md:h-11 bg-white rounded-full hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group flex items-center justify-center"
      onClick={handleSparklesClick}>
        <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-pink-500 group-hover:text-white" />
      </button>
    </div>
</div>




      {/* Main Content */}
      <div className="flex-1 p-4 ml-20 mt-20">

         {/* Small Canvas Toolbar */}
        <div className="mb-4 p-2 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center gap-2">
            <button
              className={`p-2 rounded-md transition-colors ${isBold ? 'bg-gray-100 text-gray-600' : 'hover:bg-gray-100'}`}
              onClick={handleBold}
            >
              <Bold className="w-4 h-4" />
            </button>

            <button
              className={`p-2 rounded-md transition-colors ${isItalic ? 'bg-gray-100 text-gray-600' : 'hover:bg-gray-100'}`}
              onClick={handleItalic}
            >
              <Italic className="w-4 h-4" />
            </button>

            <button
              className={`p-2 rounded-md transition-colors ${isHeading ? 'bg-gray-100 text-gray-600' : 'hover:bg-gray-100'}`}
              onClick={handleHeading}
            >
              <Heading className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 border-l pl-2 ml-2">
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" onClick={handleFontSizeDecrease}>
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm min-w-[3ch] text-center">{fontSize}px</span>
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" onClick={handleFontSizeIncrease}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Small Canvas with fixed height and scrollbar */}
        <div
          ref={smallCanvasRef}
          className="w-full h-[200px] p-2 md:p-4 border rounded-lg bg-white shadow-sm focus:outline-none mb-4 overflow-y-auto"
          contentEditable
          suppressContentEditableWarning
          style={{ fontSize: `${fontSize}px` }}
        />
        {/* Formatting Toolbar */}
        <div className="mb-4 p-2 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center gap-2">
            <button
              className={`p-2 rounded-md transition-colors ${isBold ? 'bg-gray-100 text-gray-600' : 'hover:bg-gray-100'}`}
              onClick={handleBold}
            >
              <Bold className="w-4 h-4" />
            </button>

            <button
              className={`p-2 rounded-md transition-colors ${isItalic ? 'bg-gray-100 text-gray-600' : 'hover:bg-gray-100'}`}
              onClick={handleItalic}
            >
              <Italic className="w-4 h-4" />
            </button>

            <button
              className={`p-2 rounded-md transition-colors ${isHeading ? 'bg-gray-100 text-gray-600' : 'hover:bg-gray-100'}`}
              onClick={handleHeading}
            >
              <Heading className="w-4 h-4" />
            </button>

             <div className="flex items-center space-x-4">
                <div className="w-[0.5px] h-8 bg-black rounded-full"></div>
  <button
  onClick={() => handlePushToBigCanvas()}
  className="relative px-6 py-2 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:border-transparent overflow-hidden transition-all duration-300 transform hover:scale-105 group"
>
  <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300">
    Push
  </span>
  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100"></div>
  <div className="absolute inset-0 bg-gradient-to-l from-green-500 to-green-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
</button>


  
</div>

          </div>
        </div>

        {/* Canvas Area */}
        <div
    ref={bigCanvasRef}
    className="w-full min-h-[500px] p-2 md:p-4 border rounded-lg bg-white shadow-sm focus:outline-none"
    contentEditable
    suppressContentEditableWarning
    style={{ fontSize: `${fontSize}px` }}
  />
</div>

      {showSidebar && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: showSidebar ? 0 : '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed right-0 top-0 h-full w-64 bg-white text-black p-4 shadow-lg border-l border-gray-300 mt-20"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-lg font-semibold">Recording</p>
            <button onClick={() => setShowSidebar(false)} className="text-black hover:text-gray-600">
              <X className="w-5 h-5 md:w-5 h-5" />
            </button>
          </div>

          {/* Elapsed Time */}
          <p className="text-sm text-gray-600 mb-2">Elapsed Time: {elapsedTime}s</p>

          {/* Audio Wave Animation */}
          {recording && (
            <div className="flex justify-center gap-1 mb-4 h-10 items-end">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-blue-500 rounded-md"
                  animate={{ height: [10, 25, 10] }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: i * 0.1 }}
                />
              ))}
            </div>
          )}

          {/* Recorded Text */}
          <div className="p-2 bg-gray-100 rounded-md text-gray-700 text-sm min-h-[50px] border border-gray-300">
            {recordedText || 'Your recorded text will appear here...'}
          </div>

          {/* Paste Button */}
          {recordedText && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-3 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow"
              onClick={handlePasteRecordedText}
            >
              <Clipboard className="w-4 h-4" />
              Paste Text
            </motion.button>
          )}
        </motion.div>
      )}

      {showUploadSidebar && (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed right-0 top-0 h-full w-64 bg-white text-black p-4 shadow-lg border-l border-gray-300 mt-20"
    >
      <div className="flex justify-between items-center mb-3">
        <p className="text-lg font-semibold">Document Text</p>
        <button onClick={() => setShowUploadSidebar(false)} className="text-black hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      {processing && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${ocrProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-sm text-gray-600">{ocrProgress}%</span>
          </div>
          <p className="text-sm text-gray-600 text-center">Processing document...</p>
        </div>
      )}

      {error && (
        <div className="p-2 mb-4 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="p-2 bg-gray-100 rounded-md text-gray-700 text-sm min-h-[50px] border border-gray-300 overflow-auto max-h-[70vh]">
        {uploadedText || 'No text extracted yet...'}
      </div>

      {uploadedText && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-3 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow"
          onClick={handlePasteExtractedText}
        >
          <Clipboard className="w-4 h-4" /> Paste Text
        </motion.button>
      )}
    </motion.div>
  )}
    </div>

    {showTeamSidebar && (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed right-0 top-0 h-full w-64 bg-white text-black p-4 shadow-lg border-l border-gray-300 mt-20"
    >
      <div className="flex justify-between items-center mb-3">
        <p className="text-lg font-semibold">Team Collaboration</p>
        <button onClick={() => setShowTeamSidebar(false)} className="text-black hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-medium mb-2">Join Code</p>
        <div className="flex items-center justify-between bg-white p-2 rounded border">
          <code className="text-sm font-mono">{joinCode}</code>
          <button
            onClick={handleCopyCode}
            className="text-gray-600 hover:text-gray-800 transition-colors"
            title="Copy to clipboard"
          >
            {copySuccess ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Clipboard className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="mb-4">
      <button
        onClick={() => setMembersOpen(!membersOpen)}
        className="flex items-center justify-between w-full p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm font-semibold">
          Active Members ({onlineUsers.filter(u => u.online).length})
        </span>
        <motion.span
          animate={{ rotate: membersOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </button>
      
      {membersOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-2 space-y-2 p-2 bg-gray-50 rounded-md"
        >
          {onlineUsers.map(user => (
            <li key={user.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-300'}`} />
                {user.name}
              </div>
              {user.online && (
                <button className="text-blue-500 hover:text-blue-700" title="Start Call">
                  <Phone className="w-4 h-4" />
                </button>
              )}
            </li>
          ))}
        </motion.ul>
      )}
    </div>

    {/* Chat Section with smaller message box */}
    <div className="border-t pt-4 flex flex-col h-[calc(100vh-300px)]">
      <h3 className="text-sm font-semibold mb-2">Team Chat</h3>
      <div className="flex-1 overflow-y-auto mb-4 border rounded-md p-2 bg-gray-50">
        {teamMessages.map((msg, index) => (
          <div key={index} className="text-sm mb-2">
            <span className="font-medium text-blue-600">{msg.user}:</span> 
            <span className="ml-2 text-gray-700">{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (newMessage.trim()) {
          setTeamMessages([...teamMessages, { user: 'You', text: newMessage }]);
          setNewMessage('');
        }
      }}
      className="mt-auto"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type team message..."
          className="w-full p-2 border rounded-md text-sm mb-2 h-8"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </motion.div>
)}

{showAISidebar && (
          <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-gray-200 mt-16 overflow-y-auto"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col items-center w-full mt-8">
            <span className="text-xl text-black font-medium mb-3">Say hi to</span>
            <span className="text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text tracking-tight">
              AI
            </span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAISidebar(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </motion.button>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          {[
            { icon: Book, label: 'Summarise', color: 'text-blue-500', gradient: 'from-blue-50 to-blue-100' },
            { icon: Search, label: 'Find Resources', color: 'text-purple-500', gradient: 'from-purple-50 to-purple-100' },
            { icon: BrainCircuit, label: 'Generate Quiz', color: 'text-pink-500', gradient: 'from-pink-50 to-pink-100' }
          ].map(({ icon: Icon, label, color, gradient }) => (
            <motion.button
              key={label}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`w-full p-4 bg-gradient-to-r ${gradient} rounded-xl shadow-sm 
                         hover:shadow-md transition-shadow duration-200 
                         flex items-center gap-4 group`}
            >
              <div className={`${color} p-2 bg-white rounded-lg shadow-sm 
                             group-hover:shadow transition-shadow duration-200`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-gray-700 font-medium">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
        )}
    </>
  );
};

export default Collabs;