# Product Requirements Document (PRD)

## 1. Problem Statement

Health insurance decisions are high-stakes and difficult for many users, especially those with pre-existing conditions, limited insurance literacy, or budget constraints.

Users often struggle to:

- Compare multiple policies side by side
- Understand exclusions and waiting periods
- Interpret co-pay, sub-limits, and claim terms
- Know which policy best fits their health and financial profile

AarogyaAid helps users make a more informed decision using profile-based recommendations, grounded policy retrieval, and explainable AI assistance.



## 2. Primary User Profile

Primary user:

An adult health insurance seeker in India who may have:
- A pre-existing condition
- Limited familiarity with policy terminology
- Affordability concerns
- Uncertainty about hospital network access

Example user persona:

A 55-year-old diabetic user living in a Tier-2 city looking for affordable coverage with shorter waiting periods.



## 3. Key User Pain Points

Users face four main problems:

1. Policy comparison is difficult  
Policy documents are dense and benefits are hard to compare.

2. Important exclusions are unclear  
Users may miss waiting periods, co-pay clauses, or coverage restrictions.

3. Insurance language is confusing  
Terms like “sub-limit” and “cashless claim” are poorly understood.

4. Policy data changes over time  
Recommendations must stay grounded in updatable documents.



## 4. Feature Prioritization

### Priority 1 — Recommendation Engine
Core feature.

Uses six user inputs:

- Full Name
- Age
- Lifestyle
- Pre-existing Conditions
- Income Band
- City Tier

Outputs:
- Peer comparison
- Coverage details
- Why This Policy explanation



### Priority 2 — Document Intelligence Retrieval
Recommendations and explanations should be grounded in uploaded policy documents, not model assumptions.

Prototype uses:
- Structured JSON policy clauses
- TXT policy support
- PDF parsing support
- Lightweight chunk retrieval index for policy clauses



### Priority 3 — Interactive Policy Explainer Chat
Users can ask:

- What is waiting period?
- What is co-pay?
- What does this exclusion mean?

Responses are grounded using retrieved policy chunks and include guardrails against medical advice.



### Priority 4 — Admin Knowledge Base
Admin can:

- Upload documents
- View documents
- Delete documents
- Update metadata

Document deletion should remove knowledge from future retrieval.



## 5. Recommendation Logic

Flow:

1. Filter policies for eligibility  
2. Score policies for suitability  
3. Rank policies  
4. Return best-fit policy with explanation

Scoring considers:

- Condition fit
- Waiting period suitability
- Income affordability
- City network fit
- Age sensitivity
- Lifestyle weighting

Why This Policy explanation references multiple profile fields for transparency.



## 6. Data and Architecture Choices

### Database
Prototype uses MongoDB for profile persistence.

Stores:
- User profile
- Recommended policy
- Session context



### Retrieval / Vector Strategy
Instead of a full vector database, this prototype uses a lightweight in-memory chunk retrieval index.

Policy clauses are chunked and retrieved by keyword/text matching.

Reason:
Lower complexity for prototype while supporting:
- Retrieval
- Source grounding
- Immediate effect of document deletion



### AI / Orchestration Strategy
Prototype uses hybrid orchestration:

- Deterministic ranking logic
- Retrieval tool for policy chunks
- Gemini explanation layer

Reason:
Improves control and reduces hallucination risk compared to relying on LLM reasoning alone.



## 7. Assumptions

- Uploaded policy documents contain usable coverage information
- Premium and waiting period data are available
- Users provide truthful profile information
- This prototype evaluates suitability, not legal or medical advice



## 8. Tradeoffs

Deliberate tradeoffs:

- Lightweight retrieval index instead of full Chroma/Qdrant
- Rule-based scoring instead of live insurer underwriting
- Sample policies instead of production insurer feeds

Chosen to prioritize explainability, simplicity, and prototype reliability.



## 9. Out of Scope

Out of scope:

- Real insurer integrations
- Live underwriting
- Claims processing
- Medical advice
- Production-scale user authentication
- Full production vector search infrastructure