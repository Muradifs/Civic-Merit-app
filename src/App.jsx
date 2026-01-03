
import React, { useState, useEffect } from 'react';
import { 
  Leaf, Wallet, ShoppingBag, User, Bell, QrCode, Camera, Bike, 
  Users, History, MapPin, Bus, Globe, Settings, Square, Play, 
  Navigation, BarChart3, Link as LinkIcon, Hash, CheckCircle2, Copy, Zap
} from 'lucide-react';

// --- KONFIGURACIJA PODATAKA ---
const generateMockHash = () => "0x" + Array(16).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
const MOCK_WALLET_ADDRESS = "GB72PLQA5Y4...K9J2M"; 

const translations = {
  en: {
    greeting: "Hi", value: "value", level: "Level", nextLevel: "{xp} XP to next level.",
    dailyChallenge: "Daily Challenge", challengeDesc: "Car-free day - save CO2!",
    accept: "Accept Challenge", quickActions: "Quick Actions", scan: "Scan",
    report: "Report", start: "Start", stop: "Stop", invite: "Invite",
    walletTotal: "Total Balance", history: "Transaction History", marketTitle: "City Market",
    marketDesc: "Redeem your merits for rewards in", buy: "Buy", profile: "Profile",
    settings: "Settings", language: "Language", location: "Location", gpsSetting: "GPS Tracking",
    gpsOn: "Enabled", gpsOff: "Disabled", globalMap: "Global Presence", score: "Score",
    rank: "Rank", maxSupply: "Max Supply", circulating: "Circulating", walletAddr: "Pi Wallet Address",
    networkStatus: "Network Status", blockHeight: "Ledger Index", txHash: "Tx Hash",
    confirmed: "Confirmed", scpReady: "Pi Mainnet Online",
    nav: { act: "Act", wallet: "Wallet", market: "Market", profile: "Profile" },
    rewards: { parking: "1h Parking", bus: "Public Transport (30 min)", cinema: "Cinema Ticket", donation: "Animal Shelter Donation" },
    transactions: { glass: "Glass Recycling", bike: "Bike to Work", partner: "Partner Discount", scan: "QR Scan", ride: "Eco Ride", buy: "Purchase" }
  },
  hr: {
    greeting: "Bok", value: "vrijednosti", level: "Razina", nextLevel: "Još {xp} XP do nove razine.",
    dailyChallenge: "Dnevni Izazov", challengeDesc: "Dan bez automobila - uštedi CO2!",
    accept: "Prihvati Izazov", quickActions: "Brze Akcije", scan: "Skeniraj",
    report: "Prijavi", start: "Kreni", stop: "Zaustavi", invite: "Pozovi",
    walletTotal: "Ukupno stanje", history: "Povijest transakcija", marketTitle: "Gradska Tržnica",
    marketDesc: "Zamijeni svoje zasluge za nagrade u", buy: "Kupi", profile: "Profil",
    settings: "Postavke", language: "Jezik", location: "Lokacija", gpsSetting: "GPS Praćenje",
    gpsOn: "Uključeno", gpsOff: "Isključeno", globalMap: "Globalna prisutnost", score: "Bodovi",
    rank: "Rang", maxSupply: "Max Zaliha", circulating: "U optjecaju", walletAddr: "Pi Novčanik",
    networkStatus: "Status Mreže", blockHeight: "Ledger Index", txHash: "Tx Hash",
    confirmed: "Potvrđeno", scpReady: "Pi Mainnet Online",
    nav: { act: "Djeluj", wallet: "Novčanik", market: "Tržnica", profile: "Profil" },
    rewards: { parking: "1h Parking", bus: "Javni prijevoz (30 min)", cinema: "Kino Ulaznica", donation: "Donacija za Azil" },
    transactions: { glass: "Recikliranje stakla", bike: "Biciklom na posao", partner: "Partner popust", scan: "QR Skeniranje", ride: "Eko Vožnja", buy: "Kupnja" }
  },
  // (Ostali jezici su skraćeni radi preglednosti, ali logika radi za HR/EN)
};

const locations = [
  { country: "Croatia", city: "Zagreb", currency: "EUR", region: "eu" },
  { country: "Croatia", city: "Split", currency: "EUR", region: "eu" },
  { country: "Germany", city: "Berlin", currency: "EUR", region: "eu" },
  { country: "USA", city: "New York", currency: "USD", region: "na" },
];

