# AarogyaAid — Explainable Health Insurance Recommendation Assistant

## Overview

AarogyaAid helps users compare health insurance policies using profile-based recommendations, grounded retrieval, and explainable AI.

Users provide six inputs:

- Full Name  
- Age  
- Lifestyle  
- Pre-existing Condition  
- Income Band  
- City Tier  

The system returns:

- Peer Comparison  
- Coverage Details  
- Why This Policy  
- Interactive Policy Explainer Chat  

It also includes an admin knowledge base for policy document management.



## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS

### Backend
- Node.js
- Express

### Database
- MongoDB

Used for:
- Profile persistence
- Recommended policy storage
- Session context

### AI / Orchestration
- Custom orchestration
- Gemini explanation layer
- Retrieval tool
- Google ADK explored for agent-oriented workflows



## RAG Pipeline

```text
Policy documents uploaded
↓
Documents parsed into chunks
↓
Relevant policy clauses retrieved
↓
Retrieved clauses passed to explanation layer
↓
Grounded response returned
```

Uses:
- JSON clauses  
- TXT documents  
- PDF parsing  
- Lightweight retrieval index



## Agent Pipeline

```text
User profile submitted
↓
Policies ranked by suitability
↓
Best-fit policy selected
↓
Policy chunks retrieved
↓
Gemini generates explanation
↓
Chat uses same retrieval for follow-ups
```

Hybrid approach was chosen for control and lower hallucination risk.



## Recommendation Logic

Policies are scored using:

- Condition fit  
- Waiting period  
- Income affordability  
- City network fit  
- Age sensitivity  
- Lifestyle weighting  

Highest suitability policy is recommended.

Why This Policy references multiple user fields for transparency.



## Retrieval Strategy

Prototype uses a lightweight chunk retrieval index instead of full vector databases like Chroma or Qdrant.

Reason:
- Lower prototype complexity  
- Grounded retrieval  
- Admin deletions take effect immediately



## Project Structure

```text
backend/
  routes/
  services/
  agents/
  models/
  policies/

frontend/
  src/components/
```



## Setup

### Backend

```bash
cd backend
npm install
npm start
```

Runs at:

```text
http://localhost:5000
```



### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at:

```text
http://localhost:5173
```



## Environment Variables

Create `.env`:

```text
GEMINI_API_KEY=
MONGO_URI=
ADMIN_USER=
ADMIN_PASS=
```



## Sample API Test

Recommendation:

```bash
curl -X POST http://localhost:5000/recommend \
-H "Content-Type: application/json" \
-d '{
"fullName":"Kirana",
"age":55,
"lifestyle":"Active",
"condition":"Diabetes",
"income":"3-8L",
"city":"Tier-2"
}'
```



Chat:

```bash
curl -X POST http://localhost:5000/chat \
-H "Content-Type: application/json" \
-d '{
"question":"What is waiting period?"
}'
```



## Admin Features

Supports:

- Upload documents  
- View documents  
- Delete documents  
- Update metadata  

Supported files:

- JSON  
- TXT  
- PDF  



## Safety Guardrails

System does not provide:

- Medical advice  
- Claims advice  
- Legal policy interpretation  



## Tradeoffs

Prototype intentionally uses:

- Lightweight retrieval instead of full vector DB  
- Rule-based scoring instead of insurer underwriting  
- Sample policies instead of live insurer feeds  

Prioritized:
- Explainability  
- Reliability  
- Simplicity  