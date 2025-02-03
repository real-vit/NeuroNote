import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Image, Save, Plus, Minus, Mic, Clipboard, X, FileText, Heading } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { motion } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { createWorker } from 'tesseract.js';
import Navbar from './NavBar.jsx';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


const Canvas = () => {
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
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);
  const sidebarRef = useRef(null);
  const fileInputRef = useRef(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const workerRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.fontSize = `${fontSize}px`;
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
    if (file && canvasRef.current) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.className = 'max-w-full h-auto my-2';
        img.alt = 'uploaded';

        canvasRef.current.appendChild(img);

        const br = document.createElement('br');
        canvasRef.current.appendChild(br);
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
    if (canvasRef.current && recordedText) {
      const textNode = document.createTextNode(recordedText);
      canvasRef.current.appendChild(textNode);

      const br = document.createElement('br');
      canvasRef.current.appendChild(br);
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
    if (canvasRef.current && uploadedText) {
      const textNode = document.createTextNode(uploadedText);
      canvasRef.current.appendChild(textNode);
      const br = document.createElement('br');
      canvasRef.current.appendChild(br);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex h-screen">
      {/* Sidebar */}

      <div className="mt-16 md:mt-20 fixed top-0 left-0 w-16 md:w-20 bg-gray-100 p-4 space-y-4 border-r border-gray-200 h-screen">
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
</div>




      {/* Main Content */}
      <div className="flex-1 p-4 ml-20 mt-20">
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

        {/* Canvas Area */}
        <div
          ref={canvasRef}
          className="w-full min-h-[500px] p-2 md:p-4 border rounded-lg bg-white shadow-sm focus:outline-none"
          contentEditable
          suppressContentEditableWarning
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
    </>
  );
};

export default Canvas;