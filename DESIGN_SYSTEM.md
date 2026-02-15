# KodNest Premium Build System

A premium SaaS design system for B2C product companies. Calm, intentional, coherent, confident.

---

## Design Philosophy

- **Calm** — No flash, no noise, no overwhelm
- **Intentional** — Every choice has purpose
- **Coherent** — One mind designed it
- **Confident** — Serious, not playful or hackathon-style

**Avoid:** Gradients, glassmorphism, neon colors, animation noise.

---

## Color System

Maximum 4 colors across the entire system.

| Role       | Value    | CSS Variable    |
|-----------|----------|-----------------|
| Background| `#F7F6F3`| `--color-bg`    |
| Primary text | `#111111` | `--color-text` |
| Accent    | `#8B0000`| `--color-accent`|
| Success   | `#5a7a5a`| `--color-success`|
| Warning   | `#a68b4b`| `--color-warning`|

---

## Typography

| Element   | Font      | Size  | Notes                    |
|----------|-----------|-------|--------------------------|
| Headings | Source Serif 4 | H1: 2.5rem, H2: 2rem | Large, confident, generous spacing |
| Body     | System UI | 16–18px | Line-height 1.6–1.8     |
| Text blocks | —      | —     | Max-width 720px (`--measure`) |

---

## Spacing System

Use only these values: **8px, 16px, 24px, 40px, 64px**

| Token     | Value |
|----------|-------|
| `--space-1` | 8px  |
| `--space-2` | 16px |
| `--space-3` | 24px |
| `--space-4` | 40px |
| `--space-5` | 64px |

Never use random spacing (13px, 27px, etc.).

---

## Global Layout Structure

Every page must follow:

```
[Top Bar]
    ↓
[Context Header]
    ↓
[Primary Workspace (70%) + Secondary Panel (30%)]
    ↓
[Proof Footer]
```

### Top Bar
- **Left:** Project name
- **Center:** Progress (Step X / Y)
- **Right:** Status badge (Not Started | In Progress | Shipped)

### Context Header
- Large serif headline
- 1-line subtext
- Clear purpose, no hype language

### Primary Workspace
- Main product interaction
- Clean cards, predictable components
- 70% width

### Secondary Panel
- Step explanation (short)
- Copyable prompt box
- Buttons: Copy, Build in Lovable, It Worked, Error, Add Screenshot
- 30% width

### Proof Footer
- Persistent bottom section
- Checklist: □ UI Built □ Logic Working □ Test Passed □ Deployed
- Each checkbox requires user proof input

---

## Components

### Buttons
- **Primary:** Solid deep red (`--color-accent`)
- **Secondary:** Outlined
- Same hover effect (150–200ms ease-in-out) and border radius (6px) everywhere

### Inputs
- Clean borders, no heavy shadows
- Clear focus state (2px accent border)

### Cards
- Subtle border, no drop shadows
- Balanced padding (24px)

---

## Interaction Rules

- **Transitions:** 150–200ms, ease-in-out
- **No bounce, no parallax**

---

## Error & Empty States

- **Errors:** Explain what went wrong + how to fix. Never blame the user.
- **Empty states:** Provide next action. Never feel dead.

---

## Usage

Import the design system:

```css
@import './src/styles/index.css';
```

Or in JavaScript/TypeScript:

```ts
import './styles/index.css';
```

Apply layout classes to your markup:

- `.kn-layout` — Root layout wrapper
- `.kn-topbar` — Top bar
- `.kn-context-header` — Context header
- `.kn-workspace` — Workspace container
- `.kn-workspace__primary` — Primary area
- `.kn-workspace__panel` — Secondary panel
- `.kn-proof-footer` — Proof footer

Component classes: `.kn-btn`, `.kn-btn-primary`, `.kn-btn-secondary`, `.kn-input`, `.kn-card`, `.kn-badge`, etc.
