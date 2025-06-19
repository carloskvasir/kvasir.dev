"use client";

// Utilitários para feedback háptico e sonoro
export class FeedbackUtils {
  // Feedback háptico refinado
  static vibrate(pattern: "success" | "error" | "warning" | "tap" = "tap") {
    if (!("vibrate" in navigator)) return;

    const patterns = {
      success: [100, 50, 100, 50, 200],
      error: [200, 100, 200, 100, 200],
      warning: [150, 75, 150],
      tap: [50],
    };

    navigator.vibrate(patterns[pattern]);
  }

  // Feedback sonoro sutil (Web Audio API)
  static playSound(
    type: "success" | "error" | "click" | "notification" = "click"
  ) {
    if (!window.AudioContext) return;

    try {
      const audioContext = new window.AudioContext();

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configurações por tipo de som
      const soundConfig = {
        success: { frequency: 800, duration: 200, volume: 0.1 },
        error: { frequency: 300, duration: 300, volume: 0.15 },
        click: { frequency: 1000, duration: 50, volume: 0.05 },
        notification: { frequency: 600, duration: 150, volume: 0.08 },
      };

      const config = soundConfig[type];

      oscillator.frequency.setValueAtTime(
        config.frequency,
        audioContext.currentTime
      );
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        config.volume,
        audioContext.currentTime + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + config.duration / 1000
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + config.duration / 1000);
    } catch (error) {
      // Silenciar erros de áudio para não afetar a funcionalidade
      console.debug("Audio feedback not available:", error);
    }
  }

  // Combina vibração e som
  static feedback(
    type: "success" | "error" | "warning" | "tap" = "tap",
    options: {
      enableSound?: boolean;
      enableVibration?: boolean;
    } = {}
  ) {
    const { enableSound = true, enableVibration = true } = options;

    if (enableVibration) {
      this.vibrate(type);
    }

    if (enableSound) {
      const soundType =
        type === "tap" ? "click" : type === "warning" ? "notification" : type;
      this.playSound(
        soundType as "success" | "error" | "click" | "notification"
      );
    }
  }

  // Efeito de pulse visual
  static pulseElement(
    element: HTMLElement,
    intensity: "light" | "medium" | "strong" = "medium"
  ) {
    if (!element) return;

    const intensityMap = {
      light: "scale-[1.02]",
      medium: "scale-[1.05]",
      strong: "scale-[1.1]",
    };

    element.classList.add("transition-transform", "duration-150");
    element.classList.add(intensityMap[intensity]);

    setTimeout(() => {
      element.classList.remove(intensityMap[intensity]);
    }, 150);
  }

  // Efeito ripple
  static rippleEffect(
    event: React.MouseEvent<HTMLElement>,
    color: string = "rgba(255, 255, 255, 0.3)"
  ) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.background = color;
    ripple.classList.add(
      "absolute",
      "rounded-full",
      "pointer-events-none",
      "animate-ping",
      "opacity-75"
    );

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// Hook para usar feedback
export function useFeedback() {
  return {
    success: () => FeedbackUtils.feedback("success"),
    error: () => FeedbackUtils.feedback("error"),
    warning: () => FeedbackUtils.feedback("warning"),
    tap: () => FeedbackUtils.feedback("tap"),
    pulse: (element: HTMLElement, intensity?: "light" | "medium" | "strong") =>
      FeedbackUtils.pulseElement(element, intensity),
    ripple: (event: React.MouseEvent<HTMLElement>, color?: string) =>
      FeedbackUtils.rippleEffect(event, color),
  };
}
