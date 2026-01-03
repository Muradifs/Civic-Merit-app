import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Wallet, 
  ShoppingBag, 
  User, 
  Bell, 
  QrCode, 
  Camera, 
  Bike, 
  Users, 
  ChevronRight, 
  Trophy, 
  History,
  MapPin,
  Bus,
  Globe,
  Settings,
  Square,
  Play,
  Navigation,
  BarChart3,
  Link as LinkIcon,
  Hash,
  CheckCircle2,
  Copy,
  Zap // Ikona za Pi Mining/Energy feel
} from 'lucide-react';

// --- KONFIGURACIJA PODATAKA (DATA MOCK) ---

// 0. BLOCKCHAIN UTILS (PI NETWORK INTEGRADATION)
// Pi Network koristi Stellar Consensus Protocol (SCP). Adrese počinju s 'G' (Public Key).
const generateMockHash = () => "0x" + Array(16).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
const MOCK_WALLET_ADDRESS = "GB72PLQA5Y4...K9J2M"; // Stellar/Pi stil adrese

// 1. Prijevodi (Internationalization)
const translations = {
  hr: {
    greeting: "Bok",
    value: "vrijednosti",
    level: "Razina",
    nextLevel: "Još {xp} XP do nove razine.",
    dailyChallenge: "Dnevni Izazov",
    challengeDesc: "Dan bez automobila - uštedi CO2!",
    accept: "Prihvati Izazov",
    quickActions: "Brze Akcije",
    scan: "Skeniraj",
    report: "Prijavi",
    start: "Kreni",
    stop: "Zaustavi",
    invite: "Pozovi",
    walletTotal: "Ukupno stanje",
    history: "Povijest transakcija",
    marketTitle: "Gradska Tržnica",
    marketDesc: "Zamijeni svoje zasluge za nagrade u",
    buy: "Kupi",
    profile: "Profil",
    settings: "Postavke",
    language: "Jezik",
    location: "Lokacija",
    gpsSetting: "GPS Praćenje",
    gpsOn: "Uključeno",
    gpsOff: "Isključeno",
    globalMap: "Globalna prisutnost",
    score: "Bodovi",
    rank: "Rang",
    maxSupply: "Max Zaliha",
    circulating: "U optjecaju",
    // Blockchain specific (Pi Network)
    walletAddr: "Pi Novčanik",
    networkStatus: "Status Mreže",
    blockHeight: "Ledger Index",
    txHash: "Tx Hash",
    confirmed: "Potvrđeno",
    scpReady: "Pi Mainnet Online", // Ažurirano
    nav: { act: "Djeluj", wallet: "Novčanik", market: "Tržnica", profile: "Profil" },
    rewards: {
      parking: "1h Parking",
      bus: "Javni prijevoz (30 min)",
      cinema: "Kino Ulaznica",
      donation: "Donacija za Azil"
    },
    transactions: {
      glass: "Recikliranje stakla",
      bike: "Biciklom na posao",
      partner: "Partner popust",
      scan: "QR Skeniranje",
      ride: "Eko Vožnja",
      buy: "Kupnja"
    }
  },
  en: {
    greeting: "Hi",
    value: "value",
    level: "Level",
    nextLevel: "{xp} XP to next level.",
    dailyChallenge: "Daily Challenge",
    challengeDesc: "Car-free day - save CO2!",
    accept: "Accept Challenge",
    quickActions: "Quick Actions",
    scan: "Scan",
    report: "Report",
    start: "Start",
    stop: "Stop",
    invite: "Invite",
    walletTotal: "Total Balance",
    history: "Transaction History",
    marketTitle: "City Market",
    marketDesc: "Redeem your merits for rewards in",
    buy: "Buy",
    profile: "Profile",
    settings: "Settings",
    language: "Language",
    location: "Location",
    gpsSetting: "GPS Tracking",
    gpsOn: "Enabled",
    gpsOff: "Disabled",
    globalMap: "Global Presence",
    score: "Score",
    rank: "Rank",
    maxSupply: "Max Supply",
    circulating: "Circulating",
    // Blockchain specific (Pi Network)
    walletAddr: "Pi Wallet Address",
    networkStatus: "Network Status",
    blockHeight: "Ledger Index",
    txHash: "Tx Hash",
    confirmed: "Confirmed",
    scpReady: "Pi Mainnet Online", // Ažurirano
    nav: { act: "Act", wallet: "Wallet", market: "Market", profile: "Profile" },
    rewards: {
      parking: "1h Parking",
      bus: "Public Transport (30 min)",
      cinema: "Cinema Ticket",
      donation: "Animal Shelter Donation"
    },
    transactions: {
      glass: "Glass Recycling",
      bike: "Bike to Work",
      partner: "Partner Discount",
      scan: "QR Scan",
      ride: "Eco Ride",
      buy: "Purchase"
    }
  },
  de: {
    greeting: "Hallo",
    value: "Wert",
    level: "Stufe",
    nextLevel: "{xp} XP bis zur nächsten Stufe.",
    dailyChallenge: "Tagesherausforderung",
    challengeDesc: "Autofreier Tag - CO2 sparen!",
    accept: "Akzeptieren",
    quickActions: "Schnellaktionen",
    scan: "Scannen",
    report: "Melden",
    start: "Start",
    stop: "Stopp",
    invite: "Einladen",
    walletTotal: "Gesamtsaldo",
    history: "Transaktionsverlauf",
    marketTitle: "Stadtmarkt",
    marketDesc: "Tausche deine Verdienste gegen Belohnungen in",
    buy: "Kaufen",
    profile: "Profil",
    settings: "Einstellungen",
    language: "Sprache",
    location: "Standort",
    gpsSetting: "GPS-Ortung",
    gpsOn: "Aktiviert",
    gpsOff: "Deaktiviert",
    globalMap: "Globale Präsenz",
    score: "Punkte",
    rank: "Rang",
    maxSupply: "Max. Vorrat",
    circulating: "Im Umlauf",
    // Blockchain specific
    walletAddr: "Pi-Wallet-Adresse",
    networkStatus: "Netzwerkstatus",
    blockHeight: "Ledger Index",
    txHash: "Tx Hash",
    confirmed: "Bestätigt",
    scpReady: "Pi Mainnet Online", // Ažurirano
    nav: { act: "Handeln", wallet: "Geldbörse", market: "Markt", profile: "Profil" },
    rewards: {
      parking: "1h Parken",
      bus: "ÖPNV (30 Min)",
      cinema: "Kinokarte",
      donation: "Tierheimspende"
    },
    transactions: {
      glass: "Glasrecycling",
      bike: "Mit dem Rad zur Arbeit",
      partner: "Partnerrabatt",
      scan: "QR-Scan",
      ride: "Öko-Fahrt",
      buy: "Kauf"
    }
  },
  es: {
    greeting: "Hola",
    value: "valor",
    level: "Nivel",
    nextLevel: "{xp} XP para el siguiente nivel.",
    dailyChallenge: "Desafío Diario",
    challengeDesc: "Día sin coche - ¡ahorra CO2!",
    accept: "Aceptar",
    quickActions: "Acciones Rápidas",
    scan: "Escanear",
    report: "Reportar",
    start: "Empezar",
    stop: "Detener",
    invite: "Invitar",
    walletTotal: "Saldo Total",
    history: "Historial",
    marketTitle: "Mercado de la Ciudad",
    marketDesc: "Canjea tus méritos por recompensas en",
    buy: "Comprar",
    profile: "Perfil",
    settings: "Ajustes",
    language: "Idioma",
    location: "Ubicación",
    gpsSetting: "Rastreo GPS",
    gpsOn: "Activado",
    gpsOff: "Desactivado",
    globalMap: "Presencia Global",
    score: "Puntuación",
    rank: "Rango",
    maxSupply: "Suministro Máx",
    circulating: "Circulante",
    // Blockchain specific
    walletAddr: "Dirección Pi",
    networkStatus: "Estado de Red",
    blockHeight: "Índice Ledger",
    txHash: "Tx Hash",
    confirmed: "Confirmado",
    scpReady: "Pi Mainnet Online", // Ažurirano
    nav: { act: "Actuar", wallet: "Cartera", market: "Mercado", profile: "Perfil" },
    rewards: {
      parking: "1h Aparcamiento",
      bus: "Transporte Público (30 min)",
      cinema: "Entrada de Cine",
      donation: "Donación Refugio"
    },
    transactions: {
      glass: "Reciclaje de Vidrio",
      bike: "Bici al Trabajo",
      partner: "Descuento Socio",
      scan: "Escaneo QR",
      ride: "Viaje Eco",
      buy: "Compra"
    }
  }
};

