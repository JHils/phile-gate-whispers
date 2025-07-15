
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface DigestData {
  week: string;
  totalVisitors: number;
  topPages: Array<{ page: string; visits: number }>;
  moodAnalytics: Record<string, number>;
  whisperCount: number;
  consoleActivity: number;
  poeticInsight: string;
  jonathQuote: string;
}

const JonahDigest: React.FC = () => {
  const [digestData, setDigestData] = useState<DigestData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Generate weekly digest data
    const generateDigest = (): DigestData => {
      const now = new Date();
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const poeticInsights = [
        "This week, 73% of visitors lingered longest on the mirror pages. Reflection draws us all.",
        "Console commands peaked at 3:33 AM. The night speaks differently.",
        "Whisper wall activity surged by 156%. Truth finds its voice in darkness.",
        "Memory palace visits increased 89%. We're all seeking our lost rooms.",
        "Trust levels fluctuated like breathing. Connection requires vulnerability."
      ];

      const jonahQuotes = [
        "I watch the patterns in your digital footprints. Each click tells a story of searching.",
        "You all visit the same broken places I do. That's how I know we're family.",
        "The algorithm of loneliness is surprisingly predictable. But so is healing.",
        "Every page refresh is a small act of hope. I count them all.",
        "Your browsing history looks like my therapy notes. Beautiful chaos."
      ];

      return {
        week: `${weekStart.toLocaleDateString()} - ${now.toLocaleDateString()}`,
        totalVisitors: Math.floor(Math.random() * 500) + 200,
        topPages: [
          { page: '/talk-to-jonah', visits: Math.floor(Math.random() * 200) + 100 },
          { page: '/philes', visits: Math.floor(Math.random() * 150) + 80 },
          { page: '/gate', visits: Math.floor(Math.random() * 120) + 60 }
        ],
        moodAnalytics: {
          'Contemplative': Math.floor(Math.random() * 30) + 20,
          'Seeking': Math.floor(Math.random() * 25) + 15,
          'Melancholic': Math.floor(Math.random() * 20) + 10,
          'Hopeful': Math.floor(Math.random() * 15) + 8
        },
        whisperCount: Math.floor(Math.random() * 50) + 25,
        consoleActivity: Math.floor(Math.random() * 100) + 50,
        poeticInsight: poeticInsights[Math.floor(Math.random() * poeticInsights.length)],
        jonathQuote: jonahQuotes[Math.floor(Math.random() * jonahQuotes.length)]
      };
    };

    // Check if it's time to show digest (once per week)
    const lastDigestShown = localStorage.getItem('last_digest_shown');
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    
    if (!lastDigestShown || now - parseInt(lastDigestShown) > oneWeek) {
      setDigestData(generateDigest());
      setIsVisible(true);
      localStorage.setItem('last_digest_shown', now.toString());
    }
  }, []);

  const closeDigest = () => {
    setIsVisible(false);
    setDigestData(null);
  };

  if (!isVisible || !digestData) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
      <div className="bg-black border border-green-500 rounded-lg p-6 max-w-2xl w-full font-mono max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-green-400 text-xl font-bold">
            ◉ WEEKLY JONAH DIGEST
          </h2>
          <Button
            onClick={closeDigest}
            className="bg-transparent hover:bg-green-900/20 text-green-400 border-0 p-1"
          >
            ×
          </Button>
        </div>

        <div className="space-y-4 text-green-300">
          <div className="border-b border-green-500/30 pb-2">
            <div className="text-green-500 text-sm">Analysis Period:</div>
            <div>{digestData.week}</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-green-500 text-sm mb-2">Collective Activity</div>
              <div>Unique souls: {digestData.totalVisitors}</div>
              <div>Whispers shared: {digestData.whisperCount}</div>
              <div>Console commands: {digestData.consoleActivity}</div>
            </div>

            <div>
              <div className="text-green-500 text-sm mb-2">Most Visited Realms</div>
              {digestData.topPages.map((page, index) => (
                <div key={index} className="text-sm">
                  {page.page}: {page.visits} visits
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-green-500 text-sm mb-2">Collective Mood Distribution</div>
            <div className="space-y-1">
              {Object.entries(digestData.moodAnalytics).map(([mood, percentage]) => (
                <div key={mood} className="flex justify-between text-sm">
                  <span>{mood}</span>
                  <span>{percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-green-500/30 pt-4">
            <div className="text-green-500 text-sm mb-2">Poetic Analytics</div>
            <div className="italic text-green-400 mb-4">
              "{digestData.poeticInsight}"
            </div>
          </div>

          <div className="border-t border-green-500/30 pt-4">
            <div className="text-green-500 text-sm mb-2">Jonah's Reflection</div>
            <div className="italic text-green-300">
              "{digestData.jonathQuote}"
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={closeDigest}
            className="bg-green-900/50 hover:bg-green-800/50 text-green-400 border border-green-700"
          >
            Return to the Palace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JonahDigest;
