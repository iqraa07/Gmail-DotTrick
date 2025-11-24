import { useState, useEffect } from 'react';
import { Copy, Mail, CheckCircle2, List, Download, RotateCcw, History, Save, Moon, Sun, Eye, X, HelpCircle } from 'lucide-react';

type Mode = 'single' | 'bulk';

interface Template {
  name: string;
  usePlus: boolean;
  useDot: boolean;
  useUppercase: boolean;
  useLowercase: boolean;
  useDomainRandom: boolean;
}

function App() {
  const [mode, setMode] = useState<Mode>('single');
  const [baseInput, setBaseInput] = useState('');
  const [domain, setDomain] = useState('gmail.com');
  const [counter, setCounter] = useState(1);
  const [bulkCount, setBulkCount] = useState(100);
  const [bulkStart, setBulkStart] = useState(1);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [bulkEmails, setBulkEmails] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const [usePlus, setUsePlus] = useState(true);
  const [useDot, setUseDot] = useState(false);
  const [useUppercase, setUseUppercase] = useState(false);
  const [useLowercase, setUseLowercase] = useState(false);
  const [useDomainRandom, setUseDomainRandom] = useState(false);

  const [history, setHistory] = useState<string[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewEmails, setPreviewEmails] = useState<string[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [showTemplateSave, setShowTemplateSave] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('emailHistory');
    const savedTemplates = localStorage.getItem('emailTemplates');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedTemplates) setTemplates(JSON.parse(savedTemplates));
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const insertRandomDots = (username: string): string => {
    if (username.length <= 1) return username;

    const chars = username.split('');
    const possiblePositions: number[] = [];

    for (let i = 1; i < chars.length; i++) {
      possiblePositions.push(i);
    }

    const numDots = Math.floor(Math.random() * (possiblePositions.length)) + 1;
    const selectedPositions = possiblePositions
      .sort(() => Math.random() - 0.5)
      .slice(0, numDots)
      .sort((a, b) => b - a);

    selectedPositions.forEach(pos => {
      chars.splice(pos, 0, '.');
    });

    return chars.join('');
  };

  const randomizeCase = (username: string): string => {
    return username.split('').map(char => {
      return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    }).join('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addToHistory = (email: string) => {
    const newHistory = [email, ...history.filter(e => e !== email)];
    setHistory(newHistory);
    localStorage.setItem('emailHistory', JSON.stringify(newHistory));
  };

  const applyTricks = (username: string, num: number): string => {
    let result = username;

    if (useDot) {
      result = insertRandomDots(result);
    }

    if (useUppercase && useLowercase) {
      result = randomizeCase(result);
    } else if (useUppercase) {
      result = result.toUpperCase();
    } else if (useLowercase) {
      result = result.toLowerCase();
    }

    if (usePlus) {
      result = `${result}+${num}`;
    }

    return result;
  };

  const applyDomainTricks = (domainName: string): string => {
    let result = domainName;

    if (useDomainRandom) {
      result = randomizeCase(result);
    }

    return result;
  };

  const generateSingleEmail = () => {
    if (!baseInput.trim()) return;

    setEmailError('');
    const username = baseInput.split('@')[0] || baseInput;
    const processedUsername = applyTricks(username, counter);
    const processedDomain = applyDomainTricks(domain);
    const newEmail = `${processedUsername}@${processedDomain}`;

    if (!validateEmail(newEmail)) {
      setEmailError('Format email tidak valid');
      return;
    }

    setGeneratedEmail(newEmail);
    addToHistory(newEmail);
    setCounter(counter + 1);

    navigator.clipboard.writeText(newEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateBulkEmails = () => {
    if (!baseInput.trim()) return;

    setEmailError('');
    const username = baseInput.split('@')[0] || baseInput;
    const emails: string[] = [];

    for (let i = 0; i < bulkCount; i++) {
      const num = bulkStart + i;
      const processedUsername = applyTricks(username, num);
      const processedDomain = applyDomainTricks(domain);
      const email = `${processedUsername}@${processedDomain}`;

      if (!validateEmail(email)) {
        setEmailError('Format email tidak valid');
        return;
      }

      emails.push(email);
    }

    setBulkEmails(emails);
    setShowPreview(false);
  };

  const generatePreview = () => {
    if (!baseInput.trim()) return;

    setEmailError('');
    const username = baseInput.split('@')[0] || baseInput;
    const emails: string[] = [];
    const previewCount = Math.min(5, bulkCount);

    for (let i = 0; i < previewCount; i++) {
      const num = bulkStart + i;
      const processedUsername = applyTricks(username, num);
      const processedDomain = applyDomainTricks(domain);
      const email = `${processedUsername}@${processedDomain}`;

      if (!validateEmail(email)) {
        setEmailError('Format email tidak valid');
        return;
      }

      emails.push(email);
    }

    setPreviewEmails(emails);
    setShowPreview(true);
  };

  const copyAllBulk = () => {
    const text = bulkEmails.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadEmails = () => {
    const text = bulkEmails.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emails-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetCounter = () => {
    setCounter(1);
  };

  const saveTemplate = () => {
    if (!templateName.trim()) return;

    const newTemplate: Template = {
      name: templateName,
      usePlus,
      useDot,
      useUppercase,
      useLowercase,
      useDomainRandom,
    };

    const updatedTemplates = [...templates, newTemplate];
    setTemplates(updatedTemplates);
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
    setTemplateName('');
    setShowTemplateSave(false);
  };

  const loadTemplate = (template: Template) => {
    setUsePlus(template.usePlus);
    setUseDot(template.useDot);
    setUseUppercase(template.useUppercase);
    setUseLowercase(template.useLowercase);
    setUseDomainRandom(template.useDomainRandom || false);
  };

  const deleteTemplate = (index: number) => {
    const updatedTemplates = templates.filter((_, i) => i !== index);
    setTemplates(updatedTemplates);
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('emailHistory');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && mode === 'single') {
      generateSingleEmail();
    }
  };

  const toggleTrick = (trick: 'plus' | 'dot' | 'uppercase' | 'lowercase' | 'domainRandom') => {
    switch (trick) {
      case 'plus':
        setUsePlus(!usePlus);
        break;
      case 'dot':
        setUseDot(!useDot);
        break;
      case 'uppercase':
        setUseUppercase(!useUppercase);
        break;
      case 'lowercase':
        setUseLowercase(!useLowercase);
        break;
      case 'domainRandom':
        setUseDomainRandom(!useDomainRandom);
        break;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'} p-3 sm:p-4 md:p-6`}>
      <div className="max-w-4xl mx-auto py-4 sm:py-6 md:py-8">
        <div className="flex justify-end mb-4 gap-2">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100'} shadow-md`}
            title="Cara Pakai"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100'} shadow-md`}
            title="History"
          >
            <History className="w-5 h-5" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100'} shadow-md`}
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {showHelp && (
          <div className={`rounded-2xl shadow-xl p-4 sm:p-6 mb-4 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold text-base sm:text-lg ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Panduan Lengkap</h3>
              <button
                onClick={() => setShowHelp(false)}
                className={`text-xs ${darkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className={`space-y-4 max-h-96 overflow-y-auto pr-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-blue-50'}`}>
                <h4 className={`font-bold mb-2 text-sm flex items-center gap-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">1</span>
                  Langkah Awal
                </h4>
                <ul className={`text-xs space-y-1 ml-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  <li>• Masukkan <strong>username email</strong> (tanpa @gmail.com)</li>
                  <li>• Pilih <strong>domain</strong> yang diinginkan (default: gmail.com)</li>
                  <li>• Pilih <strong>metode</strong> yang mau dipakai (bisa lebih dari satu)</li>
                </ul>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-green-50'}`}>
                <h4 className={`font-bold mb-2 text-sm flex items-center gap-2 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                  <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">2</span>
                  Metode Email
                </h4>
                <div className="ml-7 space-y-2">
                  <div>
                    <p className={`font-semibold text-xs ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Plus (+)</p>
                    <p className="text-xs">Contoh: namaanda+1@gmail.com, namaanda+2@gmail.com</p>
                    <p className={`text-xs italic ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Semua masuk ke inbox yang sama</p>
                  </div>
                  <div>
                    <p className={`font-semibold text-xs ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Titik (.)</p>
                    <p className="text-xs">Contoh: nama.anda@gmail.com, n.amaanda@gmail.com</p>
                    <p className={`text-xs italic ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Gmail anggap semua sama</p>
                  </div>
                  <div>
                    <p className={`font-semibold text-xs ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>UPPERCASE / lowercase (Username)</p>
                    <p className="text-xs">Ubah huruf besar/kecil di username</p>
                  </div>
                  <div>
                    <p className={`font-semibold text-xs ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Random Case (Domain)</p>
                    <p className="text-xs">Random huruf besar/kecil di domain (setelah @)</p>
                    <p className="text-xs">Contoh: namaanda@GmAiL.cOm atau namaanda@gMAIl.Com</p>
                  </div>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-purple-50'}`}>
                <h4 className={`font-bold mb-2 text-sm flex items-center gap-2 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                  <span className="bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">3</span>
                  Mode Generate
                </h4>
                <div className="ml-7 space-y-2">
                  <div>
                    <p className={`font-semibold text-xs ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Mode Satu</p>
                    <p className="text-xs">Buat 1 email langsung tersalin otomatis. Cocok untuk daftar cepat.</p>
                  </div>
                  <div>
                    <p className={`font-semibold text-xs ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Mode Banyak</p>
                    <p className="text-xs">Buat banyak email sekaligus (default 100).</p>
                    <p className="text-xs">Bisa <strong>Preview 5 email</strong> dulu sebelum generate semua.</p>
                  </div>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-orange-50'}`}>
                <h4 className={`font-bold mb-2 text-sm flex items-center gap-2 ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                  <span className="bg-orange-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">4</span>
                  Fitur Template
                </h4>
                <div className="ml-7 space-y-2 text-xs">
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Simpan Template:</p>
                    <ol className="list-decimal ml-4 space-y-1">
                      <li>Pilih kombinasi metode yang diinginkan (Plus, Dot, dll)</li>
                      <li>Klik tombol <strong>"Simpan Template"</strong> di bawah label metode</li>
                      <li>Masukkan nama template (misal: "Plus+Dot")</li>
                      <li>Klik <strong>Simpan</strong></li>
                    </ol>
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Pakai Template:</p>
                    <p>Klik nama template yang sudah disimpan untuk otomatis load kombinasi metode tersebut.</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Hapus Template:</p>
                    <p>Klik tombol <strong>X</strong> di sebelah nama template.</p>
                  </div>
                  <div className={`p-2 rounded mt-2 ${darkMode ? 'bg-slate-600' : 'bg-orange-100'}`}>
                    <p className={`text-xs font-semibold ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>Catatan Penting:</p>
                    <p className="text-xs">Template tersimpan di <strong>browser</strong> (localStorage). Data tidak hilang walau refresh atau tutup browser, tapi akan hilang jika:</p>
                    <ul className="list-disc ml-4 mt-1 space-y-0.5">
                      <li>Clear browser data / cache</li>
                      <li>Pakai mode incognito/private</li>
                      <li>Ganti browser atau device</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-pink-50'}`}>
                <h4 className={`font-bold mb-2 text-sm flex items-center gap-2 ${darkMode ? 'text-pink-400' : 'text-pink-700'}`}>
                  <span className="bg-pink-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">5</span>
                  Fitur Lainnya
                </h4>
                <div className="ml-7 space-y-2 text-xs">
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>History (Ikon Jam)</p>
                    <p>Lihat semua email yang pernah dibuat. Tersimpan di browser. Klik ikon History untuk munculkan, klik Sembunyikan untuk tutup.</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Dark Mode (Ikon Bulan/Matahari)</p>
                    <p>Toggle tema gelap/terang. Pengaturan tersimpan otomatis.</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Reset Counter</p>
                    <p>Di mode satu dengan metode Plus, counter otomatis naik. Klik Reset untuk mulai dari 1 lagi.</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>Download</p>
                    <p>Di mode banyak, hasil email bisa didownload jadi file .txt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showHistory && history.length > 0 && (
          <div className={`rounded-2xl shadow-xl p-4 sm:p-6 mb-4 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className={`font-bold text-sm sm:text-base ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Riwayat Email</h3>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total: {history.length} email</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHistory(false)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all ${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Sembunyikan
                </button>
                <button
                  onClick={clearHistory}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all"
                >
                  Hapus Semua
                </button>
              </div>
            </div>
            <div className={`space-y-1 max-h-60 overflow-y-auto ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {history.map((email, index) => (
                <div key={index} className={`text-xs font-mono p-2 rounded ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                  <span className={`mr-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{index + 1}.</span>
                  {email}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="text-center space-y-2">
            <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mb-2 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <Mail className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h1 className={`text-2xl sm:text-2xl md:text-3xl font-bold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>Email Generator</h1>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Buat varian email dengan berbagai metode</p>
          </div>

          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setMode('single')}
              className={`px-4 sm:px-5 md:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                mode === 'single'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : `${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
              }`}
            >
              Satu
            </button>
            <button
              onClick={() => setMode('bulk')}
              className={`px-4 sm:px-5 md:px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm sm:text-base ${
                mode === 'bulk'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : `${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
              }`}
            >
              <List className="w-4 h-4" />
              Banyak
            </button>
          </div>

          {emailError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {emailError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Username Email
              </label>
              <input
                type="text"
                value={baseInput}
                onChange={(e) => setBaseInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="namaanda"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${darkMode ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400' : 'bg-white border-slate-200 text-slate-900'}`}
              />
            </div>

            <div>
              <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Domain Email
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="gmail.com"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${darkMode ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400' : 'bg-white border-slate-200 text-slate-900'}`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={`block text-xs sm:text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Pilih Metode (bisa gabungan)
              </label>
              <button
                onClick={() => setShowTemplateSave(!showTemplateSave)}
                className={`text-xs flex items-center gap-1 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                <Save className="w-3 h-3" />
                Simpan Template
              </button>
            </div>

            {showTemplateSave && (
              <div className={`mb-3 p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Nama template..."
                  className={`w-full px-3 py-2 text-sm border rounded-lg mb-2 ${darkMode ? 'bg-slate-600 border-slate-500 text-slate-200 placeholder-slate-400' : 'bg-white border-slate-200'}`}
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveTemplate}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setShowTemplateSave(false)}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs ${darkMode ? 'bg-slate-600 hover:bg-slate-500 text-slate-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            {templates.length > 0 && (
              <div className="mb-3">
                <p className={`text-xs mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Template tersimpan:</p>
                <div className="flex flex-wrap gap-2">
                  {templates.map((template, index) => (
                    <div key={index} className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <button
                        onClick={() => loadTemplate(template)}
                        className={darkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-700 hover:text-blue-600'}
                      >
                        {template.name}
                      </button>
                      <button
                        onClick={() => deleteTemplate(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Metode Username:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleTrick('plus')}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                      usePlus
                        ? 'bg-blue-600 text-white shadow-md'
                        : `${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
                    }`}
                  >
                    Plus (+)
                  </button>
                  <button
                    onClick={() => toggleTrick('dot')}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                      useDot
                        ? 'bg-blue-600 text-white shadow-md'
                        : `${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
                    }`}
                  >
                    Titik (.)
                  </button>
                  <button
                    onClick={() => toggleTrick('uppercase')}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                      useUppercase
                        ? 'bg-blue-600 text-white shadow-md'
                        : `${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
                    }`}
                  >
                    UPPERCASE
                  </button>
                  <button
                    onClick={() => toggleTrick('lowercase')}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                      useLowercase
                        ? 'bg-blue-600 text-white shadow-md'
                        : `${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
                    }`}
                  >
                    lowercase
                  </button>
                </div>
              </div>

              <div>
                <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Metode Domain (setelah @):</p>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => toggleTrick('domainRandom')}
                    className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                      useDomainRandom
                        ? 'bg-green-600 text-white shadow-md'
                        : `${darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
                    }`}
                  >
                    Random Case (gMaIl.CoM)
                  </button>
                </div>
              </div>
            </div>
            <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Tekan untuk aktifkan/nonaktifkan. Bisa pilih lebih dari satu di setiap bagian.</p>
          </div>

          {mode === 'single' ? (
            <>
              <button
                onClick={generateSingleEmail}
                disabled={!baseInput.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-2 sm:py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                    Buat & Salin
                  </>
                )}
              </button>

              {generatedEmail && (
                <div className={`rounded-lg p-3 sm:p-4 border ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email yang dibuat:</p>
                  <p className={`font-mono text-xs sm:text-sm break-all ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{generatedEmail}</p>
                </div>
              )}

              {usePlus && (
                <div className={`pt-3 sm:pt-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                  <div className="flex items-center justify-center gap-3">
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                      Nomor urut: <span className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{counter}</span>
                    </p>
                    <button
                      onClick={resetCounter}
                      className={`text-xs flex items-center gap-1 transition-all ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                      title="Reset counter ke 1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Mulai dari Nomor
                  </label>
                  <input
                    type="number"
                    value={bulkStart}
                    onChange={(e) => setBulkStart(parseInt(e.target.value) || 1)}
                    min="1"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${darkMode ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-white border-slate-200'}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Jumlah Email
                  </label>
                  <input
                    type="number"
                    value={bulkCount}
                    onChange={(e) => setBulkCount(parseInt(e.target.value) || 100)}
                    min="1"
                    max="1000000"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${darkMode ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-white border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={generatePreview}
                  disabled={!baseInput.trim()}
                  className={`flex-1 font-medium py-2 sm:py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  Preview 5 Email
                </button>
                <button
                  onClick={generateBulkEmails}
                  disabled={!baseInput.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-2 sm:py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                  Buat {bulkCount}
                </button>
              </div>

              {showPreview && previewEmails.length > 0 && (
                <div className={`rounded-lg p-3 sm:p-4 border ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`text-xs mb-2 font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Preview 5 email pertama:</p>
                  <div className="space-y-1">
                    {previewEmails.map((email, index) => (
                      <p key={index} className={`font-mono text-xs break-all ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {email}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {bulkEmails.length > 0 && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Berhasil membuat {bulkEmails.length} email
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={copyAllBulk}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' : 'bg-slate-600 hover:bg-slate-700 text-white'}`}
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Tersalin!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Salin
                          </>
                        )}
                      </button>
                      <button
                        onClick={downloadEmails}
                        className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className={`rounded-lg p-3 sm:p-4 border max-h-60 sm:max-h-80 md:max-h-96 overflow-y-auto ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="space-y-1">
                      {bulkEmails.map((email, index) => (
                        <p key={index} className={`font-mono text-xs break-all ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                          {email}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>


        <div className={`mt-3 sm:mt-4 text-center text-xs sm:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <p>Dibuat oleh Iqra</p>
        </div>
      </div>
    </div>
  );
}

export default App;
