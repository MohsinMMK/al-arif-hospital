import { Mail, Phone, Plus, Siren } from "lucide-react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { InteractionMotion } from "./interaction-context";
import "./contact-dock.css";

// Brand marks from Bootstrap Icons (MIT); license in public/third-party.
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
    </svg>
  );
}

type Channel = {
  key: string;
  label: string;
  detail: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
};

// Paste the hospital's page URLs here and the two social circles join the stack.
const facebookUrl = "";
const instagramUrl = "";

// Bottom to top once open: the most urgent line sits nearest the thumb.
const channels: Channel[] = [
  {
    key: "emergency",
    label: "Emergency 24/7",
    detail: "+91 98484 30017",
    href: "tel:+919848430017",
    icon: <Siren size={21} aria-hidden="true" />,
  },
  {
    key: "call",
    label: "Call reception",
    detail: "+91 85550 86667",
    href: "tel:+918555086667",
    icon: <Phone size={20} aria-hidden="true" />,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    detail: "Chat with reception",
    href: "https://wa.me/918555086667",
    icon: <WhatsAppIcon />,
    external: true,
  },
  {
    key: "email",
    label: "Email",
    detail: "aaghuri@gmail.com",
    href: "mailto:aaghuri@gmail.com",
    icon: <Mail size={20} aria-hidden="true" />,
  },
  {
    key: "facebook",
    label: "Facebook",
    detail: "Follow the hospital",
    href: facebookUrl,
    icon: <FacebookIcon />,
    external: true,
  },
  {
    key: "instagram",
    label: "Instagram",
    detail: "Follow the hospital",
    href: instagramUrl,
    icon: <InstagramIcon />,
    external: true,
  },
].filter((channel) => channel.href);

// Resting spots for the closed cluster: slot 0 sits in front, the rest
// tuck half behind it. The circles take turns moving through these spots.
const restingSlots = [
  { x: 0, y: 0, scale: 1, turn: 0 },
  { x: -24, y: -20, scale: 0.86, turn: -8 },
  { x: 4, y: -38, scale: 0.78, turn: 6 },
  { x: -40, y: 6, scale: 0.74, turn: -4 },
  { x: -18, y: -50, scale: 0.68, turn: 10 },
  { x: -46, y: -30, scale: 0.64, turn: -10 },
];

export function ContactDock() {
  const motionEnabled = useContext(InteractionMotion);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [rotation, setRotation] = useState(0);
  const dock = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Shuffle the stack while it rests, so it reads as alive without asking for attention.
  useEffect(() => {
    if (open || !motionEnabled) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setRotation((r) => r + 1);
    }, 2600);
    return () => window.clearInterval(id);
  }, [open, motionEnabled]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setPinned(false);
      toggle.current?.focus();
    };
    const closeOnOutside = (event: PointerEvent) => {
      // The scrim is the dock's own pseudo-element, so a press on it targets the dock itself.
      const target = event.target as Node;
      if (target === dock.current || !dock.current?.contains(target)) {
        setOpen(false);
        setPinned(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutside);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutside);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const hoverOpen = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hoverClose = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse" || pinned) return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 350);
  };
  const pressToggle = () => {
    // Only a hovering mouse opens the stack unpinned, so its click pins it instead of closing it.
    if (open && !pinned) {
      setPinned(true);
      return;
    }
    setOpen(!open);
    setPinned(!open);
  };

  const count = channels.length;
  return (
    <div
      ref={dock}
      className="cd"
      data-open={open ? "" : undefined}
      data-pinned={pinned ? "" : undefined}
      style={{ "--cd-count": channels.length } as CSSProperties}
      onPointerEnter={hoverOpen}
      onPointerLeave={hoverClose}
    >
      <ul id="contact-dock-list" className="cd-list" inert={!open}>
        {channels.map((channel, index) => {
          const slot = restingSlots[(index + rotation) % count];
          const style = {
            "--cd-rest-x": `${slot.x}px`,
            "--cd-rest-y": `${slot.y}px`,
            "--cd-rest-scale": slot.scale,
            "--cd-rest-turn": `${slot.turn}deg`,
            "--cd-rest-z": count - ((index + rotation) % count),
            "--cd-index": index,
          } as CSSProperties;
          return (
            <li key={channel.key} className="cd-item" style={style}>
              <a
                href={channel.href}
                data-channel={channel.key}
                {...(channel.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                onClick={() => {
                  setOpen(false);
                  setPinned(false);
                }}
              >
                <span className="cd-label">
                  <strong>{channel.label}</strong>
                  <span>{channel.detail}</span>
                  {channel.external && (
                    <span className="mu-sr"> (opens in a new tab)</span>
                  )}
                </span>
                <span className="cd-icon">{channel.icon}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <button
        ref={toggle}
        type="button"
        className="cd-toggle"
        aria-expanded={open}
        aria-controls="contact-dock-list"
        aria-label={open ? "Close contact options" : "Contact the hospital"}
        onClick={pressToggle}
      >
        <Plus size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
