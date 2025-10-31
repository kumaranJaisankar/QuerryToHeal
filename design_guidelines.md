# QueryToHeal - Design Guidelines

## Design Approach
**System-Based Approach**: Drawing from successful Q&A platforms (Stack Overflow, Reddit, Quora) combined with shadcn/ui component library. Focus on information hierarchy, readability, and community engagement while maintaining a trustworthy, health-focused aesthetic.

## Core Design Principles
- **Trust & Credibility**: Clean, professional interface that inspires confidence in health information
- **Readability First**: Optimal typography and spacing for long-form content consumption
- **Clear Hierarchy**: Distinct visual separation between questions, answers, and nested replies
- **Community Identity**: Warm, approachable design that encourages participation

---

## Typography System

### Font Families
- **Primary (Body/UI)**: Inter or System UI Stack for optimal readability
- **Headings**: Inter Semi-Bold/Bold for questions and section headers
- **Code/Technical**: JetBrains Mono for any medical terminology or citations

### Type Scale
- **Hero Banner Text**: text-4xl/5xl font-bold (health facts)
- **Question Titles**: text-2xl/3xl font-semibold
- **Section Headers**: text-xl font-semibold
- **Body Text**: text-base leading-relaxed (answers, descriptions)
- **Metadata**: text-sm text-muted-foreground (timestamps, author info)
- **Badges**: text-xs font-medium (Expert, Anonymous tags)

---

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 4, 6, 8, 12, 16, 20** for consistent rhythm
- Tight spacing: `gap-2`, `p-2` (badges, inline elements)
- Standard spacing: `gap-4`, `p-4`, `space-y-4` (card internals, form fields)
- Section spacing: `gap-8`, `py-8`, `space-y-8` (between major sections)
- Page margins: `px-4 md:px-8 lg:px-12`, `py-12 md:py-16`

### Grid & Container Strategy
- **Max Content Width**: `max-w-6xl mx-auto` for main feed
- **Question Detail**: `max-w-4xl mx-auto` for optimal reading
- **Sidebar Layout** (Desktop): 
  - Main content: 2/3 width
  - Sidebar: 1/3 width (related questions, health tips)
- **Responsive Breakpoints**: Mobile-first, stack all columns on mobile

---

## Component Library

### 1. Navigation Header
- **Structure**: Fixed top bar with logo, search, user menu
- **Height**: `h-16` with `px-4 md:px-8`
- **Elements**: 
  - Logo/brand (left): Health-themed icon + "QueryToHeal" text
  - Search bar (center): Prominent, `w-full max-w-xl` 
  - User actions (right): Notifications, profile dropdown, "Ask Question" CTA
- **Styling**: Subtle border-bottom, backdrop blur for scroll effect

### 2. Health Facts Auto-Slide Banner
- **Placement**: Immediately below header on homepage only
- **Height**: `h-32 md:h-40` 
- **Design**: 
  - Gradient background (subtle, health-themed)
  - Large, centered text with icon
  - Smooth 5-second auto-transition
  - Subtle dot indicators at bottom
  - 5 pre-loaded health facts

### 3. Question Feed Cards
- **Card Structure**:
  - Border with subtle shadow on hover
  - `p-6` padding, `rounded-lg`
  - Vote counter (left side, vertical layout)
  - Content area (right): Title, description preview, metadata row
- **Metadata Row**: 
  - Author name/avatar or "Anonymous" badge
  - Expert badge (if applicable) - small pill with icon
  - Timestamp (relative: "2h ago")
  - Reply count with icon
  - Tags (optional health categories)
- **Interaction**: Entire card clickable, subtle hover lift effect

### 4. Question Detail Page
- **Hero Section**:
  - Large question title (text-3xl font-bold)
  - Full description with proper paragraph spacing
  - Author card: avatar, name, join date, expert badge
  - Action bar: Share, Follow, Report buttons
  - Visual separator before replies
- **Reply Section**:
  - "X Answers" header with sort dropdown (Best, Newest, Oldest)
  - Reply composer (for logged-in users) at top
  - Threaded reply cards below

### 5. Reply Thread Component
- **Visual Threading**:
  - Vertical line on left connecting nested replies
  - Indentation: `ml-8` for each level (max 3 levels)
  - Each reply in its own card with `border-l-4` for hierarchy
- **Reply Card**:
  - `p-4` padding, subtle background on nested replies
  - Avatar + author info header
  - Reply content with rich formatting
  - Action footer: Upvote/downvote, Reply button, timestamp
  - Expert badge prominent if author is expert
  - "Anonymous User" with generic avatar for anonymous posts

### 6. Ask Question Modal/Form
- **Layout**: Large centered modal (`max-w-3xl`)
- **Form Fields**:
  - Title input: Large, prominent (`text-lg`)
  - Description editor: Textarea with min-height, formatting toolbar
  - Post as: Toggle between username/anonymous (radio buttons)
  - Category tags: Multi-select dropdown
  - Submit button: Large, primary CTA
