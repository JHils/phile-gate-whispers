
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
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
					red: '#8B3A40',
					orange: '#A86F44',
					blue: '#475B74',
				},
				silver: '#9F9EA1',
				phile: {
					dark: '#333333',
					light: '#EEEEEE',
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'coin-spin': 'coin-spin 10s linear infinite',
				'text-glitch': 'text-glitch 8s ease-in-out infinite',
				'subtle-flicker': 'subtle-flicker 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
