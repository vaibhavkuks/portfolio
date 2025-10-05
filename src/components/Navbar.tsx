"use client";

interface ProgressiveBlurProps {
  maxBlur?: number;
  steps?: number;
  direction?: "top" | "bottom";
  gradientDirection?: string;
  className?: string;
  children?: React.ReactNode;
}

const generateBlurLayers = (
  maxBlur: number,
  steps: number,
  gradientDirection: string
) => {
  const layers = [];
  const minBlur = 0.5;

  // Generate blur values exponentially
  // Using exponential growth: blur = minBlur * (maxBlur/minBlur)^(i/(steps-1))
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1); // normalized position [0, 1]
    const blurValue = minBlur * Math.pow(maxBlur / minBlur, t);

    // Generate gradient positions that correlate with blur values
    // Smaller blur values occupy less space, larger blur values occupy more space
    // Use the normalized blur value to determine spacing
    const normalizedBlur = (blurValue - minBlur) / (maxBlur - minBlur);

    // Calculate cumulative position based on exponential blur distribution
    let cumulativePos = 0;
    for (let j = 0; j <= i; j++) {
      const tj = j / (steps - 1);
      const relativeBlur = minBlur * Math.pow(maxBlur / minBlur, tj);
      const normalizedRelativeBlur =
        (relativeBlur - minBlur) / (maxBlur - minBlur);
      // Smaller blurs take less space (using square root), larger take more
      cumulativePos += Math.pow(normalizedRelativeBlur + 0.1, 0.7);
    }

    // Normalize cumulative position to percentage
    let totalWeight = 0;
    for (let j = 0; j < steps; j++) {
      const tj = j / (steps - 1);
      const relativeBlur = minBlur * Math.pow(maxBlur / minBlur, tj);
      const normalizedRelativeBlur =
        (relativeBlur - minBlur) / (maxBlur - minBlur);
      totalWeight += Math.pow(normalizedRelativeBlur + 0.1, 0.1);
    }

    const startPos = i === 0 ? 1 : (cumulativePos / totalWeight) * 80;
    const endPos =
      ((cumulativePos + Math.pow(normalizedBlur + 0.9, 1)) / totalWeight) * 100;

    layers.push({
      blur: blurValue,
      startPos: Math.round(startPos),
      endPos: Math.round(Math.min(endPos, 100)),
    });
  }

  return layers;
};

const ProgressiveBlurNavbar = ({
  maxBlur = 40,
  steps = 5,
  direction = "top",
  gradientDirection = "0deg",
  className = "",
  children,
}: ProgressiveBlurProps) => {
  const layers = generateBlurLayers(maxBlur, steps, gradientDirection);

  return (
    <div
      className={`fixed ${
        direction === "top" ? "top-0" : "bottom-0"
      } left-0 right-0 h-24 pointer-events-none z-40 ${className}`}
      style={{
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      }}
    >
      {layers.map((layer, index) => (
        <span
          key={index}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur.toFixed(1)}px)`,
            WebkitBackdropFilter: `blur(${layer.blur.toFixed(1)}px)`,
            mask: `linear-gradient(${gradientDirection}, transparent ${layer.startPos}%, #000 ${layer.endPos}%)`,
            WebkitMask: `linear-gradient(${gradientDirection}, transparent ${layer.startPos}%, #000 ${layer.endPos}%)`,
          }}
        ></span>
      ))}

      {/* Dark gradient overlay for subtlety */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))",
        }}
      ></div>

      {/* Navigation content */}
      {children || (
        <div className="absolute top-0 left-0 w-full h-16 flex items-center justify-end px-8 pointer-events-auto">
          <div className="flex gap-8">
            <a
              href="#"
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Work
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressiveBlurNavbar;