const WorldMap = ({ selectedRegion }) => {
  const paths = {
    na: "M 50,60 L 120,50 L 160,90 L 130,160 L 80,140 Z", 
    eu: "M 230,60 L 300,50 L 320,90 L 280,100 L 240,90 Z", 
    as: "M 310,50 L 450,50 L 480,130 L 390,160 L 330,100 Z", 
  };
  const getColor = (regionKey) => selectedRegion === regionKey ? "#F59E0B" : "#E5E7EB"; 
  return (
    <div className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-4">
      <svg viewBox="0 0 500 300" className="w-full h-auto">
        <rect x="0" y="0" width="500" height="300" fill="#F9FAFB" rx="10" />
        <path d={paths.na} fill={getColor('na')} className="transition-colors duration-500" />
        <path d={paths.eu} fill={getColor('eu')} className="transition-colors duration-500" />
        <path d={paths.as} fill={getColor('as')} className="transition-colors duration-500" />
      </svg>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [merits, setMerits] = useState(1250);
  const [notification, setNotification] = useState(null);
  const [level, setLevel] = useState({ name: 'Eco Novice', progress: 75, max: 100 });
  const [lang, setLang] = useState('hr'); 
  const [currentLocation, setCurrentLocation] = useState(locations[0]); 
  const [isTracking, setIsTracking] = useState(false);
  const [gpsPermission, setGpsPermission] = useState(true);
  const [blockHeight, setBlockHeight] = useState(18243921);

  const t = translations[lang] || translations['en'];

  const [transactions, setTransactions] = useState([
    { id: 1, titleKey: 'glass', amount: 50, type: 'plus', date: '10:23', hash: generateMockHash() },
    { id: 2, titleKey: 'bike', amount: 120, type: 'plus', date: '08:45', hash: generateMockHash() },
  ]);

  const rewards = [
    { id: 1, titleKey: 'parking', suffix: `(${currentLocation.city})`, cost: 300, icon: <MapPin size={20} />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, titleKey: 'bus', cost: 200, icon: <Bus size={20} />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 3, titleKey: 'cinema', cost: 800, icon: <ShoppingBag size={20} />, color: 'bg-purple-100 text-purple-600' },
  ];

  useEffect(() => {
    const interval = setInterval(() => setBlockHeight(prev => prev + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleScan = () => {
    showNotification(`✅ +50 Merits! (${t.scan})`);
    setMerits(prev => prev + 50);
    setTransactions(prev => [{ id: Date.now(), titleKey: 'scan', amount: 50, type: 'plus', date: 'Now', hash: generateMockHash() }, ...prev]);
  };

  const toggleTracking = () => {
    if (!gpsPermission) return showNotification("⚠️ GPS is disabled!");
    setIsTracking(!isTracking);
    showNotification(isTracking ? "⏹️ Tracking Stopped" : "📍 GPS Tracking Started");
  };

  const HomeView = () => (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <p className="text-emerald-100 text-sm mb-1">{t.greeting}, Ivan 👋</p>
          <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-lg text-xs">
            <MapPin size={10} /><span>{currentLocation.city}</span>
          </div>
        </div>
        <div className="flex items-baseline space-x-2 mt-2 relative z-10">
          <h1 className="text-5xl font-bold">{merits}</h1><span className="text-emerald-200 font-medium">M</span>
        </div>
        <div className="mt-6 relative z-10">
          <div className="flex justify-between text-xs mb-2"><span>{t.level}: {level.name}</span><span>{level.progress}/{level.max} XP</span></div>
          <div className="w-full bg-black/20 rounded-full h-2"><div className="bg-white h-2 rounded-full transition-all duration-1000" style={{ width: `${(level.progress / level.max) * 100}%` }}></div></div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Bike size={20} /></div>
            <div><h3 className="font-bold text-gray-800">{t.dailyChallenge}</h3><p className="text-xs text-gray-500">{t.challengeDesc}</p></div>
          </div>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">+150 M</span>
        </div>
        <button onClick={toggleTracking} className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 ${isTracking ? 'bg-red-500 text-white' : 'bg-gray-900 text-white'}`}>
          {isTracking ? <><Square size={16} className="mr-1" /> {t.stop}</> : <><Play size={16} className="mr-1" /> {t.accept}</>}
        </button>
      </div>

      <div>
        <h3 className="font-bold text-gray-800 mb-4 px-1">{t.quickActions}</h3>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleScan} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50"><QrCode size={24} className="text-blue-600"/><span className="text-sm">{t.scan}</span></button>
          <button className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50"><Camera size={24} className="text-red-600"/><span className="text-sm">{t.report}</span></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20 relative overflow-hidden select-none">
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-xl z-50 flex items-center space-x-2">
           <CheckCircle2 size={16} className="text-emerald-400" /><span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-y-auto overflow-x-hidden">
        <div className="p-4 pt-12">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'wallet' && <div className="p-4 text-center">Wallet View Placeholder</div>}
          {activeTab === 'market' && <div className="p-4 text-center">Market View Placeholder</div>}
          {activeTab === 'profile' && <div className="p-4 text-center">Profile View Placeholder</div>}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 z-40 max-w-md mx-auto rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center">
             {['home', 'wallet', 'market', 'profile'].map(tab => (
               <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center space-y-1 ${activeTab === tab ? 'text-emerald-600 scale-110' : 'text-gray-400'}`}>
                 {tab === 'home' && <Zap size={24} />}
                 {tab === 'wallet' && <Wallet size={24} />}
                 {tab === 'market' && <ShoppingBag size={24} />}
                 {tab === 'profile' && <User size={24} />}
                 <span className="text-[10px] font-medium capitalize">{tab}</span>
               </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
