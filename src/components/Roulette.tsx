import { useState, useEffect } from "react";
import { getTitle, CATEGORY_A, CATEGORY_B, CATEGORY_C } from "../lib/words";

const SPIN_DURATION = 2000;

export function Roulette() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof getTitle> | null>(null);
  const [displayA, setDisplayA] = useState(CATEGORY_A[0]);
  const [displayB, setDisplayB] = useState(CATEGORY_B[0]);
  const [displayC, setDisplayC] = useState(CATEGORY_C[0]);

  const isValid = year.length === 4 && month.length > 0 && day.length > 0;

  const handleSpin = () => {
    if (!isValid || spinning) return;
    setSpinning(true);
    setResult(null);

    const finalResult = getTitle(Number(year), Number(month), Number(day));

    let count = 0;
    const interval = setInterval(() => {
      setDisplayA(CATEGORY_A[Math.floor(Math.random() * CATEGORY_A.length)]);
      setDisplayB(CATEGORY_B[Math.floor(Math.random() * CATEGORY_B.length)]);
      setDisplayC(CATEGORY_C[Math.floor(Math.random() * CATEGORY_C.length)]);
      count++;
      if (count > 20) {
        clearInterval(interval);
        setDisplayA(finalResult.a);
        setDisplayB(finalResult.b);
        setDisplayC(finalResult.c);
        setResult(finalResult);
        setSpinning(false);
      }
    }, SPIN_DURATION / 20);
  };

  const handleShare = () => {
    if (!result) return;
    const title = `${result.a.en} ${result.b.en} ${result.c.en}`;
    const text = `🎰 My legendary title is:\n"${title}"\n（${result.a.ja}・${result.b.ja}・${result.c.ja}）\n\nFind yours! 👇\nhttps://title-roulette.vercel.app\n#TitleRoulette #FarcasterMiniApp`;
    window.open(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleShareX = () => {
    if (!result) return;
    const title = `${result.a.en} ${result.b.en} ${result.c.en}`;
    const text = `🎰 My legendary title is:\n"${title}"\n（${result.a.ja}・${result.b.ja}・${result.c.ja}）\n\nFind yours! 👇\nhttps://title-roulette.vercel.app\n#TitleRoulette`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      color: "white",
      fontFamily: "sans-serif",
      padding: "20px",
    }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "4px" }}>
        🎰 Title Roulette
      </h1>
      <p style={{ fontSize: "0.8rem", opacity: 0.7, marginBottom: "4px" }}>
        Find your legendary title!
      </p>
      <p style={{ fontSize: "0.7rem", opacity: 0.5, marginBottom: "24px" }}>
        （あなたの伝説の称号を見つけよう！）
      </p>

      {/* 誕生日入力 */}
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "0.9rem", marginBottom: "4px" }}>Enter your birthday</p>
        <p style={{ fontSize: "0.7rem", opacity: 0.6, marginBottom: "12px" }}>（誕生日を入力してね）</p>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center" }}>
          <input
            type="number"
            placeholder="YYYY"
            value={year}
            onChange={e => setYear(e.target.value)}
            maxLength={4}
            style={{
              width: "80px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          />
          <span style={{ opacity: 0.6 }}>/</span>
          <input
            type="number"
            placeholder="MM"
            value={month}
            onChange={e => setMonth(e.target.value)}
            min={1}
            max={12}
            style={{
              width: "52px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          />
          <span style={{ opacity: 0.6 }}>/</span>
          <input
            type="number"
            placeholder="DD"
            value={day}
            onChange={e => setDay(e.target.value)}
            min={1}
            max={31}
            style={{
              width: "52px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          />
        </div>
      </div>

      {/* スロット */}
      <div style={{
        display: "flex",
        gap: "8px",
        marginBottom: "24px",
        padding: "16px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        {[displayA, displayB, displayC].map((word, i) => (
          <div
            key={i}
            style={{
              width: "90px",
              height: "80px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: spinning
                ? "linear-gradient(135deg, #e94560, #f5a623)"
                : result
                ? "linear-gradient(135deg, #f59e0b, #d97706)"
                : "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              transition: "background 0.3s",
              padding: "8px",
            }}
          >
            <p style={{ fontSize: "0.75rem", fontWeight: "bold", textAlign: "center", lineHeight: 1.3 }}>
              {word.en}
            </p>
            <p style={{ fontSize: "0.6rem", opacity: 0.8, textAlign: "center", marginTop: "4px" }}>
              {word.ja}
            </p>
          </div>
        ))}
      </div>

      {/* SPINボタン */}
      <button
        onClick={handleSpin}
        disabled={!isValid || spinning}
        style={{
          padding: "16px 48px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          background: !isValid || spinning
            ? "rgba(255,255,255,0.1)"
            : "linear-gradient(135deg, #e94560, #f5a623)",
          border: "none",
          borderRadius: "50px",
          color: "white",
          cursor: !isValid || spinning ? "not-allowed" : "pointer",
          boxShadow: isValid && !spinning ? "0 4px 20px rgba(233,69,96,0.5)" : "none",
          transition: "all 0.3s",
          marginBottom: "24px",
        }}
      >
        {spinning ? "🎰 Spinning..." : "🎰 SPIN!"}
      </button>

      {/* リザルト */}
      {result && !spinning && (
        <div style={{
          padding: "20px",
          background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
          border: "2px solid rgba(255,215,0,0.5)",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "320px",
          width: "100%",
        }}>
          <p style={{ fontSize: "0.7rem", color: "rgba(255,215,0,0.8)", letterSpacing: "2px", marginBottom: "8px" }}>
            ✨ YOUR LEGENDARY TITLE ✨
          </p>
          <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "4px", lineHeight: 1.4 }}>
            {result.a.en} {result.b.en} {result.c.en}
          </p>
          <p style={{ fontSize: "0.8rem", opacity: 0.7, marginBottom: "16px" }}>
            （{result.a.ja}・{result.b.ja}・{result.c.ja}）
          </p>

          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={handleShare}
              style={{
                padding: "10px 16px",
                background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                border: "none",
                borderRadius: "50px",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
            >
              🟣 Share on Farcaster
            </button>
            <button
              onClick={handleShareX}
              style={{
                padding: "10px 16px",
                background: "linear-gradient(135deg, #000, #333)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50px",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
            >
              𝕏 Share on X
            </button>
          </div>

          <button
            onClick={() => { setResult(null); setYear(""); setMonth(""); setDay(""); }}
            style={{
              marginTop: "12px",
              padding: "8px 24px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50px",
              color: "white",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            🔄 Try Again / もう一度
          </button>
        </div>
      )}
    </div>
  );
}