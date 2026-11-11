import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import robochatAvatar from '../assets/robochat.jpg';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * ChatBot Component
 * AI chatbot that answers questions specifically about Douwes Dekker and Tiga Serangkai
 */
export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya asisten virtual Douwes Dekker. Tanyakan apa saja tentang Ernest Douwes Dekker dan Tiga Serangkai!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Knowledge base about Douwes Dekker & Tiga Serangkai
  const getResponse = (question: string): string => {
    const q = question.toLowerCase();

    // Tiga Serangkai questions
    if (q.includes('tiga serangkai') || q.includes('3 serangkai')) {
      return 'Tiga Serangkai adalah trio legendaris pergerakan nasional Indonesia yang terdiri dari Ernest Douwes Dekker, Dr. Cipto Mangunkusumo, dan Suwardi Suryaningrat (Ki Hajar Dewantara). Mereka diasingkan ke Belanda pada tahun 1913 karena tulisan dan aktivisme politik mereka yang dianggap mengancam pemerintahan kolonial Belanda.';
    }

    // Indische Partij questions
    if (q.includes('indische partij') || q.includes('partai')) {
      return 'Indische Partij didirikan oleh Ernest Douwes Dekker pada tahun 1912, merupakan partai politik kemerdekaan pertama di Hindia Belanda. Semboyannya adalah "Hindia untuk Putra Hindia", yang menekankan bahwa tanah Hindia adalah untuk rakyat Hindia, bukan untuk penjajah.';
    }

    // De Expres questions
    if (q.includes('de expres') || q.includes('koran') || q.includes('surat kabar')) {
      return 'De Expres adalah surat kabar yang diedit oleh Douwes Dekker, menjadi media perjuangan melalui kata-kata. Tulisan-tulisan tajam di De Expres membangkitkan kesadaran politik generasi muda Hindia dan membuat pemerintah kolonial Batavia gelisah.';
    }

    // Danudirja Setiabudi questions
    if (q.includes('danudirja') || q.includes('setiabudi') || q.includes('nama jawa')) {
      return 'Danudirja Setiabudi adalah nama Jawa yang dipilih Ernest Douwes Dekker setelah kemerdekaan Indonesia. Nama ini mencerminkan loyalitasnya pada bangsa yang ia perjuangkan seumur hidup. Ia kemudian menjabat sebagai Menteri Negara Republik Indonesia.';
    }

    // Birth/origin questions
    if (q.includes('lahir') || q.includes('kelahiran') || q.includes('pasuruan')) {
      return 'Ernest Douwes Dekker lahir di Pasuruan pada tahun 1879 dari darah campuran Eropa, Jawa, dan Jepang. Latar belakang "Indo" ini memberinya perspektif unik yang mendorongnya menolak sekat ras kolonial dan memilih berdiri bersama mereka yang tertindas.';
    }

    // Exile questions
    if (q.includes('diasingkan') || q.includes('belanda') || q.includes('pengasingan')) {
      return 'Tiga Serangkai diasingkan ke Belanda pada tahun 1913 karena tulisan-tulisan mereka yang mengkritik pemerintah kolonial. Pengasingan ini terjadi setelah Suwardi Suryaningrat menulis artikel "Als Ik Eens Nederlander Was" di De Expres yang mengguncang pemerintah Belanda.';
    }

    // Cipto questions
    if (q.includes('cipto') || q.includes('mangunkusumo')) {
      return 'Dr. Cipto Mangunkusumo adalah dokter dan aktivis, rekan seperjuangan Douwes Dekker dalam Indische Partij dan Tiga Serangkai. Bersama-sama mereka memperjuangkan kemerdekaan dan keadilan sosial bagi rakyat Hindia.';
    }

    // Suwardi/Ki Hajar questions
    if (q.includes('suwardi') || q.includes('ki hajar') || q.includes('dewantara')) {
      return 'Suwardi Suryaningrat, yang kemudian dikenal sebagai Ki Hajar Dewantara, adalah pendiri Taman Siswa dan Bapak Pendidikan Indonesia. Ia penulis artikel terkenal "Als Ik Eens Nederlander Was" yang memicu pengasingan Tiga Serangkai ke Belanda.';
    }

    // Death/legacy questions
    if (q.includes('meninggal') || q.includes('wafat') || q.includes('1950')) {
      return 'Ernest Douwes Dekker meninggal pada tahun 1950, setahun setelah pengakuan kedaulatan Indonesia. Ia meninggalkan warisan sebagai pelopor nasionalisme Indonesia, pendiri partai politik kemerdekaan pertama, dan pejuang yang konsisten memperjuangkan kemerdekaan hingga akhir hayatnya.';
    }

    // Ksatrian Instituut questions
    if (q.includes('ksatrian') || q.includes('instituut') || q.includes('sekolah') || q.includes('pendidikan')) {
      return 'Ksatrian Instituut adalah lembaga pendidikan yang didirikan Douwes Dekker, membuka akses pendidikan bagi semua ras tanpa diskriminasi. Ini mencerminkan visinya tentang kesetaraan dan pendidikan sebagai alat pembebasan.';
    }

    // General questions
    if (q.includes('siapa') || q.includes('who')) {
      return 'Ernest Douwes Dekker (1879-1950), juga dikenal sebagai Danudirja Setiabudi, adalah pahlawan nasional Indonesia, pendiri Indische Partij (1912) - partai kemerdekaan pertama di Hindia Belanda, dan bagian dari Tiga Serangkai bersama Cipto Mangunkusumo dan Suwardi Suryaningrat.';
    }

    // Default responses for common greetings
    if (q.includes('halo') || q.includes('hai') || q.includes('hi') || q.includes('hello')) {
      return 'Halo! Ada yang ingin kamu tanyakan tentang Ernest Douwes Dekker atau Tiga Serangkai?';
    }

    if (q.includes('terima kasih') || q.includes('thanks') || q.includes('makasih')) {
      return 'Sama-sama! Senang bisa membantu. Ada pertanyaan lain tentang perjuangan Douwes Dekker?';
    }

    // Default fallback
    return 'Maaf, saya hanya bisa menjawab pertanyaan seputar Ernest Douwes Dekker dan Tiga Serangkai. Coba tanyakan tentang Indische Partij, De Expres, pengasingan ke Belanda, atau peran mereka dalam pergerakan nasional Indonesia.';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking and respond
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-neutral-900 shadow-2xl hover:shadow-neutral-900/50 transition-all duration-300 overflow-hidden border-2 border-neutral-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <img src={robochatAvatar} alt="Chat Bot" className="h-full w-full object-cover" />
        {/* Notification dot */}
        {!isOpen && (
          <motion.div
            className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto z-50 sm:w-96 h-[500px] sm:h-[600px] bg-white rounded-2xl shadow-2xl border-2 border-neutral-900 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-neutral-900 p-4 flex items-center gap-3">
              <img
                src={robochatAvatar}
                alt="Bot Avatar"
                className="h-10 w-10 rounded-full border-2 border-stone-100"
              />
              <div className="flex-1">
                <h3 className="font-serif font-bold text-stone-100 text-sm">Asisten Douwes Dekker</h3>
                <p className="font-mono text-[10px] text-stone-400">Tanya tentang Tiga Serangkai</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-stone-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-neutral-900 text-stone-100'
                        : 'bg-white border border-neutral-200 text-neutral-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span
                      className={`text-[10px] mt-1 block ${
                        message.sender === 'user' ? 'text-stone-400' : 'text-neutral-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-neutral-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-neutral-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-neutral-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-neutral-200">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tanya tentang Douwes Dekker..."
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900 transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 bg-neutral-900 text-stone-100 rounded-lg hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
