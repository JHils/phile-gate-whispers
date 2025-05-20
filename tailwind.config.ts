
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"], // Enable class strategy for dark mode
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom colors for Jonah's Philes
				dust: {
					red: {
            DEFAULT: '#8B3A40',
            dark: '#a84a52'
          },
					orange: {
            DEFAULT: '#A86F44',
            dark: '#c88f64'
          },
					blue: {
            DEFAULT: '#475B74',
            dark: '#677d96'
          },
				},
				silver: '#9F9EA1',
				phile: {
					dark: {
            DEFAULT: '#333333',
            dark: '#222222'
          },
					light: {
            DEFAULT: '#EEEEEE',
            dark: '#CCCCCC'
          },
				},
			},
			fontFamily: {
				'typewriter': ['Special Elite', 'Courier New', 'monospace'],
				'serif': ['Playfair Display', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'coin-spin': {
					'0%': { transform: 'rotateY(0deg) scale(1)' },
					'50%': { transform: 'rotateY(180deg) scale(1.05)' },
					'100%': { transform: 'rotateY(360deg) scale(1)' }
				},
				'text-glitch': {
					'0%, 100%': { opacity: '1', transform: 'translate(0)' },
					'1%, 5%': { opacity: '0.8', transform: 'translate(-2px, 1px)' },
					'2%, 4%': { opacity: '0.9', transform: 'translate(2px, -1px)' },
					'3%': { opacity: '1', transform: 'translate(0)' }
				},
				'subtle-flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.98' },
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.5'
					}
				},
				"trust-pulse": {
					"0%, 100%": { boxShadow: "0 0 0 0 rgba(96, 165, 250, 0)" },
					"50%": { boxShadow: "0 0 0 6px rgba(96, 165, 250, 0.3)" }
				},
				"trust-glow": {
					"0%, 100%": { opacity: "0.5", filter: "blur(1px)" },
					"50%": { opacity: "0.8", filter: "blur(3px)" }
				},
				"trust-border-pulse": {
					"0%, 100%": { borderColor: "rgba(96, 165, 250, 0.4)" },
					"50%": { borderColor: "rgba(96, 165, 250, 0.8)" }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'coin-spin': 'coin-spin 10s linear infinite',
				'text-glitch': 'text-glitch 8s ease-in-out infinite',
				'subtle-flicker': 'subtle-flicker 2s ease-in-out infinite',
				'fade-in': 'fade-in 0.3s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				"trust-pulse": "trust-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"trust-glow": "trust-glow 3s ease-in-out infinite",
				"trust-border": "trust-border-pulse 4s ease-in-out infinite",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