- **Footer**: Guidelines reminder text (small, muted)

### 7. Profile Page
- **Header Section**:
  - Large avatar (left)
  - User info (right): Username, join date, bio, expert status
  - Stats row: Questions asked, Answers given, Helpful votes
- **Tabs**: "Questions" and "Answers" with content lists below
- **Content Lists**: Similar to feed cards but compact version

### 8. Authentication Pages
- **Layout**: Centered card on neutral background, `max-w-md`
- **Card Design**:
  - Logo at top
  - Form title
  - Input fields: `space-y-4`, labels above inputs
  - Primary button (full width)
  - Divider with "OR"
  - Google sign-in button (outlined, with Google icon)
  - Footer links: "Don't have an account? Sign up"
- **Register Form**: Add DOB field with date picker

### 9. Badges & Status Indicators
- **Expert Badge**: 
  - Small pill with checkmark icon
  - Distinct styling (border + icon)
  - Appears next to username
- **Anonymous Badge**: 
  - Subtle, neutral badge
  - Generic avatar placeholder
- **Post Status**: "New" label for recent questions (<24h)

### 10. Sidebar Components (Desktop)
- **Related Questions**: Compact list with `text-sm`, max 5 items
- **Health Tips Card**: Rotating daily tip, card format
- **Top Contributors**: Avatar grid with usernames
- **Spacing**: Each widget with `p-4`, `space-y-4` between widgets

---

## Images

### Hero Section
**No traditional hero image**. The auto-slide banner serves as the visual anchor with health-themed illustrations/icons per fact (simple, icon-based graphics, not photos).

### User Avatars
- Default avatar: Healthcare-themed placeholder icon
- User uploaded: Circular crop, `w-10 h-10` (standard), `w-16 h-16` (profile page)

### Decorative Elements
- Empty state illustrations for "No questions yet" screens
- Icon library: Heroicons for all UI icons (outline style for default, solid for active states)

---

## Interaction Patterns

### Buttons
- **Primary CTA** ("Ask Question", "Submit"): Large, prominent, rounded-lg
- **Secondary** (Cancel, Edit): Outlined or ghost style
- **Icon Buttons** (Upvote, Share): Minimal, icon-only with tooltip
- **Hover States**: Subtle scale (scale-[1.02]) or background shift
- **Buttons on Banners**: Blur backdrop (`backdrop-blur-sm bg-white/90`)

### Cards & Containers
- **Default**: `border rounded-lg` with subtle shadow
- **Hover**: `hover:shadow-md transition-shadow`
- **Active/Clicked**: Slight background change
- **Focus**: Ring indicator for accessibility

### Modals & Overlays
- **Backdrop**: `bg-black/50` with blur
- **Modal**: Centered, slide-in animation, `rounded-xl`
- **Close**: X button top-right with hover state

### Loading States
- Skeleton screens for feed loading
- Spinner for form submissions
- Progressive loading for infinite scroll

---

## Accessibility Implementation

- **Color Contrast**: All text meets WCAG AA (4.5:1 minimum)
- **Focus Indicators**: Visible ring on all interactive elements
- **Keyboard Navigation**: Full tab order, escape to close modals
- **ARIA Labels**: Proper roles and labels for screen readers
- **Form Validation**: Inline error messages with icons
- **Alt Text**: Required for all user-uploaded images

---

## Responsive Behavior

### Mobile (<768px)
- Single column layout
- Collapsible navigation (hamburger menu)
- Bottom sticky "Ask Question" FAB button
- Reduced padding: `p-4` instead of `p-6`
- Stack all sidebar content below main content

### Tablet (768px-1024px)
- Two-column grid for feed (if needed)
- Maintain sidebar but narrower
- Moderate spacing adjustments

### Desktop (>1024px)
- Full three-column layout where applicable
- Sidebar visible
- Hover states fully active
- Optimal reading widths enforced

---

## Special Design Considerations

### Health Content Trust Signals
- Expert badges highly visible
- Source citations encouraged (with special formatting)
- "Medical disclaimer" footer on question pages
- Verified checkmark for healthcare professionals

### Anonymous User Experience
- Consistent "Anonymous User" label with icon
- Generic avatar (not just missing image)
- Visual distinction but not stigmatization
- Same reply capabilities as logged-in users

### Gamification Elements (Subtle)
- Upvote/downvote with count display
- "Helpful answer" indicator (top answer highlight)
- User reputation points (shown on profile, not feed)

---

This design creates a trustworthy, readable, and engaging health Q&A platform that balances professional credibility with community warmth. The information hierarchy ensures users can quickly scan questions, dive into detailed answers, and contribute confidently whether anonymous or identified.