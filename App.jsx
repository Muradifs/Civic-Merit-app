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
  Bus
} from 'lucide-react';

export default function App() {
  // --- STANJA APLIKACIJE (STATE) ---
  const [activeTab, setActiveTab] = useState('home');
  const [merits, setMerits] = useState(1250);
  const [notification, setNotification] = useState(null);
  const [level, setLevel] = useState({ name: 'Eko Početnik', progress: 75, max: 100 });
  
  // Simulirani podaci za novčanik
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Recikliranje stakla', amount: 50, type: 'plus', date: 'Danas, 10:23' },
    { id: 2, title: 'Biciklom na posao', amount: 120, type: 'plus', date: 'Jučer, 08:45' },
    { id: 3, title: 'Kava (Partner popust)', amount: -30, type: 'minus', date: 'Jučer, 14:15' },
  ]);

  // Simulirani podaci za tržnicu
  const rewards = [
    { id: 1, title: '1h Parking (Zona 1)', cost: 300, icon: <MapPin size={20} />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, title: 'ZET Karta (30 min)', cost: 200, icon: <Bus size={20} />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 3, title: 'Kino Ulaznica', cost: 800, icon: <ShoppingBag size={20} />, color: 'bg-purple-100 text-purple-600' },
    { id: 4, title: 'Donacija za Azil', cost: 500, icon: <Leaf size={20} />, color: 'bg-emerald-100 text-emerald-600' },
  ];

  // --- FUNKCIJE ---

  // Prikaz obavijesti
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Funkcija za "Skeniranje" (Simulacija)
  const handleScan = () => {
    showNotification("✅ Verificirano! +50 Merita za recikliranje.");
    setMerits(prev => prev + 50);
    setTransactions(prev => [{ id: Date.now(), title: 'QR Verifikacija', amount: 50, type: 'plus', date: 'Upravo sada' }, ...prev]);
    updateProgress(5);
  };

  // Funkcija za kupovinu nagrade
  const buyReward = (reward) => {
    if (merits >= reward.cost) {
      setMerits(prev => prev - reward.cost);
      showNotification(`🎉 Kupljeno: ${reward.title}`);
      setTransactions(prev => [{ id: Date.now(), title: reward.title, amount: -reward.cost, type: 'minus', date: 'Upravo sada' }, ...prev]);
    } else {
      showNotification("❌ Nedovoljno Merita!");
    }
  };

  // Ažuriranje levela (Gamifikacija)
  const updateProgress = (amount) => {
    setLevel(prev => {
      const newProgress = prev.progress + amount;
      if (newProgress >= 100) {
        showNotification("🏆 Čestitamo! Postali ste Eko Čuvar!");
        return { name: 'Eko Čuvar', progress: 0, max: 200 };
      }
      return { ...prev, progress: newProgress };
    });
  };

  // --- KOMPONENTE ZASLONA ---

  // 1. HOME SCREEN
  const HomeView = () => (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      
      {/* Hero Kartica */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
          <Leaf size={120} />
        </div>
        
        <div className="relative z-10">
          <p className="text-emerald-100 text-sm mb-1">Bok, Ivane 👋</p>
          <div className="flex items-baseline space-x-2">
            <h1 className="text-5xl font-bold">{merits}</h1>
            <span className="text-emerald-200 font-medium">M</span>
          </div>
          <p className="text-xs text-emerald-200 mt-1">≈ {(merits / 100).toFixed(2)} € vrijednosti</p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold">{level.name}</span>
              <span>{level.progress}/{level.max} XP</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${(level.progress / level.max) * 100}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-emerald-100 mt-2">Još {level.max - level.progress} XP do nove razine.</p>
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
              <h3 className="font-bold text-gray-800">Dan bez automobila</h3>
              <p className="text-xs text-gray-500">Uštedi CO2, zaradi Merite</p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">+150 M</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">Prošeći ili bicikliraj danas minimalno 3 kilometra. GPS praćenje je spremno.</p>
        <button 
          onClick={() => {
            showNotification("🚀 Izazov prihvaćen! GPS praćenje aktivirano.");
            updateProgress(10);
          }}
          className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition active:scale-95"
        >
          Prihvati Izazov
        </button>
      </div>

      {/* Brze Akcije Grid */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4 px-1">Brze Akcije</h3>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleScan} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50 transition active:scale-95">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <QrCode size={24} />
            </div>
            <span className="font-medium text-sm text-gray-700">Skeniraj</span>
          </button>
          
          <button onClick={() => showNotification("📷 Kamera otvorena. Slikajte problem.")} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50 transition active:scale-95">
            <div className="p-3 bg-red-50 text-red-600 rounded-full">
              <Camera size={24} />
            </div>
            <span className="font-medium text-sm text-gray-700">Prijavi</span>
          </button>

          <button onClick={() => showNotification("📍 Praćenje rute započeto.")} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50 transition active:scale-95">
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <Bike size={24} />
            </div>
            <span className="font-medium text-sm text-gray-700">Kreni</span>
          </button>

          <button onClick={() => showNotification("🔗 Link za poziv kopiran!")} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50 transition active:scale-95">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
              <Users size={24} />
            </div>
            <span className="font-medium text-sm text-gray-700">Pozovi</span>
          </button>
        </div>
      </div>
    </div>
  );

  // 2. WALLET SCREEN
  const WalletView = () => (
    <div className="space-y-6 pb-24 animate-in slide-in-from-right duration-300">
       <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
         <p className="text-gray-500 text-sm mb-1">Ukupno stanje</p>
         <h2 className="text-4xl font-bold text-gray-900">{merits} <span className="text-emerald-500 text-2xl">M</span></h2>
         <p className="text-xs text-emerald-600 font-medium mt-2 bg-emerald-50 inline-block px-3 py-1 rounded-full">
           Vrijednost: {(merits/100).toFixed(2)} €
         </p>
       </div>

       <div>
         <h3 className="font-bold text-gray-800 mb-4 px-1 flex items-center">
           <History size={18} className="mr-2"/> Povijest transakcija
         </h3>
         <div className="space-y-3">
           {transactions.map(tx => (
             <div key={tx.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
               <div className="flex items-center space-x-3">
                 <div className={`p-2 rounded-full ${tx.type === 'plus' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                   {tx.type === 'plus' ? <Leaf size={16}/> : <ShoppingBag size={16}/>}
                 </div>
                 <div>
                   <p className="font-bold text-sm text-gray-800">{tx.title}</p>
                   <p className="text-xs text-gray-400">{tx.date}</p>
                 </div>
               </div>
               <span className={`font-bold ${tx.type === 'plus' ? 'text-emerald-600' : 'text-gray-900'}`}>
                 {tx.type === 'plus' ? '+' : ''}{tx.amount}
               </span>
             </div>
           ))}
         </div>
       </div>
    </div>
  );

  // 3. MARKET SCREEN
  const MarketView = () => (
    <div className="space-y-6 pb-24 animate-in slide-in-from-right duration-300">
      <div className="bg-gray-900 text-white p-6 rounded-3xl">
        <h2 className="text-2xl font-bold mb-1">Gradska Tržnica</h2>
        <p className="text-gray-400 text-sm">Zamijeni svoje zasluge za nagrade.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {rewards.map(reward => (
          <div key={reward.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${reward.color}`}>
                {reward.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{reward.title}</h3>
                <p className="text-emerald-600 font-bold text-sm">{reward.cost} Merita</p>
              </div>
            </div>
            <button 
              onClick={() => buyReward(reward)}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-500 hover:text-white transition"
            >
              Kupi
            </button>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mt-4">
        <p className="text-xs text-blue-800 text-center">
          💡 Novi partneri dolaze svaki tjedan! Zadrži aplikaciju ažuriranom.
        </p>
      </div>
    </div>
  );

  // 4. PROFILE SCREEN (Simuliran)
  const ProfileView = () => (
    <div className="flex flex-col items-center justify-center h-full pb-20 animate-in slide-in-from-right duration-300">
       <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-400">
         <User size={48} />
       </div>
       <h2 className="text-xl font-bold text-gray-900">Ivan Horvat</h2>
       <p className="text-emerald-600 font-medium mb-8">{level.name}</p>
       
       <div className="w-full space-y-2">
         <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
           <span>Ukupno zarađeno</span>
           <span className="font-bold">4,520 M</span>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
           <span>Pozicija u kvartu</span>
           <span className="font-bold text-emerald-600">#14</span>
         </div>
       </div>
       
       <button className="mt-8 text-red-500 text-sm font-medium">Odjavi se</button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900 flex justify-center">
      {/* Container za mobitel simulaciju na desktopu */}
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
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center border border-gray-100">
              <User size={16} className="text-gray-500" />
            </div>
          </div>
        </header>

        {/* NOTIFICATION BANNER */}
        {notification && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg z-50 text-sm font-medium animate-in slide-in-from-top duration-300 flex items-center w-10/12 max-w-sm">
            {notification}
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'wallet' && <WalletView />}
          {activeTab === 'market' && <MarketView />}
          {activeTab === 'profile' && <ProfileView />}
        </main>

        {/* BOTTOM NAVIGATION */}
        <nav className="fixed bottom-0 max-w-md w-full bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`flex flex-col items-center space-y-1 transition ${activeTab === 'home' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <Leaf size={24} fill={activeTab === 'home' ? "currentColor" : "none"} />
            <span className="text-[10px] font-medium">Djeluj</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('wallet')}
            className={`flex flex-col items-center space-y-1 transition ${activeTab === 'wallet' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <Wallet size={24} fill={activeTab === 'wallet' ? "currentColor" : "none"} />
            <span className="text-[10px] font-medium">Novčanik</span>
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
            <span className="text-[10px] font-medium">Tržnica</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center space-y-1 transition ${activeTab === 'profile' ? 'text-emerald-600' : 'text-gray-400'}`}
          >
            <User size={24} fill={activeTab === 'profile' ? "currentColor" : "none"} />
            <span className="text-[10px] font-medium">Profil</span>
          </button>
        </nav>

      </div>
    </div>
  );
}