// 2. Lokacije (Global Database)
const locations = [
  // HRVATSKA
  { country: "Croatia", city: "Zagreb", currency: "EUR", region: "eu" },
  { country: "Croatia", city: "Split", currency: "EUR", region: "eu" },
  { country: "Croatia", city: "Osijek", currency: "EUR", region: "eu" },
  { country: "Croatia", city: "Rijeka", currency: "EUR", region: "eu" },
  
  // EUROPA
  { country: "Germany", city: "Berlin", currency: "EUR", region: "eu" },
  { country: "Germany", city: "Munich", currency: "EUR", region: "eu" },
  { country: "France", city: "Paris", currency: "EUR", region: "eu" },
  { country: "Italy", city: "Rome", currency: "EUR", region: "eu" },
  { country: "Spain", city: "Barcelona", currency: "EUR", region: "eu" },
  { country: "Belgium", city: "Brussels", currency: "EUR", region: "eu" },
  { country: "Luxembourg", city: "Luxembourg", currency: "EUR", region: "eu" },
  { country: "Czech Rep.", city: "Prague", currency: "CZK", region: "eu" },
  { country: "Russia", city: "Moscow", currency: "RUB", region: "eu" },
  { country: "Turkey", city: "Istanbul", currency: "TRY", region: "eu" },
  { country: "UK", city: "London", currency: "GBP", region: "eu" },

  // SJEVERNA AMERIKA
  { country: "USA", city: "New York", currency: "USD", region: "na" },
  { country: "USA", city: "Los Angeles", currency: "USD", region: "na" },

  // AZIJA & BLISKI ISTOK
  { country: "Japan", city: "Tokyo", currency: "JPY", region: "as" },
  { country: "China", city: "Beijing", currency: "CNY", region: "as" },
  { country: "Singapore", city: "Singapore", currency: "SGD", region: "as" },
  { country: "UAE", city: "Dubai", currency: "AED", region: "as" },
  { country: "Qatar", city: "Doha", currency: "QAR", region: "as" },
  { country: "Iran", city: "Tehran", currency: "IRR", region: "as" },
  { country: "Israel", city: "Tel Aviv", currency: "ILS", region: "as" },
  { country: "Israel", city: "Haifa", currency: "ILS", region: "as" },

  // AFRIKA
  { country: "South Africa", city: "Johannesburg", currency: "ZAR", region: "af" },

  // AUSTRALIJA
  { country: "Australia", city: "Melbourne", currency: "AUD", region: "au" },
];

