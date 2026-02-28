# Rural_Reach_HealthCare_Platform_

![Next.js](https://img.shields.io/badge/-Next.js-blue?logo=nextjs&logoColor=white) ![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white)

## 📝 Description

Rural Reach Healthcare Platform is a modern, high-performance web application dedicated to bridging the healthcare gap for underserved rural communities. Developed with Next.js, React, and TypeScript, the platform ensures a seamless and responsive user experience across all devices. It features a secure authentication system and a robust API backbone to provide remote populations with reliable access to medical services, health management tools, and professional consultation, making quality healthcare more accessible regardless of geographic location.

## ✨ Features

- 🌐 Api
- 🔐 Auth
- 🕸️ Web


## 🛠️ Tech Stack

- next.js Next.js
- ⚛️ React
- 📜 TypeScript


## 📦 Key Dependencies

```
@hookform/resolvers: ^3.9.1
@radix-ui/react-accordion: 1.2.2
@radix-ui/react-alert-dialog: 1.1.4
@radix-ui/react-aspect-ratio: 1.1.1
@radix-ui/react-avatar: 1.1.2
@radix-ui/react-checkbox: 1.1.3
@radix-ui/react-collapsible: 1.1.2
@radix-ui/react-context-menu: 2.2.4
@radix-ui/react-dialog: 1.1.4
@radix-ui/react-dropdown-menu: 2.1.4
@radix-ui/react-hover-card: 1.1.4
@radix-ui/react-label: 2.1.1
@radix-ui/react-menubar: 1.1.4
@radix-ui/react-navigation-menu: 1.2.3
@radix-ui/react-popover: 1.1.4
```

## 🚀 Run Commands

- **build**: `npm run build`
- **dev**: `npm run dev`
- **lint**: `npm run lint`
- **start**: `npm run start`


## 📁 Project Structure

```
.
├── app
│   ├── admin
│   │   └── dashboard
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── all-hospitals
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── api
│   │   ├── admin
│   │   │   ├── approve-health-tip
│   │   │   │   └── route.ts
│   │   │   ├── block-user
│   │   │   │   └── route.ts
│   │   │   ├── blocked-users
│   │   │   │   └── route.ts
│   │   │   ├── doctors
│   │   │   │   └── route.ts
│   │   │   ├── emergency-alerts
│   │   │   │   └── route.ts
│   │   │   ├── health-tip
│   │   │   │   └── route.ts
│   │   │   ├── hospital
│   │   │   │   └── route.ts
│   │   │   ├── stats
│   │   │   │   └── route.ts
│   │   │   ├── unblock-user
│   │   │   │   └── route.ts
│   │   │   ├── users
│   │   │   │   └── route.ts
│   │   │   └── verify-provider
│   │   │       └── route.ts
│   │   ├── announcements
│   │   │   ├── create
│   │   │   │   └── route.ts
│   │   │   ├── delete
│   │   │   │   └── route.ts
│   │   │   ├── edit
│   │   │   │   └── route.ts
│   │   │   └── own
│   │   │       └── route.ts
│   │   ├── auth
│   │   │   ├── login
│   │   │   │   └── route.ts
│   │   │   ├── logout
│   │   │   │   └── route.ts
│   │   │   ├── me
│   │   │   │   └── route.ts
│   │   │   ├── reset-by-old
│   │   │   │   └── route.ts
│   │   │   ├── reset-by-otp
│   │   │   │   ├── reset-password
│   │   │   │   │   └── route.ts
│   │   │   │   ├── route.ts
│   │   │   │   ├── send-otp
│   │   │   │   │   └── route.ts
│   │   │   │   └── verify-otp
│   │   │   │       └── route.ts
│   │   │   ├── send-otp
│   │   │   │   └── route.ts
│   │   │   ├── validate-current-password
│   │   │   │   └── route.ts
│   │   │   └── verify-otp
│   │   │       └── route.ts
│   │   ├── delete-account
│   │   │   └── route.ts
│   │   ├── doctor
│   │   │   ├── create-post
│   │   │   │   └── route.ts
│   │   │   ├── delete-post
│   │   │   │   └── route.ts
│   │   │   ├── edit-post
│   │   │   │   └── route.ts
│   │   │   ├── my-posts
│   │   │   │   └── route.ts
│   │   │   ├── signup
│   │   │   │   └── route.ts
│   │   │   └── update-profile
│   │   │       └── route.ts
│   │   ├── escalate-emergencies
│   │   │   └── route.ts
│   │   ├── hospital
│   │   │   ├── create-post
│   │   │   │   └── route.ts
│   │   │   ├── delete-post
│   │   │   │   └── route.ts
│   │   │   ├── edit-post
│   │   │   │   └── route.ts
│   │   │   ├── emergency-alerts
│   │   │   │   ├── delete
│   │   │   │   │   └── route.ts
│   │   │   │   ├── respond
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── me
│   │   │   │   └── route.ts
│   │   │   ├── own-posts
│   │   │   │   └── route.ts
│   │   │   ├── profile
│   │   │   │   └── update-location
│   │   │   │       └── route.ts
│   │   │   ├── route.ts
│   │   │   ├── signup
│   │   │   │   └── route.ts
│   │   │   ├── toggle-availability
│   │   │   │   └── route.ts
│   │   │   └── update-fixed-location
│   │   │       └── route.ts
│   │   ├── posts
│   │   │   ├── doctor
│   │   │   │   └── route.ts
│   │   │   ├── hospital
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── user
│   │       ├── assessments
│   │       │   └── route.ts
│   │       ├── check-alert-status
│   │       │   └── route.ts
│   │       ├── delete-account
│   │       │   └── route.ts
│   │       ├── delete-alert
│   │       │   └── route.ts
│   │       ├── dismiss-alert
│   │       │   └── route.ts
│   │       ├── emergency-alert
│   │       │   └── route.ts
│   │       ├── emergency-alerts
│   │       │   ├── delete
│   │       │   │   └── route.ts
│   │       │   └── route.ts
│   │       ├── health-posts
│   │       │   └── route.ts
│   │       ├── health-tips
│   │       │   └── route.ts
│   │       ├── hospitals
│   │       │   └── route.ts
│   │       ├── like-post
│   │       │   └── route.ts
│   │       ├── mood-data
│   │       │   └── route.ts
│   │       ├── mood-entry
│   │       │   └── route.ts
│   │       ├── profile
│   │       │   ├── route.ts
│   │       │   └── update-location
│   │       │       └── route.ts
│   │       └── signup
│   │           └── route.ts
│   ├── auth
│   │   ├── forgot-password
│   │   │   └── page.tsx
│   │   └── login
│   │       └── page.tsx
│   ├── contexts
│   │   └── AuthProvider.tsx
│   ├── doctor
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   └── signup
│   │       └── page.tsx
│   ├── globals.css
│   ├── hospital
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   └── signup
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── user
│       ├── dashboard
│       │   └── page.tsx
│       └── signup
│           └── page.tsx
├── components
│   ├── AnimatedHealthIcons.tsx
│   ├── LogoutButton.tsx
│   ├── SessionStatus.tsx
│   ├── ThemeToggle.tsx
│   ├── UserDropdown.tsx
│   ├── assessments
│   │   ├── AssessmentResults.tsx
│   │   ├── GAD7Assessment.tsx
│   │   └── PHQ9Assessment.tsx
│   ├── icons.tsx
│   ├── location-selector.tsx
│   ├── theme-provider.tsx
│   └── ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       ├── use-mobile.tsx
│       └── use-toast.ts
├── components.json
├── contexts
│   └── ThemeContext.tsx
├── hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib
│   ├── auth.ts
│   ├── getSession.ts
│   ├── gujarat-data.json
│   ├── models
│   │   ├── AllUserContact.ts
│   │   ├── Announcement.ts
│   │   ├── Assessment.ts
│   │   ├── BlockedList.ts
│   │   ├── Doctor.ts
│   │   ├── EmergencyAlert.ts
│   │   ├── HealthTip.ts
│   │   ├── Hospital.ts
│   │   ├── MoodEntry.ts
│   │   ├── OTP.ts
│   │   ├── User.ts
│   │   ├── gujarat-data.ts
│   │   └── post.ts
│   ├── mongodb.ts
│   ├── utils.ts
│   └── verification
│       ├── createOtp.ts
│       ├── sendEmailToStakeholder.ts
│       ├── sendPasswordChangeConfirmation.ts
│       └── verifyOtp.ts
├── middleware.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
├── styles
│   └── globals.css
├── tailwind.config.ts
└── tsconfig.json
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/udaynandaniya/Rural_Reach_HealthCare_Platform_.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

---
*This README was generated with ❤️ by ReadmeBuddy*
