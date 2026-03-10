# DEV_TRAILS_HACKATHON

## ARCHITECTURE

### 1. High Level Architecture
```mermaid
flowchart TB

subgraph Client
A[Mobile App - GigShield]
end

subgraph Gateway
B[API Gateway]
end

subgraph Core Services
C[Auth Service]
D[User Service]
E[Policy Service]
F[Claims Service]
end

subgraph AI Services
G[Risk Engine ML Service]
H[Fraud Detection Service]
I[Income Loss Estimation Model]
end

subgraph Infrastructure
J[(PostgreSQL)]
K[(Redis Cache)]
L[Kafka Event Bus]
end

subgraph External
M[Weather API]
N[Traffic API]
O[Payment Gateway]
end

A --> B

B --> C
B --> D
B --> E
B --> F

E --> G

F --> H
F --> I

G --> J
H --> J
I --> J

C --> J
D --> J
E --> J
F --> J

B --> K

E --> O
F --> O

M --> L
N --> L

L --> F
R5 --> E
```

### 2. Premium Purchase Flow (Risk Based)
```mermaid
sequenceDiagram

participant User
participant MobileApp
participant APIGateway
participant AuthService
participant UserService
participant RiskEngine
participant PolicyService
participant PaymentService

User->>MobileApp: Login / Register
MobileApp->>APIGateway: API Request
APIGateway->>AuthService: Authenticate User

AuthService-->>APIGateway: JWT Token

MobileApp->>APIGateway: Request Insurance Plan

APIGateway->>UserService: Fetch User Data
UserService-->>APIGateway: Earnings + Location

APIGateway->>RiskEngine: Calculate Risk Score

RiskEngine-->>APIGateway: Risk Score + Premium

APIGateway->>PolicyService: Generate Policy

PolicyService-->>MobileApp: Show Plan Options

User->>MobileApp: Select Plan

MobileApp->>PaymentService: Pay Premium

PaymentService-->>PolicyService: Payment Success

PolicyService-->>MobileApp: Policy Activated
```

### 3. Auto Claim Workflow
```mermaid
flowchart TD

A[Weather API / Traffic API] --> B[Trigger Monitoring Service]

B --> C{Disruption Detected?}

C -->|Yes| D[Event Published to Kafka]

D --> E[Claims Service]

E --> F[Find Affected Users]

F --> G[Income Loss Estimation Model]

G --> H[Fraud Detection Service]

H --> I{Fraud Risk?}

I -->|Low| J[Claim Approved]

I -->|High| K[Manual Review]

J --> L[Payment Service]

L --> M[UPI Payout]

M --> N[Notification Service]

N --> O[User Receives Claim Alert]
```

### 4. Frontend → Backend Interaction (GigShield App)
```mermaid
flowchart LR

A[Mobile App UI]

subgraph Screens
B[Onboarding]
C[Registration + OTP]
D[AI Risk Profile]
E[Plan Selection]
F[Home Dashboard]
G[Disruption Alert]
H[Claims History]
I[Profile]
end

subgraph Backend APIs
J[Auth API]
K[Risk API]
L[Policy API]
M[Claims API]
N[Payment API]
end

A --> B
B --> C

C --> J
D --> K

E --> L
E --> N

F --> L
F --> M

G --> M

H --> M

I --> J
```