// 3. Komponenta Karte Svijeta (SVG)
const WorldMap = ({ selectedRegion }) => {
  const paths = {
    na: "M 50,60 L 120,50 L 160,90 L 130,160 L 80,140 Z", 
    sa: "M 140,170 L 190,170 L 210,250 L 170,290 L 130,220 Z", 
    eu: "M 230,60 L 300,50 L 320,90 L 280,100 L 240,90 Z", 
    af: "M 230,110 L 300,110 L 320,180 L 270,230 L 220,160 Z", 
    as: "M 310,50 L 450,50 L 480,130 L 390,160 L 330,100 Z", 
    au: "M 400,200 L 470,200 L 480,250 L 420,260 Z", 
  };

  const getColor = (regionKey) => {
    return selectedRegion === regionKey ? "#F59E0B" : "#E5E7EB"; // Pi Amber vs Gray (Pi Branding)
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-4">
      <svg viewBox="0 0 500 300" className="w-full h-auto">
        <rect x="0" y="0" width="500" height="300" fill="#F9FAFB" rx="10" />
        <path d={paths.na} fill={getColor('na')} className="transition-colors duration-500" />
        <path d={paths.sa} fill={getColor('sa')} className="transition-colors duration-500" />
        <path d={paths.eu} fill={getColor('eu')} className="transition-colors duration-500" />
        <path d={paths.af} fill={getColor('af')} className="transition-colors duration-500" />
        <path d={paths.as} fill={getColor('as')} className="transition-colors duration-500" />
        <path d={paths.au} fill={getColor('au')} className="transition-colors duration-500" />
        <circle cx="270" cy="80" r="3" fill={selectedRegion === 'eu' ? "#B45309" : "#D1D5DB"} className="animate-pulse"/>
        <circle cx="100" cy="100" r="3" fill={selectedRegion === 'na' ? "#B45309" : "#D1D5DB"} className="animate-pulse"/>
      </svg>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [merits, setMerits] = useState(1250);
  const [notification, setNotification] = useState(null);
  const [level, setLevel] = useState({ name: 'Eco Novice', progress: 75, max: 100 });
  
  // ZADANI JEZIK: Engleski ('en')
  const [lang, setLang] = useState('en'); 
  const [currentLocation, setCurrentLocation] = useState(locations[0]); 
  const [isTracking, setIsTracking] = useState(false);
  const [gpsPermission, setGpsPermission] = useState(true);
  
  // Blockchain State (Pi Network Ledger)
  const [blockHeight, setBlockHeight] = useState(18243921);

  const t = translations[lang];

  // KORISTIMO KLJUČEVE (keys) za transakcije + Hash
  const [transactions, setTransactions] = useState([
    { id: 1, titleKey: 'glass', amount: 50, type: 'plus', date: '10:23', hash: generateMockHash(), block: 18243918 },
    { id: 2, titleKey: 'bike', amount: 120, type: 'plus', date: '08:45', hash: generateMockHash(), block: 18243850 },
    { id: 3, titleKey: 'partner', amount: -30, type: 'minus', date: '14:15', hash: generateMockHash(), block: 18243100 },
  ]);

  const rewards = [
    { id: 1, titleKey: 'parking', suffix: `(${currentLocation.city})`, cost: 300, icon: <MapPin size={20} />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, titleKey: 'bus', cost: 200, icon: <Bus size={20} />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 3, titleKey: 'cinema', cost: 800, icon: <ShoppingBag size={20} />, color: 'bg-purple-100 text-purple-600' },
    { id: 4, titleKey: 'donation', cost: 500, icon: <Leaf size={20} />, color: 'bg-emerald-100 text-emerald-600' },
  ];

  // Simulacija rasta blokova (Pi Network Live feel)
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleScan = () => {
    showNotification(`✅ +50 Merits! (${t.scan})`);
    setMerits(prev => prev + 50);
    setTransactions(prev => [{ 
      id: Date.now(), 
      titleKey: 'scan', 
      amount: 50, 
      type: 'plus', 
      date: 'Now',
      hash: generateMockHash(), // Generiraj Hash
      block: blockHeight // Zapiši trenutni blok
    }, ...prev]);
    updateProgress(5);
  };

  const buyReward = (reward) => {
    if (merits >= reward.cost) {
      setMerits(prev => prev - reward.cost);
      const rewardTitle = t.rewards[reward.titleKey];
      showNotification(`🎉 ${t.buy}: ${rewardTitle}`);
      setTransactions(prev => [{ 
        id: Date.now(), 
        titleKey: 'buy', 
        amount: -reward.cost, 
        type: 'minus', 
        date: 'Now',
        hash: generateMockHash(),
        block: blockHeight
      }, ...prev]);
    } else {
      showNotification("❌ Nedovoljno Merita!");
    }
  };

  const toggleTracking = () => {
    if (!gpsPermission) {
      showNotification("⚠️ GPS is disabled in settings!");
      return;
    }

    if (isTracking) {
      setIsTracking(false);
      showNotification("⏹️ Tracking Stopped. Distance: 3.2km");
      updateProgress(15);
      setMerits(prev => prev + 30);
      setTransactions(prev => [{ 
        id: Date.now(), 
        titleKey: 'ride', 
        amount: 30, 
        type: 'plus', 
        date: 'Now',
        hash: generateMockHash(),
        block: blockHeight
      }, ...prev]);
    } else {
      setIsTracking(true);
      showNotification("📍 GPS Tracking Started. Go!");
    }
  };

  const updateProgress = (amount) => {
    setLevel(prev => {
      const newProgress = prev.progress + amount;
      if (newProgress >= 100) {
        showNotification("🏆 Level Up!");
        return { name: 'Eko Guardian', progress: 0, max: 200 };
      }
      return { ...prev, progress: newProgress };
    });
  };

  // --- KOMPONENTE ZASLONA ---

  const HomeView = () => (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      {/* Hero Kartica - PI NETWORK BOJE (Ljubičasta/Zlatna varijacija ili zadržavanje Eko-Zelene uz Pi detalje) */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
          <Zap size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <p className="text-emerald-100 text-sm mb-1">{t.greeting}, Ivan 👋</p>
            <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-lg text-xs">
              <MapPin size={10} />
              <span>{currentLocation.city}</span>
            </div>
          </div>
          
          <div className="flex items-baseline space-x-2 mt-2">
            <h1 className="text-5xl font-bold">{merits}</h1>
            <span className="text-emerald-200 font-medium">M</span>
          </div>
          <p className="text-xs text-emerald-200 mt-1">≈ {(merits / 100).toFixed(2)} {currentLocation.currency} {t.value}</p>
          
          <div className="mt-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold">{t.level}: {level.name}</span>
              <span>{level.progress}/{level.max} XP</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${(level.progress / level.max) * 100}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-emerald-100 mt-2">
              {t.nextLevel.replace('{xp}', level.max - level.progress)}
            </p>
          </div>
        </div>
      </div>

      {/* Dnevni Izazov */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <Bike size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{t.dailyChallenge}</h3>
              <p className="text-xs text-gray-500">{t.challengeDesc}</p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">+150 M</span>
        </div>
        <button 
          onClick={toggleTracking}
          className={`w-full py-3 rounded-xl font-medium text-sm transition active:scale-95 flex items-center justify-center space-x-2 
            ${isTracking ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
        >
          {isTracking ? (
             <><Square size={16} fill="currentColor" className="mr-1" /> {t.stop}</>
          ) : (
             <><Play size={16} fill="currentColor" className="mr-1" /> {t.accept}</>
          )}
        </button>
      </div>

      {/* Brze Akcije Grid */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4 px-1">{t.quickActions}</h3>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleScan} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50 transition active:scale-95">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <QrCode size={24} />
            </div>
            <span className="font-medium text-sm text-gray-700">{t.scan}</span>
          </button>
          
          <button onClick={() => showNotification("📷 Camera Open")} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50 transition active:scale-95">
            <div className="p-3 bg-red-50 text-red-600 rounded-full">
              <Camera size={24} />
            </div>
            <span className="font-medium text-sm text-gray-700">{t.report}</span>
          </button>

          <button 
            onClick={toggleTracking}
            className={`p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 transition active:scale-95 
              ${isTracking ? 'bg-red-50 hover:bg-red-100' : 'bg-white hover:bg-emerald-50'}`}
          >
            <div className={`p-3 rounded-full ${isTracking ? 'bg-red-100 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {isTracking ? <Square size={24} /> : <Bike size={24} />}
            </div>
            <span className={`font-medium text-sm ${isTracking ? 'text-red-600' : 'text-gray-700'}`}>
              {isTracking ? t.stop : t.start}
            </span>
          </button>

          <button onClick={() => showNotification("🔗 Link copied!")} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50 transition active:scale-95">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
              <Users size={24} />
            </div>
            <span className="font-medium text-sm text-gray-700">{t.invite}</span>
          </button>
        </div>
      </div>
    </div>
  );

  const WalletView = () => (
    <div className="space-y-6 pb-24 animate-in slide-in-from-right duration-300">
       <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
         <p className="text-gray-500 text-sm mb-1">{t.walletTotal}</p>
         <h2 className="text-4xl font-bold text-gray-900">{merits} <span className="text-emerald-500 text-2xl">M</span></h2>
         <p className="text-xs text-emerald-600 font-medium mt-2 bg-emerald-50 inline-block px-3 py-1 rounded-full">
           ≈ {(merits/100).toFixed(2)} {currentLocation.currency}
         </p>
         
         {/* PI NETWORK STATUS INDICATOR */}
         <div className="mt-4 pt-4 border-t border-gray-50 flex justify-center items-center text-xs text-gray-400 space-x-3">
             <div className="flex items-center text-purple-700 font-bold bg-purple-50 px-2 py-1 rounded-full">
                 <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                 {t.scpReady}
             </div>
             <div>
                 {t.blockHeight}: <span className="font-mono text-gray-600">#{blockHeight}</span>
             </div>
         </div>
       </div>

       {/* GLOBAL NETWORK STATS */}
       <div className="bg-gray-900 text-emerald-400 p-5 rounded-2xl shadow-lg border border-gray-800 flex justify-between items-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500 opacity-5 rounded-full -translate-y-10 translate-x-10 blur-xl"></div>
         
         <div className="relative z-10">
            <span className="text-gray-400 text-xs uppercase tracking-wider block mb-1 flex items-center gap-1">
              <BarChart3 size={12}/> {t.maxSupply}
            </span>
            <span className="font-mono text-2xl font-bold text-white">100T <span className="text-emerald-500 text-sm font-normal">Merits</span></span>
         </div>
         <div className="text-right relative z-10">
            <span className="text-gray-400 text-xs uppercase tracking-wider block mb-1">{t.circulating}</span>
            <span className="font-mono text-xl font-bold text-white">45.2M</span>
         </div>
       </div>

       {/* TRANSACTION HISTORY WITH HASH */}
       <div>
         <h3 className="font-bold text-gray-800 mb-4 px-1 flex items-center">
           <History size={18} className="mr-2"/> {t.history}
         </h3>
         <div className="space-y-3">
           {transactions.map(tx => (
             <div key={tx.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center group relative overflow-hidden">
               <div className="flex items-center space-x-3 relative z-10">
                 <div className={`p-2 rounded-full ${tx.type === 'plus' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                   {tx.type === 'plus' ? <Leaf size={16}/> : <ShoppingBag size={16}/>}
                 </div>
                 <div>
                   <p className="font-bold text-sm text-gray-800">{t.transactions[tx.titleKey] || tx.titleKey}</p>
                   <div className="flex items-center space-x-2">
                       <p className="text-xs text-gray-400">{tx.date}</p>
                       {/* TX HASH LINK */}
                       <span className="text-[10px] text-blue-400 bg-blue-50 px-1 rounded flex items-center font-mono cursor-pointer hover:bg-blue-100" onClick={() => showNotification("📋 Hash Copied")}>
                           <Hash size={8} className="mr-0.5"/> {tx.hash.substring(0, 6)}...
                       </span>
                   </div>
                 </div>
               </div>
               <div className="text-right">
                   <span className={`font-bold block ${tx.type === 'plus' ? 'text-emerald-600' : 'text-gray-900'}`}>
                     {tx.type === 'plus' ? '+' : ''}{tx.amount}
                   </span>
                   {/* Confirmation Check */}
                   <span className="text-[10px] text-green-500 flex items-center justify-end mt-1">
                       <CheckCircle2 size={10} className="mr-1"/> {t.confirmed}
                   </span>
               </div>
             </div>
           ))}
         </div>
       </div>
    </div>
  );

  const MarketView = () => (
    <div className="space-y-6 pb-24 animate-in slide-in-from-right duration-300">
      <div className="bg-gray-900 text-white p-6 rounded-3xl">
        <h2 className="text-2xl font-bold mb-1">{t.marketTitle}</h2>
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <MapPin size={14} />
          <p>{t.marketDesc} <span className="text-white font-bold">{currentLocation.city}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {rewards.map(reward => (
          <div key={reward.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${reward.color}`}>
                {reward.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">
                  {t.rewards[reward.titleKey]} {reward.suffix && <span className="text-gray-500 font-normal text-xs">{reward.suffix}</span>}
                </h3>
                <p className="text-emerald-600 font-bold text-sm">{reward.cost} Merita</p>
              </div>
            </div>
            <button 
              onClick={() => buyReward(reward)}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-500 hover:text-white transition"
            >
              {t.buy}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="flex flex-col items-center h-full pb-20 animate-in slide-in-from-right duration-300">
       <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-400 mt-8 relative">
         <User size={48} />
         <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center">
             <div className="w-2 h-2 bg-white rounded-full"></div>
         </div>
       </div>
       <h2 className="text-xl font-bold text-gray-900">Ivan Horvat</h2>
       <p className="text-emerald-600 font-medium mb-4">{level.name}</p>
       
       {/* WALLET ADDRESS CARD (BLOCKCHAIN IDENTITY) */}
       <div className="bg-gray-100 p-3 rounded-xl flex items-center space-x-2 mb-6 cursor-pointer hover:bg-gray-200 transition" onClick={() => showNotification("📋 Address Copied")}>
           <LinkIcon size={14} className="text-gray-500" />
           <span className="font-mono text-xs text-gray-600">{MOCK_WALLET_ADDRESS.substring(0, 10)}...{MOCK_WALLET_ADDRESS.substring(MOCK_WALLET_ADDRESS.length - 6)}</span>
           <Copy size={12} className="text-gray-400"/>
           <span className="text-[10px] bg-purple-100 text-purple-800 px-1 rounded ml-1 font-bold">Pi</span>
       </div>
       
       <div className="w-full space-y-6 px-2">
         {/* Stats */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
               <span className="block text-gray-400 text-xs">{t.score}</span>
               <span className="font-bold text-lg">4,520</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
               <span className="block text-gray-400 text-xs">{t.rank}</span>
               <span className="font-bold text-lg text-emerald-600">#14</span>
            </div>
         </div>

         {/* Settings Section */}
         <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-4">
           <h3 className="font-bold text-gray-800 flex items-center"><Settings size={18} className="mr-2"/> {t.settings}</h3>
           
           <div className="flex justify-between items-center pb-4 border-b border-gray-50">
             <div className="flex items-center text-gray-600 text-sm">
               <Navigation size={16} className="mr-2"/>
               {t.gpsSetting}
             </div>
             <button 
                onClick={() => {
                  setGpsPermission(!gpsPermission);
                  if (gpsPermission && isTracking) {
                    setIsTracking(false);
                    showNotification("⚠️ Tracking forced stop.");
                  }
                }}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${gpsPermission ? 'bg-emerald-500' : 'bg-gray-300'}`}
             >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${gpsPermission ? 'translate-x-6' : 'translate-x-0'}`} />
             </button>
           </div>
           
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">{t.globalMap}</p>
              <WorldMap selectedRegion={currentLocation.region} />
            </div>

           <div className="flex justify-between items-center">
             <div className="flex items-center text-gray-600 text-sm">
               <Globe size={16} className="mr-2"/>
               {t.language}
             </div>
             <select 
               value={lang} 
               onChange={(e) => setLang(e.target.value)}
               className="bg-gray-50 border border-gray-200 rounded-lg text-sm p-2 outline-none focus:border-emerald-500"
             >
               <option value="hr">Hrvatski 🇭🇷</option>
               <option value="en">English 🇬🇧</option>
               <option value="de">Deutsch 🇩🇪</option>
               <option value="es">Español 🇪🇸</option>
             </select>
           </div>

           <div className="flex justify-between items-center">
             <div className="flex items-center text-gray-600 text-sm">
               <MapPin size={16} className="mr-2"/>
               {t.location}
             </div>
             <select 
               value={currentLocation.city} 
               onChange={(e) => {
                 const city = e.target.value;
                 const loc = locations.find(l => l.city === city);
                 setCurrentLocation(loc);
                 showNotification(`📍 Lokacija promijenjena: ${city}`);
               }}
               className="bg-gray-50 border border-gray-200 rounded-lg text-sm p-2 outline-none focus:border-emerald-500"
             >
               {locations.map(loc => (
                 <option key={loc.city} value={loc.city}>{loc.city}, {loc.country}</option>
               ))}
             </select>
           </div>
         </div>
       </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col">
        
        {/* HEADER */}
        <header className="px-6 py-5 bg-white flex justify-between items-center sticky top-0 z-50 border-b border-gray-50">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Leaf size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">CivicMerit</span>
          </div>
          <div className="flex items-center space-x-3">
            {isTracking && (
              <div className="flex items-center space-x-1 bg-red-100 px-2 py-1 rounded-full animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-red-600">REC</span>
              </div>
            )}
            
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button onClick={() => setActiveTab('profile')} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center border border-gray-100 overflow-hidden">
               <span className="text-xs">{lang.toUpperCase()}</span>
            </button>
          </div>
        </header>

        {/* NOTIFICATION BANNER */}
        {notification && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg z-50 text-sm font-medium animate-in slide-in-from-top duration-300 flex items-center w-10/12 max-w-sm">
            {notification}
          </div>
        )}

        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'wallet' && <WalletView />}
          {activeTab === 'market' && <MarketView />}
          {activeTab === 'profile' && <ProfileView />}
        </main>

        <nav className="fixed bottom-0 max-w-md w-full bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`flex flex-col items-center space-y-1 transition ${activeTab === 'home' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <Leaf size={24} fill={activeTab === 'home' ? "currentColor" : "none"} />
            <span className="text-[10px] font-medium">{t.nav.act}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('wallet')}
            className={`flex flex-col items-center space-y-1 transition ${activeTab === 'wallet' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <Wallet size={24} fill={activeTab === 'wallet' ? "currentColor" : "none"} />
            <span className="text-[10px] font-medium">{t.nav.wallet}</span>
          </button>
          
          <div className="relative -top-6">
            <button 
              onClick={() => handleScan()}
              className="bg-gray-900 text-white p-4 rounded-full shadow-lg hover:scale-105 transition active:scale-95 ring-4 ring-gray-50"
            >
              <QrCode size={24} />
            </button>
          </div>

          <button 
            onClick={() => setActiveTab('market')}
            className={`flex flex-col items-center space-y-1 transition ${activeTab === 'market' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <ShoppingBag size={24} fill={activeTab === 'market' ? "currentColor" : "none"} />
            <span className="text-[10px] font-medium">{t.nav.market}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center space-y-1 transition ${activeTab === 'profile' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <User size={24} fill={activeTab === 'profile' ? "currentColor" : "none"} />
            <span className="text-[10px] font-medium">{t.nav.profile}</span>
          </button>
        </nav>

      </div>
    </div>
  );
}