# Psicare

> Plataforma de monitoramento do bem-estar emocional — iOS + Web  
> `React Native + Expo` · `Next.js 15 PWA` · `Supabase` · `Turborepo`

---

## Sobre o Projeto

O Psicare conecta pacientes e profissionais de saúde mental por meio de registro diário de humor, checklists de hábitos e medicação, e um dashboard clínico com histórico contextualizado.

**Missão:** Transformar o autocuidado emocional em um hábito diário sustentável, fortalecendo o vínculo entre paciente e terapeuta com dados reais e contextualizados.

---

## Stack

| Camada | Tecnologia |
|---|---|
| App iOS | **Capacitor** — empacota o build Next.js num shell nativo iOS |
| Web | Next.js 15 App Router + PWA (next-pwa) |
| Estilo | Tailwind CSS v3 + Shadcn/ui |
| Estado | TanStack Query v5 + Zustand |
| Backend | Supabase (PostgreSQL + Auth + Storage + Realtime + Edge Functions) |
| Deploy | Vercel (Web) + Capacitor + Xcode (iOS) |
| Observabilidade | Sentry + PostHog |
| E-mail | Resend |

---

## Estratégia Mobile — Capacitor

Em vez de manter duas bases de código separadas (Next.js + React Native), o Psicare adota o **Capacitor** para empacotar o próprio web app como um app iOS nativo.

```
Next.js build  →  Capacitor shell  →  .ipa  →  App Store
```

### Por que Capacitor

| Critério | Capacitor | React Native |
|---|---|---|
| Reutiliza código atual | ✅ 100% | ❌ reescrever tudo |
| Publicação na App Store | ✅ | ✅ |
| Push notifications iOS | ✅ via plugin | ✅ |
| Acesso a APIs nativas | ✅ via plugins | ✅ |
| Base de código única | ✅ | ❌ monorepo separado |
| Esforço de implementação | Baixo | Alto |

### Plugins Capacitor previstos

| Plugin | Função |
|---|---|
| `@capacitor/push-notifications` | Lembretes de check-in e medicação |
| `@capacitor/preferences` | Armazenamento seguro de tokens JWT |
| `@capacitor/status-bar` | Personalização da status bar iOS |
| `@capacitor/splash-screen` | Splash screen nativa |

### Fluxo de build iOS

```
npm run build          # gera o Next.js static/export
npx cap sync           # copia o build para o projeto iOS nativo
npx cap open ios       # abre no Xcode para assinar e publicar
```

---

## Arquitetura de Rotas — MVP · Paciente

### 📱 Mobile — `apps/mobile/app/`

```
app/
├── _layout.tsx                        # [layout]   Root: providers, fonts, SplashScreen
├── index.tsx                          # [public]   Redirect guard → /login ou /(tabs)/home
│
├── (auth)/
│   ├── _layout.tsx                    # [layout]   Stack sem header
│   ├── login.tsx                      # [public]   E-mail + senha + Google OAuth
│   └── register.tsx                   # [public]   Nome, e-mail, senha
│
└── (tabs)/
    ├── _layout.tsx                    # [layout]   Tab bar: Início, Hábitos, Relatórios, Perfil
    ├── home.tsx                       # [protected] Check-in do dia, streak, resumo diário
    ├── habits.tsx                     # [protected] Checklists de hábitos e medicação
    ├── reports.tsx                    # [protected] Histórico, calendário, gráfico de evolução
    └── profile.tsx                    # [protected] Conta, notificações, configurações, sair
```

**Modais acessíveis a partir das tabs:**

```
app/(modals)/
├── mood-checkin.tsx                   # [protected] MoodPicker + tags + nota (sheet)
├── history/[date].tsx                 # [protected] Detalhe do dia selecionado
├── habits/manage.tsx                  # [protected] Criar / editar hábito
├── medications/[id].tsx               # [protected] Cadastrar / editar medicamento
└── settings/
    ├── notifications.tsx              # [protected] Horário de lembrete, canais
    └── privacy.tsx                    # [protected] Exportar dados, deletar conta (LGPD)
```

### 🌐 Web — `apps/web/app/`

