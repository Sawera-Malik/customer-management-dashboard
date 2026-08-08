# Enterprise Customer Management Dashboard (SaaS CRM)

A production-quality, responsive **Customer Management Dashboard** built with **React**, **TypeScript**, **Tailwind CSS**, **React Router v7**, **Lucide Icons**, and **LocalStorage** persistence.

---

## 🌟 Key Features

- **🔐 Auth & Protected Routes**: Professional split-screen login page with form validation, show/hide password toggle, mock authentication, and route guards.
- **📊 Dynamic Dashboard**: Welcome header, 4 dynamic KPI stat cards (Total Customers, Active Customers, Inactive Customers, Total Revenue MRR), system health status, and live activity audit log.
- **📁 Customer Directory**:
  - Real-time search across customer name, email.
  - Multi-parameter status filtering (All, Active, Inactive).
  - Alphabetical sorting (A-Z / Z-A) with directional indicators.
  - Client-side pagination (5/10/20 rows per page) with automatic reset to page 1 on filter changes.
  - Initials avatar generator with deterministic background colors.
- **👁️ Customer Profile Drawer**: Desktop right-side slide-over drawer / Mobile modal layout displaying contact details, company, postal address (street, suite, city, zipcode), website link, status badge, created date, and estimated monthly value.
- **⚡ Full CRUD Capabilities**:
  - Add Customer page (`/customers/add`) with inline regex validation.
  - Pre-filled Edit Customer modal.
  - Delete Customer confirmation dialog with warning badge and keyboard accessibility.
  - Auto-dismissing global toast notification stack.
- **🌙 Dark & Light Theme**: High-contrast dark mode and clean light mode backed by `ThemeContext` and persisted in `localStorage`.
- **📱 Intentionally Responsive**: Mobile slide-out navigation drawer with backdrop overlay, desktop-to-mobile table card conversion, and zero viewport overflow.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19 + TypeScript
- **Styling**: Tailwind CSS v3 (Dark Mode class strategy)
- **Icons**: Lucide React
- **Routing**: React Router DOM v7
- **Data Fetching**: Native Fetch API + JSONPlaceholder (`https://jsonplaceholder.typicode.com/users`)
- **State Management**: React Context API (`AuthContext`, `ThemeContext`, `ToastContext`, `CustomerContext`) & Native Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useDebounce`)
- **Storage**: LocalStorage helper abstraction ([`storageService.ts`](src/services/storageService.ts))

---

## 📂 Architecture & Folder Structure

```
src/
├── components/
│   ├── common/         # Reusable UI elements (Button, Badge, CustomerAvatar, ToastContainer, ConfirmDialog, LoadingSkeleton, EmptyState, ErrorState)
│   ├── customers/      # Customer directory components (CustomerTable, CustomerRow, CustomerDetailsDrawer, SearchBar, StatusFilter, SortControl, Pagination)
│   ├── dashboard/      # Dashboard cards and activity feed (StatCard, RecentActivity)
│   ├── forms/          # Reusable customer form and edit modal (CustomerForm, EditCustomerModal)
│   ├── layout/         # Shell framework (Sidebar, MobileSidebar, Header, Layout)
│   └── ProtectedRoute.tsx
├── context/            # Global state contexts (AuthContext, ThemeContext, ToastContext, CustomerContext)
├── hooks/              # Custom utility hooks (useDebounce)
├── pages/              # App routes (LoginPage, DashboardPage, CustomersPage, SettingsPage)
├── services/           # Service layer (customerService.ts, storageService.ts)
├── types/              # TypeScript interfaces and data models (index.ts)
├── App.tsx             # Main routing configuration
├── index.css           # Tailwind base directives and global custom styles
└── index.tsx           # React entry point
```

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd task-1
npm install
```

### 2. Running Locally
Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### 3. Building for Production
To generate an optimized production build:

```bash
npm run build
```

---

## 🧪 Type Checking & Build Verification

Run strict TypeScript verification:

```bash
npx tsc --noEmit
```

Build verification status: **Passed (0 errors)**.

---

## 💡 Discussion: Scaling to 100,000+ Customers

If scaling this dashboard to 100,000+ customer records with real enterprise backend APIs:

1. **Server-Side Pagination & Filtering**: Shift pagination, search, and status filtering from client-side array operations to REST/GraphQL query parameters (`GET /api/v1/customers?page=1&limit=25&search=query`).
2. **Debounced Search**: Apply a 300ms debounce to search inputs (`useDebounce`) to avoid unnecessary API requests.
3. **Data Caching & Optimistic UI**: Integrate **TanStack Query (React Query)** or **SWR** for request deduplication, background revalidation, and instant optimistic updates.
4. **DOM Virtualization**: Use `@tanstack/react-virtual` to window table rows and render only visible viewport items.
5. **Database Indexing**: Back the backend with indexed database queries (PostgreSQL B-tree indexes on `email`, `name`, and `company_id`).
