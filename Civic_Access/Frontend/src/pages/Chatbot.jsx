import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, LogOut, Globe, ChevronDown } from 'lucide-react';

const translations = {
  en: {
    online: 'online',
    selectIssue: 'What are you dealing with today? Please select an option below.',
    policeEncounter: 'Police Encounter',
    landlordTenant: 'Landlord/Tenant',
    describeIssue: 'Please describe your situation, and I\'ll explain your rights.',
    typeMessage: 'Type a message...',
    logout: 'Logout',
    civicAccess: 'CivicAccess',
    simpleExplanation: 'Simple Explanation',
    legalProof: 'Legal Proof',
  },
  ha: {
    online: 'online',
    selectIssue: 'Me kake aiki? Zabar zaɓi.',
    policeEncounter: 'Haɗin Jiya Polisi',
    landlordTenant: 'Mai Gida/Masu Sulka',
    describeIssue: 'Bayyana halin ku, in nadenga hakkinku.',
    typeMessage: 'Rubuta saƙo...',
    logout: 'Fita',
    civicAccess: 'CivicAccess',
    simpleExplanation: 'Sauƙaƙƙe Bayani',
    legalProof: 'Shaida ta Shari\'a',
  },
  ig: {
    online: 'online',
    selectIssue: 'Gini ka ruo? Jiri ahụ zaɓi.',
    policeEncounter: 'Njikọ Ndị Uwe Ogbako',
    landlordTenant: 'Onye Ụlọ/Ndị Na-Aru Ụlọ',
    describeIssue: 'Kọwaa ọnọdụ gị, m ga-akọwaa ikike gị.',
    typeMessage: 'Dee ozi...',
    logout: 'Pụta',
    civicAccess: 'CivicAccess',
    simpleExplanation: 'Nkọwahụ Dị Mfe',
    legalProof: 'Ihe Akaaka Iwu',
  },
  yo: {
    online: 'online',
    selectIssue: 'Kini o ti lo de? Yan eto kan.',
    policeEncounter: 'Isokan Onigun Ijinna',
    landlordTenant: 'Onigbowu/Awọn Alabere',
    describeIssue: 'Ṣalaye ipo rẹ, emi a ṣalaye ẹtọ rẹ.',
    typeMessage: 'Kọ ozi kan...',
    logout: 'Jade',
    civicAccess: 'CivicAccess',
    simpleExplanation: 'Alaye ti o rọrun',
    legalProof: 'Ẹri Ofin',
  },
  pid: {
    online: 'online',
    selectIssue: 'Wetin dey sup? Tell me make I help you.',
    policeEncounter: 'Police Encounter',
    landlordTenant: 'Landlord/Tenant',
    describeIssue: 'Tell me your situation, I go explain your right.',
    typeMessage: 'Type your message...',
    logout: 'Comot',
    civicAccess: 'CivicAccess',
    simpleExplanation: 'Simple Explanation',
    legalProof: 'Legal Proof',
  },
};

function Chatbot() {
  const navigate = useNavigate();
  const langCode = localStorage.getItem('language') || 'en';
  const langName = localStorage.getItem('languageName') || 'English';
  const t = translations[langCode];

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t.selectIssue,
      sender: 'bot',
      type: 'text',
    },
  ]);
  const [input, setInput] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLanguageChange = (code, name) => {
    localStorage.setItem('language', code);
    localStorage.setItem('languageName', name);
    setShowLanguageDropdown(false);
    window.location.reload();
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      type: 'text',
    };

    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: 'Thank you for your question. I am processing your legal query...',
        sender: 'bot',
        type: 'text',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - ONLY added responsive padding */}
      <header className="bg-linear-to-r from-green-600 to-green-700 text-white p-3 sm:p-4 shadow-lg shrink-0">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* ONLY added responsive sizing to logo */}
            <div className="size-8 sm:size-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 48 48">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
              </svg>
            </div>
            <div>
              {/* ONLY added responsive text size */}
              <h1 className="font-bold text-base sm:text-lg">{t.civicAccess}</h1>
              <p className="text-xs text-green-100">{t.online}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language Dropdown - ONLY added responsive padding and text */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/10 transition-colors text-xs sm:text-sm"
              >
                <span className="flex items-center justify-center gap-1">
                  <Globe size={14} className="sm:size-16px" /> {langName}
                </span>
                <ChevronDown size={14} className="sm:size-16px" />
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white text-gray-900 rounded-lg shadow-xl py-1 z-50">
                  {[
                    { name: 'English', code: 'en' },
                    { name: 'Hausa', code: 'ha' },
                    { name: 'Igbo', code: 'ig' },
                    { name: 'Yoruba', code: 'yo' },
                    { name: 'Pidgin', code: 'pid' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code, lang.name)}
                      className="block w-full text-left px-4 py-2 hover:bg-green-50 transition-colors text-sm"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Logout Button - EXACTLY as you had it, only added responsive padding */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-xs sm:text-sm"
            >
              <LogOut size={14} className="sm:size-16px" />
              {t.logout} {/* This is EXACTLY as you had it */}
            </button>
          </div>
        </div>
      </header>

      {/* Messages - ONLY added responsive padding and message width */}
      
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 bg-linear-to-b from-green-50 to-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
              }`}
            >
              {msg.type === 'text' && <p className="text-xs sm:text-sm">{msg.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - ONLY added responsive padding */}
      <div className="shrink-0 bg-white border-t border-gray-200 p-3 sm:p-4 shadow-lg">
        <div className="flex gap-2 max-w-6xl mx-auto">
          <input
            type="text"
            placeholder={t.typeMessage}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-green-200 rounded-full focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-colors text-xs sm:text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-600 text-white p-2 sm:p-3 rounded-full hover:bg-green-700 transition-colors flex items-center gap-2 shrink-0"
          >
            <Send size={16} className="sm:size-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;