```
app/
├── layout.tsx                         # [layout]   Root: fontes, providers, Analytics
├── page.tsx                           # [public]   Landing page (SSG)
│
├── (auth)/
│   ├── layout.tsx                     # [layout]   Sem sidebar, fundo limpo
│   ├── login/
│   │   └── page.tsx                   # [public]   Login com e-mail ou Google OAuth
│   ├── register/
│   │   └── page.tsx                   # [public]   Cadastro: nome, e-mail, senha, papel
│   └── callback/
│       └── route.ts                   # [public]   Handler OAuth + magic link
│
└── (app)/
    ├── layout.tsx                     # [layout]   AuthGuard (Server) + Sidebar + Topbar
    ├── home/
    │   └── page.tsx                   # [protected] Dashboard: check-in, streak, resumo
    ├── habits/
    │   ├── page.tsx                   # [protected] Checklists do dia + histórico semanal
    │   └── [id]/
    │       └── page.tsx               # [protected] Detalhe / edição de hábito
    ├── reports/
    │   ├── page.tsx                   # [protected] Calendário, heatmap, gráfico de evolução
    │   └── [date]/
    │       └── page.tsx               # [protected] Detalhe do dia selecionado
    ├── profile/
    │   └── page.tsx                   # [protected] Foto, nome, e-mail, senha
    └── settings/
        ├── notifications/
        │   └── page.tsx               # [protected] Horário de lembrete, canais ativos
        └── privacy/
            └── page.tsx               # [protected] Exportar dados, deletar conta (LGPD)
```

### Mapeamento tabs → rotas

| Tab | Mobile | Web |
|---|---|---|
| Início | `/(tabs)/home` | `/app/home` |
| Hábitos | `/(tabs)/habits` | `/app/habits` |
| Relatórios | `/(tabs)/reports` | `/app/reports` |
| Perfil | `/(tabs)/profile` | `/app/profile` |
| Configurações | modal em `/profile` | `/app/settings/*` |
| Login | `/(auth)/login` | `/auth/login` |
| Cadastro | `/(auth)/register` | `/auth/register` |

### Fluxo de navegação

```
Não autenticado
  /  →  /(auth)/login
         ├── login OK    →  /(tabs)/home
         └── sem conta   →  /(auth)/register → /(tabs)/home

Autenticado
  /  →  verifica session
         ├── tem sessão  →  /(tabs)/home
         └── expirou     →  /(auth)/login
```

### Arquivos de convenção

**Expo Router**

| Arquivo | Função |
|---|---|
| `_layout.tsx` | Define o navigator do grupo (Stack, Tabs) |
| `index.tsx` | Rota padrão do grupo |
| `[param].tsx` | Rota dinâmica via `useLocalSearchParams()` |

**Next.js App Router**

| Arquivo | Função |
|---|---|
| `layout.tsx` | Layout persistente que envolve `page.tsx` |
| `page.tsx` | Página da rota |
| `loading.tsx` | Suspense boundary automático |
| `error.tsx` | Error boundary da rota |
| `route.ts` | API endpoint (GET, POST…) |

---

## Modelo de Dados (principais entidades)

| Entidade | Campos Principais |
|---|---|
| `users` | id, email, full_name, role (patient \| professional), created_at |
| `mood_entries` | id, user_id, date, mood_score (1–5), emotion_tags[], note, created_at |
| `habit_logs` | id, user_id, date, type, completed, note |
| `medications` | id, user_id, name, dosage, frequency, times[], active |
| `professional_access` | id, patient_id, professional_id, granted_at, revoked_at, scope[] |
| `notifications` | id, user_id, type, scheduled_at, sent_at, channel |

---

## Design Tokens

| Token | Valor |
|---|---|
| `--brand-primary` | `#5B4CF5` — Roxo Psicare |
| `--brand-secondary` | `#7C6FF7` — Roxo claro |
| `--bg-base` | `#F8F7FF` — Fundo global |
| `--mood-1` → `--mood-5` | Vermelho → Azul (escala de humor) |
| `--font-sans` | `Inter` |

---

## Links úteis

- **Figma**: https://www.figma.com/design/D3zE5zC6UQrEzmoSnog4MP/Psicare?node-id=0-1&t=ywla2noWsKuSEX6J-1
- **Stitch**: https://stitch.withgoogle.com/projects/5194532362651983996
- **Trello**: https://trello.com/invite/b/6a179a9e28eb46913275b306/ATTI6c08ba100b35b91e9611db738fa487200CFB851D/psicarer
- **PRD completo**: [project.md](project.md)

---

## Status do Projeto

**Estágio atual: Scaffold Frontend**

Navegação e UI estática funcionando, mas sem backend, auth real ou gerenciamento de estado conectado.

| Camada | Status |
|---|---|
| Rotas e navegação (Next.js App Router) | ✅ Implementado |
| Componentes de layout (sidebar, bottom nav, top bar) | ✅ Implementado |
| Componentes de home (MoodSelector, StreakCard, hábitos) | ✅ Implementado |
| Design system (tokens Tailwind, cores, tipografia) | ✅ Implementado |
| Páginas de auth (login, register) | ✅ UI estática — sem lógica real |
| Supabase (DB, Auth, Realtime) | ❌ Não integrado |
| TanStack Query + Zustand | ❌ Não instalado |
| Shadcn/ui + Recharts | ❌ Não instalado |
| next-auth / OAuth callback | ❌ Não implementado |
| App iOS (React Native / Expo) | ❌ Não iniciado |
| Monorepo Turborepo | ❌ Não configurado |
