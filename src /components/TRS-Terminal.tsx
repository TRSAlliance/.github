import { useEffect, useState } from 'react';

const TRSTerminal = () => {
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [stealthKey, setStealthKey] = useState<string | null>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STEALTH_KEY || 'HIDDEN';
    setStealthKey(key);
    setLog((prev) => [...prev, `🦁 INIT: STEALTH_KEY ↝ '${key.slice(0, 6)}...'`]);
    setLog((prev) => [...prev, `🌫️ POETIC FOG: "A shadow moves beneath the lion gate"`]);
  }, []);

  const execute = () => {
    setLog((prev) => [...prev, `> ${input}`]);
    if (input === 'create-shadow-backup') {
      setLog((prev) => [...prev, `📦 Backup node stored in vault. Status: GHOST_MIRROR_SYNCHED`]);
    } else if (input === 'deploy-elevator-music') {
      setLog((prev) => [...prev, `🎵 [ERROR] Cannot deploy within Phantom Layer.`]);
    } else {
      setLog((prev) => [...prev, `Unknown command.`]);
    }
    setInput('');
  };

  return (
    <div className="bg-black text-green-400 font-mono p-4 rounded-lg shadow-lg h-[400px] overflow-y-auto">
      {log.map((line, idx) => <div key={idx}>{line}</div>)}
      <div className="flex mt-2">
        <span>$</span>
        <input
          className="bg-transparent border-none ml-2 outline-none flex-grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && execute()}
        />
      </div>
    </div>
  );
};

export default TRSTerminal;
