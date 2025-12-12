import { useState, useEffect, useRef } from "react";
import { Send, LogOut, Globe, ChevronDown, Plus } from "lucide-react";
import { FaGavel } from "react-icons/fa";
const translations = {
  en: {
    online: "online",
    selectIssue:
      "What are you dealing with today? Please select an option below.",
    policeEncounter: "Police Encounter",
    landlordTenant: "Landlord/Tenant",
    describeIssue:
      "Please describe your situation, and I'll explain your rights.",
    typeMessage: "Type a message...",
    logout: "Logout",
    civicAccess: "CivicAccess",
    simpleExplanation: "Simple Explanation",
    legalProof: "Legal Proof",
    error: "Sorry I encountered an error. Please try again later.",
  },
  ha: {
    online: "online",
    selectIssue: "Me kake aiki? Zabar zaɓi.",
    policeEncounter: "Haɗin Jiya Polisi",
    landlordTenant: "Mai Gida/Masu Sulka",
    describeIssue: "Bayyana halin ku, in nadenga hakkinku.",
    typeMessage: "Rubuta saƙo...",
    logout: "Fita",
    civicAccess: "CivicAccess",
    simpleExplanation: "Sauƙaƙƙe Bayani",
    legalProof: "Shaida ta Shari'a",
    error: "Yi hakuri na ci karo da kuskure don Allah a sake gwadawa daga baya",
  },
  ig: {
    online: "online",
    selectIssue: "Gini ka ruo? Jiri ahụ zaɓi.",
    policeEncounter: "Njikọ Ndị Uwe Ogbako",
    landlordTenant: "Onye Ụlọ/Ndị Na-Aru Ụlọ",
    describeIssue: "Kọwaa ọnọdụ gị, m ga-akọwaa ikike gị.",
    typeMessage: "Dee ozi...",
    logout: "Pụta",
    civicAccess: "CivicAccess",
    simpleExplanation: "Nkọwahụ Dị Mfe",
    legalProof: "Ihe Akaaka Iwu",
    error: "ndo ahụrụ m njehie biko nwaa ọzọ ma emechaa",
  },
  yo: {
    online: "online",
    selectIssue: "Kini o ti lo de? Yan eto kan.",
    policeEncounter: "Isokan Onigun Ijinna",
    landlordTenant: "Onigbowu/Awọn Alabere",
    describeIssue: "Ṣalaye ipo rẹ, emi a ṣalaye ẹtọ rẹ.",
    typeMessage: "Kọ ozi kan...",
    logout: "Jade",
    civicAccess: "CivicAccess",
    simpleExplanation: "Alaye ti o rọrun",
    legalProof: "Ẹri Ofin",
    error: "ma binu mo pade aṣiṣe kan jọwọ gbiyanju lẹẹkansi nigbamii",
  },
  pid: {
    online: "online",
    selectIssue: "Wetin dey sup? Tell me make I help you.",
    policeEncounter: "Police Encounter",
    landlordTenant: "Landlord/Tenant",
    describeIssue: "Tell me your situation, I go explain your right.",
    typeMessage: "Type your message...",
    logout: "Comot",
    civicAccess: "CivicAccess",
    simpleExplanation: "Simple Explanation",
    legalProof: "Legal Proof",
    error: "Omor, error dey here shuu. Abeg try am again!",
  },
};

function Chatbot() {
  const langCode = localStorage.getItem("language") || "en";
  const langName = localStorage.getItem("languageName") || "English";
  const t = translations[langCode];
  // Update the first message when language changes
  useEffect(() => {
    setMessages((prev) => {
      // Safety check: if there are no messages, return state as is
      if (prev.length === 0) return prev;

      // Create a brand new object for the first message with the new text
      const newFirstMessage = { ...prev[0], text: t.selectIssue };

      // Return a new array containing the new first message + the rest of the messages
      return [newFirstMessage, ...prev.slice(1)];
    });
  }, [langCode, t]);

  const [messages, setMessages] = useState(() => {
    return [
      {
        id: 1,
        text: t.selectIssue,
        sender: "bot",
        type: "text",
      },
    ];
  });

  const [input, setInput] = useState("");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLanguageChange = (code, name) => {
    localStorage.setItem("language", code);
    localStorage.setItem("languageName", name);
    setShowLanguageDropdown(false);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const languageMap = {
        en: "english",
        ha: "hausa",
        ig: "igbo",
        yo: "yoruba",
        pid: "pidgin",
      };
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
          language: languageMap[langCode] || "english",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        id: messages.length + 2,
        text: data.response,
        sender: "bot",
        type: "text",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = {
        id: messages.length + 2,
        text: t.error,
        sender: "bot",
        type: "text",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        .pillar-text {
          animation: scroll 20s linear infinite;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          white-space: nowrap;
        }
        .chat-bg {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5ddd5' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          background-color: #eae6df;
        }
      `}</style>

      {/* Header */}
      <header className="shrink-0 bg-linear-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                >
                  <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-bold">{t.civicAccess}</h1>
                <p className="text-xs text-green-100">{t.online}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-xs sm:text-sm"
                >
                  <Globe size={16} />
                  <span>{langName}</span>
                  <ChevronDown size={14} />
                </button>

                {showLanguageDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white text-gray-900 rounded-lg shadow-xl py-1 z-50">
                    {[
                      { name: "English", code: "en" },
                      { name: "Hausa", code: "ha" },
                      { name: "Igbo", code: "ig" },
                      { name: "Yoruba", code: "yo" },
                      { name: "Pidgin", code: "pid" },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() =>
                          handleLanguageChange(lang.code, lang.name)
                        }
                        className="block w-full text-left px-4 py-2 hover:bg-green-50 transition-colors text-sm"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-xs sm:text-sm"
              >
                <LogOut size={14} />
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Area with Pillars */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pillar */}
        <div className="hidden lg:flex w-32 bg-linear-to-r from-green-600 to-green-700 items-center justify-center overflow-hidden">
          <div className="pillar-text text-white/40 font-bold text-md">
            Awarri Hackathon by Team Sabilaw • CivicAccess • Awarri Hackathon by
            Team Sabilaw • CivicAccess •
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 chat-bg">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-gray-400 shrink-0 flex items-center justify-center text-white font-bold text-sm">
                    <FaGavel />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-green-500 text-white rounded-tr-none"
                      : "bg-white text-gray-900 rounded-tl-none border border-gray-200"
                  }`}
                >
                  {msg.type === "text" && (
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-gray-400 shrink-0 flex items-center justify-center text-white font-bold text-sm">
                  <FaGavel />
                </div>
                <div className="bg-white text-gray-900 rounded-xl rounded-tl-none border border-gray-200 px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="shrink-0 bg-white border-t border-gray-300 p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100">
                <span className="text-2xl">
                  <Plus />
                </span>
              </button>
              <input
                type="text"
                placeholder={t.typeMessage}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !loading && handleSendMessage()
                }
                disabled={loading}
                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors text-sm disabled:bg-gray-100"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors disabled:bg-gray-400"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Pillar */}
        <div className="hidden lg:flex w-32 bg-linear-to-l from-green-600 to-green-700 items-center justify-center overflow-hidden">
          <div className="pillar-text text-white/40 font-bold text-md">
            Awarri Hackathon by Team Sabilaw • CivicAccess • Awarri Hackathon by
            Team Sabilaw • CivicAccess •
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
