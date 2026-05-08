// === 环状光环 — Wavy Glowing Ring ===
// Reference: ~/Desktop/index.html (主人做的 demo)
// 移植到 portfolio 首页右侧

const canvas = document.getElementById("ringCanvas") || document.getElementById("ring-wave");
if (!canvas) throw new Error("ring-wave canvas not found");

const ctx = canvas.getContext("2d");

let w, h;

function resize() {
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  canvas.width = w * window.devicePixelRatio;
  canvas.height = h * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}
resize();
window.addEventListener("resize", resize);

function noiseWave(angle, time) {
  return (
    Math.sin(angle * 3.0 + time * 0.8) * 22 +
    Math.sin(angle * 5.5 - time * 1.1) * 13 +
    Math.sin(angle * 8.0 + time * 0.65) * 8 +
    Math.sin(angle * 13.0 - time * 0.5) * 4
  );
}

function drawWavyRing(time) {
  ctx.clearRect(0, 0, w, h);

  // 中心位置：右侧外面，露出一半多圆环
  const cx = w * 1.05;
  const cy = h * 0.52;

  // 半径自适应 — 更大
  const baseOuter = Math.min(w, h) * 0.82;
  const baseInner = baseOuter * 0.8;

  const points = 420;

  function createPath(offset = 0, extraWave = 1) {
    const outer = [];
    const inner = [];

    for (let i = 0; i <= points; i++) {
      const a = (Math.PI * 2 * i) / points;
      const rightFactor = Math.max(0, Math.cos(a));
      const waveStrength = 0.35 + rightFactor * 1.45;
      const wave = noiseWave(a, time + offset) * waveStrength * extraWave * 10;

      const ro = baseOuter + wave;
      const ri = baseInner + wave * 0.35;

      outer.push({ x: cx + Math.cos(a) * ro, y: cy + Math.sin(a) * ro });
      inner.push({ x: cx + Math.cos(a) * ri, y: cy + Math.sin(a) * ri });
    }

    ctx.beginPath();
    ctx.moveTo(outer[0].x, outer[0].y);
    for (let i = 1; i < outer.length; i++) ctx.lineTo(outer[i].x, outer[i].y);
    for (let i = inner.length - 1; i >= 0; i--) ctx.lineTo(inner[i].x, inner[i].y);
    ctx.closePath();
  }

  // 1. 背景暗蓝雾气
  const bgGlow = ctx.createRadialGradient(cx, cy, baseInner * 0.45, cx, cy, baseOuter * 1.25);
  bgGlow.addColorStop(0.0, "rgba(0, 0, 0, 0)");
  bgGlow.addColorStop(0.45, "rgba(13, 37, 66, 0.22)");
  bgGlow.addColorStop(1.0, "rgba(20, 75, 130, 0)");
  ctx.fillStyle = bgGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, baseOuter * 1.35, 0, Math.PI * 2);
  ctx.fill();

  // 2. 外层紫色辉光
  createPath(0.0, 1.1);
  const glow1 = ctx.createRadialGradient(cx, cy, baseInner, cx, cy, baseOuter * 1.15);
  glow1.addColorStop(0.0, "rgba(160, 90, 255, 0.00)");
  glow1.addColorStop(0.6, "rgba(150, 90, 255, 0.12)");
  glow1.addColorStop(1.0, "rgba(110, 60, 220, 0.28)");
  ctx.shadowColor = "rgba(160, 90, 255, 0.75)";
  ctx.shadowBlur = 80;
  ctx.fillStyle = glow1;
  ctx.fill();

  // 3. 第二层紫白光
  createPath(0.8, 0.75);
  const glow2 = ctx.createRadialGradient(cx, cy, baseInner * 0.9, cx, cy, baseOuter);
  glow2.addColorStop(0.0, "rgba(255, 255, 255, 0.18)");
  glow2.addColorStop(0.45, "rgba(205, 170, 255, 0.55)");
  glow2.addColorStop(0.8, "rgba(145, 110, 255, 0.42)");
  glow2.addColorStop(1.0, "rgba(90, 60, 200, 0.10)");
  ctx.shadowColor = "rgba(190, 150, 255, 0.9)";
  ctx.shadowBlur = 50;
  ctx.fillStyle = glow2;
  ctx.fill();

  // 4. 核心白色亮边
  createPath(1.4, 0.42);
  const glow3 = ctx.createRadialGradient(cx, cy, baseInner * 0.7, cx, cy, baseOuter * 0.95);
  glow3.addColorStop(0.0, "rgba(255, 255, 255, 0.98)");
  glow3.addColorStop(0.4, "rgba(255, 248, 255, 0.95)");
  glow3.addColorStop(0.75, "rgba(225, 205, 255, 0.75)");
  glow3.addColorStop(1.0, "rgba(255, 255, 255, 0.05)");
  ctx.shadowColor = "rgba(255, 255, 255, 1)";
  ctx.shadowBlur = 26;
  ctx.fillStyle = glow3;
  ctx.fill();

  // 5. 内部深色洞口
  ctx.shadowBlur = 0;
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const a = (Math.PI * 2 * i) / points;
    const rightFactor = Math.max(0, Math.cos(a));
    const wave = noiseWave(a, time + 2.1) * (0.25 + rightFactor * 0.65);
    const r = baseInner * 0.93 + wave * 0.18;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  const innerGradient = ctx.createRadialGradient(cx, cy, baseInner * 0.02, cx, cy, baseInner * 1.02);
  innerGradient.addColorStop(0.0, "rgba(2, 4, 10, 0.98)");
  innerGradient.addColorStop(0.45, "rgba(3, 8, 18, 0.92)");
  innerGradient.addColorStop(0.75, "rgba(6, 14, 28, 0.72)");
  innerGradient.addColorStop(1.0, "rgba(8, 18, 35, 0.15)");
  ctx.fillStyle = innerGradient;
  ctx.fill();

  // 6. 右侧边缘高光亮带
  const count = 150;
  const start = -1.05;
  const end = 1.05;
  const outerS = [], innerS = [];
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const a = start + (end - start) * t;
    const wave = Math.sin(a * 4.5 + time * 0.9) * 20 + Math.sin(a * 8.0 - time * 0.7) * 10;
    outerS.push({ x: cx + Math.cos(a) * (baseOuter + wave), y: cy + Math.sin(a) * (baseOuter + wave) });
    innerS.push({ x: cx + Math.cos(a) * (baseInner + wave * 0.2), y: cy + Math.sin(a) * (baseInner + wave * 0.2) });
  }
  ctx.beginPath();
  ctx.moveTo(outerS[0].x, outerS[0].y);
  for (let i = 1; i < outerS.length; i++) ctx.lineTo(outerS[i].x, outerS[i].y);
  for (let i = innerS.length - 1; i >= 0; i--) ctx.lineTo(innerS[i].x, innerS[i].y);
  ctx.closePath();
  const grad = ctx.createLinearGradient(cx + baseInner, cy, cx + baseOuter, cy);
  grad.addColorStop(0.0, "rgba(120, 190, 255, 0.02)");
  grad.addColorStop(0.38, "rgba(130, 200, 255, 0.22)");
  grad.addColorStop(0.58, "rgba(245, 252, 255, 0.98)");
  grad.addColorStop(0.76, "rgba(150, 210, 255, 0.5)");
  grad.addColorStop(1.0, "rgba(60, 140, 230, 0.05)");
  ctx.shadowColor = "rgba(160, 220, 255, 1)";
  ctx.shadowBlur = 40;
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function animate(now) {
  const time = now * 0.001;
  drawWavyRing(time);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
